import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, LoginResponse, ApiError } from '../types/auth';
import axiosInstance from '../helpers/axios';
import axios, { AxiosError } from 'axios';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  // Set up axios interceptor for token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${token}`;
    }

    return () => {
      delete axiosInstance.defaults.headers.common['Authorization'];
    };
  }, []);

  // Check token validity on mount
  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      try {
        dispatch({ type: 'SET_LOADING', payload: true });

        const response = await axiosInstance.get<LoginResponse>('/auth/me');

        const userData: User = {
          _id: response.data._id,
          username: response.data.username,
          email: response.data.email,
          __v: response.data.__v,
        };
        dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    validateAuth();
  }, []);

  const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      return axiosError.response?.data?.message || axiosError.message;
    }
    return 'An unexpected error occurred';
  };

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await axiosInstance.post<LoginResponse>('/auth/login', {
        email,
        password,
      });

      // Store token
      localStorage.setItem('token', response.data.authentication.sessionToken);
      axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.authentication.sessionToken}`;

      // Create user object from response
      const userData: User = {
        _id: response.data._id,
        username: response.data.username,
        email: response.data.email,
        __v: response.data.__v,
      };

      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await axiosInstance.post<LoginResponse>(
        '/auth/register',
        {
          username,
          email,
          password,
        },
      );

      localStorage.setItem('token', response.data.authentication.sessionToken);
      axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.authentication.sessionToken}`;

      const userData: User = {
        _id: response.data._id,
        username: response.data.username,
        email: response.data.email,
        __v: response.data.__v,
      };

      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
