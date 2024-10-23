import axiosInstance from '../helpers/axios';
import { User } from '../types/auth';

export const validateToken = async (token: string): Promise<User> => {
  try {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const response = await axiosInstance.get('/auth/validate-token');
    return response.data;
  } catch (error) {
    // localStorage.removeItem('token');
    throw new Error('Invalid token');
  }
};
