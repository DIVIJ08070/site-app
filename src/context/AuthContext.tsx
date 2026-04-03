import React, { createContext, useState, useCallback } from 'react';
import { authService } from '../services/authService';
import { AuthContextType } from '../types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('authToken');
  });

  const [user, setUser] = useState<AuthContextType['user'] | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password }) as any;
      console.log('Login Backend Response:', response);

      // Extract from the response depending on if it's wrapped in 'data'
      const token = response.token || response.data?.token || response.data?.accessToken;
      const refreshToken = response.refreshToken || response.data?.refreshToken;
      const user = response.user || response.data?.user;

      if (!token) {
        throw new Error('No token received from the backend. Response: ' + JSON.stringify(response));
      }

      setToken(token);
      setUser(user);
      localStorage.setItem('authToken', token);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('authToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        await authService.logout(accessToken, refreshToken);
      }
    } catch (e) {
      console.error('Logout API error:', e);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      setToken(null);
    }
  }, []);

  const sendOTP = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      return await authService.sendOTP(email);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyOTP = useCallback(async (email: string, otp: string) => {
    setIsLoading(true);
    try {
      await authService.verifyOTP({ email, otpcode: otp });
      return true;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setPassword = useCallback(async (email: string, newPassword: string) => {
    setIsLoading(true);
    try {
      await authService.setPassword(email, newPassword);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token,
    login,
    logout,
    sendOTP,
    verifyOTP,
    setPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
