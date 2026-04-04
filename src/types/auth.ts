export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface VerifyOTPRequest {
  email: string;
  otpcode: string;
  fcm_token?: string;
  device_name?: string;
  device_type?: string;
  ip_address?: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  data: {
    isFullyVerified: boolean;
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthContextType {
  user: LoginResponse['user'] | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  sendOTP: (email: string) => Promise<VerifyOTPResponse>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  setPassword: (email: string, newPassword: string) => Promise<void>;
}
