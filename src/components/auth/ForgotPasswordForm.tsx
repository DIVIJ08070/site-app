import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../common/Input';
import { validators } from '../../utils/validators';

interface ForgotPasswordFormProps {
  onEmailSubmit: (email: string) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onEmailSubmit }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { sendOTP, isLoading } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validators.isValidEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const result = await sendOTP(email);  // capture the response
    console.log('OTP Response:', result); // 👈 logs whatever the API returns

    onEmailSubmit(email);
    navigate('/verify-otp', { state: { email } });
  } catch (error: any) {
    setErrors({
      submit: error.response?.data?.message || 'Failed to send OTP. Please try again.',
    });
  }
};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full h-full flex-1">
      <div className="flex-1 flex flex-col">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {errors.submit}
          </div>
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />
      </div>

      <div className="mt-12 flex flex-col items-center w-full max-w-lg mx-auto pb-4">
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[#f8f9fa] text-black hover:bg-gray-100 transition-colors py-3.5 rounded-lg text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading...' : 'Continue'}
        </button>
        <p className="text-xs text-gray-400 mt-4">
          Enter your email to continue.
        </p>
      </div>
    </form>
  );
};
