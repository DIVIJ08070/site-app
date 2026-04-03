import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../common/Input';
interface OTPVerificationProps {
  onOTPVerified: () => void;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({ onOTPVerified }) => {
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { verifyOTP, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || '';

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!otp) {
      newErrors.otp = 'Verification code is required';
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = 'Enter the 6-digit code sent to your email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await verifyOTP(email, otp);
      onOTPVerified();
      navigate('/reset-password', { state: { email } });
    } catch (error: any) {
      setErrors({
        submit: error.response?.data?.message || 'Invalid verification code. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full h-full flex-1 mt-[-10px]">
      <div className="text-center mb-8">
        <p className="text-gray-500 text-sm">
          We&apos;ve sent a verification code to <span className="text-gray-700">{email}</span>
        </p>
      </div>

      <div className="flex-1 flex flex-col pt-4">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {errors.submit}
          </div>
        )}

        <div className="relative">
          <Input
            label="Enter Verification Code"
            type="text"
            placeholder="744261"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            error={errors.otp}
            maxLength={6}
            required
            inputMode="numeric"
          />
          {otp.length === 6 && (
            <div className="absolute right-3 top-[34px] text-[#006e53] bg-[#e6f4ea] rounded-full w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold">
              ✓
            </div>
          )}
        </div>
        <div className="mt-2 text-[13px] text-gray-400">Enter the 6-digit code sent to your email.</div>
        <button type="button" className="mt-2 text-sm text-[#006e53] font-semibold self-start hover:underline">
          Resend Code
        </button>
      </div>

      <div className="mt-12 flex flex-col items-center w-full max-w-lg mx-auto pb-4">
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[#f8f9fa] text-black hover:bg-gray-100 transition-colors py-3.5 rounded-lg text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed border border-transparent hover:border-gray-100"
        >
          {isLoading ? 'Loading...' : 'Verify Code'}
        </button>
        <p className="text-xs text-gray-400 mt-4">
          Verify the code to continue.
        </p>
      </div>
    </form>
  );
};
