import { create } from 'zustand';
import { authService } from '../services/authService';
import { AuthContextType, VerifyOTPResponse, LoginResponse } from '../types/auth';

interface AuthState extends AuthContextType {
  setToken: (token: string | null) => void;
  setUser: (user: LoginResponse['user'] | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial State
  user: (() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e);
        localStorage.removeItem('user');
      }
    }
    return null;
  })(),
  token: localStorage.getItem('authToken'),
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('authToken'),

  // Setters
  setToken: (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    set({ token, isAuthenticated: !!token });
  },
  setUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    set({ user });
  },
  setIsLoading: (isLoading) => set({ isLoading }),

  // Actions
  login: async (email, password) => {
    const { setIsLoading, setToken, setUser } = get();
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password }) as any;
      console.log('Login Backend Response:', response);

      const token = response.token || response.data?.token || response.data?.accessToken;
      const refreshToken = response.refreshToken || response.data?.refreshToken;
      const user = response.user || response.data?.user;

      if (!token) {
        throw new Error('No token received from the backend');
      }

      setToken(token);
      setUser(user);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    } finally {
      setIsLoading(false);
    }
  },

  logout: async () => {
    const { setToken, setUser } = get();
    try {
      const accessToken = localStorage.getItem('authToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        await authService.logout(accessToken, refreshToken);
      }
    } catch (e) {
      console.error('Logout API error:', e);
    } finally {
      localStorage.removeItem('refreshToken');
      setToken(null);
      setUser(null);
    }
  },

  sendOTP: async (email) => {
    const { setIsLoading } = get();
    setIsLoading(true);
    try {
      return await authService.sendOTP(email);
    } finally {
      setIsLoading(false);
    }
  },

  verifyOTP: async (email, otp) => {
    const { setIsLoading } = get();
    setIsLoading(true);
    try {
      await authService.verifyOTP({ email, otpcode: otp });
      return true;
    } finally {
      setIsLoading(false);
    }
  },

  setPassword: async (email, newPassword) => {
    const { setIsLoading } = get();
    setIsLoading(true);
    try {
      await authService.setPassword(email, newPassword);
    } finally {
      setIsLoading(false);
    }
  },
}));
