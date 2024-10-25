import { useState } from 'react';
import { AxiosError } from 'axios';
import { User } from '../types/auth.types';
import { httpClient } from '../utils/httpClient';
import { API_USER_PROFILE } from '../config/constant';

interface ProfileApiState {
  loading: boolean;
  error: string | null;
  user: User | null;
}

export const useProfileApi = () => {
  const [state, setState] = useState<ProfileApiState>({
    loading: false,
    error: null,
    user: null,
  });

  const handleError = (error: unknown) => {
    const axiosError = error as AxiosError<{ message: string }>;
    return axiosError.response?.data?.message || 'An error occurred';
  };

  const getProfile = async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response = await httpClient.get<User>(API_USER_PROFILE);
      setState((prev) => ({
        ...prev,
        user: response.data,
      }));
    } catch (error) {
      const errorMessage = handleError(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response = await httpClient.put<User>(API_USER_PROFILE, updates);
      setState((prev) => ({
        ...prev,
        user: response.data,
      }));
    } catch (error) {
      const errorMessage = handleError(error);
      setState((prev) => ({ ...prev, error: errorMessage }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const deleteProfile = async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      await httpClient.delete('/users/profile');
      setState((prev) => ({
        ...prev,
        user: null,
      }));
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
    getProfile,
    updateProfile,
    deleteProfile,
  };
};
