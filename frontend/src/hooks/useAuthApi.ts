import { useState } from 'react';
import { AxiosError } from 'axios';
import { useAuth } from '../contexts/AuthContext';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '../types/auth.types';
import { httpClient } from '../utils/httpClient';

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
      const response = await httpClient.post<AuthResponse>(
        '/auth/register',
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
      const response = await httpClient.post<AuthResponse>(
        '/auth/login',
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
