import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useAuth } from '../contexts/AuthContext';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '../types/auth.types';

// Use Vite's import.meta.env to access environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface AuthApiState {
  loading: boolean;
  error: string | null;
}

export const useAuthApi = () => {
  const [state, setState] = useState<AuthApiState>({
    loading: false,
    error: null,
  });
  const { login } = useAuth();

  const handleError = (error: unknown) => {
    const axiosError = error as AxiosError<{ message: string }>;
    return axiosError.response?.data?.message || 'An error occurred';
  };

  const registerUser = async (data: RegisterData): Promise<void> => {
    try {
      setState({ loading: true, error: null });
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/register`,
        data,
      );
      login(response.data);
    } catch (error) {
      const errorMessage = handleError(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const loginUser = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setState({ loading: true, error: null });
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/login`,
        credentials,
      );
      login(response.data);
    } catch (error) {
      const errorMessage = handleError(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return {
    ...state,
    registerUser,
    loginUser,
  };
};
