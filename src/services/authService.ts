import axiosClient from './axiosClient';
import {
  LoginRequest,
  LoginResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
} from '../types/auth';

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosClient.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  async sendOTP(email: string): Promise<any> {
    const response = await axiosClient.post('/auth/send-otp', {
      email,
      purpose: 'forgotPassword',
    });
    return response.data;
  },

  async verifyOTP(data: VerifyOTPRequest): Promise<VerifyOTPResponse> {
    const response = await axiosClient.post<VerifyOTPResponse>('/auth/verify-otp', data);
    return response.data;
  },

  async setPassword(email: string, password: string): Promise<void> {
    await axiosClient.post('/auth/set-password', {
      email,
      password,
    });
  },

  async logout(accessToken: string, refreshToken: string): Promise<void> {
    await axiosClient.post('/auth/logout', {
      accessToken,
      refreshToken,
    });
  },
};
