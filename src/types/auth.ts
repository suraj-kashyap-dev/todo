export interface User {
  _id: string;
  username: string;
  email: string;
  __v: number;
}

export interface Authentication {
  password: string;
  salt: string;
  sessionToken: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginResponse {
  authentication: Authentication;
  _id: string;
  username: string;
  email: string;
  __v: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

export type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };


export interface AuthContextType {
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
