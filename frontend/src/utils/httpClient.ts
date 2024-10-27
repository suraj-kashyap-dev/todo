import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_URL } from '../config/constant';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

class HttpClient {
  private static instance: HttpClient;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            localStorage.removeItem('token');

            return Promise.reject(error);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  // Generic request methods
  public async get<T>(url: string) {
    return this.api.get<T>(url);
  }

  public async post<T>(url: string, data?: any, config: object = {}) {
    return this.api.post<T>(url, data, config);
  }

  public async put<T>(url: string, data?: any, config: object = {}) {
    return this.api.put<T>(url, data, config);
  }

  public async delete<T>(url: string) {
    return this.api.delete<T>(url);
  }
}

export const httpClient = HttpClient.getInstance();
