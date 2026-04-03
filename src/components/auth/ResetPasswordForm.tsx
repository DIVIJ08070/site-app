import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validators } from '../../utils/validators';

interface ResetPasswordFormProps {
  onSuccess: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSuccess }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { setPassword, isLoading } = useAuth();
  const location = useLocation();
  const email = (location.state as any)?.email || '';

  const passwordRequirements = validators.passwordRequirements;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!validators.isValidPassword(newPassword)) {
      const missing: string[] = [];
      if (!passwordRequirements.minLength(newPassword)) missing.push('8+ characters');
      if (!passwordRequirements.hasNumber(newPassword)) missing.push('a number');
      if (!passwordRequirements.hasSpecialChar(newPassword)) missing.push('a special character');
      if (!passwordRequirements.hasUpperCase(newPassword)) missing.push('an uppercase letter');
      newErrors.newPassword = `Password must include: ${missing.join(', ')}`;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await setPassword(email, newPassword);
      onSuccess();
    } catch (error: any) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to set password. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full h-full flex-1">
      <div className="flex-1 flex flex-col space-y-5">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {errors.submit}
          </div>
        )}

        <div>
          <label className="text-[13px] font-semibold text-gray-700 block mb-1">
            New Password <span className="text-[#a4bca8]">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-32 text-[15px] ${
                errors.newPassword ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xs font-medium flex items-center gap-1"
              aria-label="Toggle password visibility"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
          </div>
          {errors.newPassword && <span className="text-xs text-red-500 mt-1 block">{errors.newPassword}</span>}
        </div>

        <div>
          <label className="text-[13px] font-semibold text-gray-700 block mb-1">
            Confirm Password <span className="text-[#a4bca8]">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-32 text-[15px] ${
                errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xs font-medium flex items-center gap-1"
              aria-label="Toggle password visibility"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {showConfirm ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
              {showConfirm ? 'Hide Password' : 'Show Password'}
            </button>
          </div>
          {errors.confirmPassword && <span className="text-xs text-red-500 mt-1 block">{errors.confirmPassword}</span>}
        </div>

        <div className="bg-[#f8f9fa] p-5 rounded-lg mt-6">
          <p className="text-sm font-semibold text-gray-800 mb-3">Password Requirements:</p>
          <ul className="space-y-2 text-xs text-gray-500">
            <li className={`flex items-center gap-2 ${passwordRequirements.minLength(newPassword) ? 'text-green-600' : ''}`}>
              <span className="text-lg leading-none mt-[-2px]">{passwordRequirements.minLength(newPassword) ? '•' : '⊗'}</span> At least 8 characters
            </li>
            <li className={`flex items-center gap-2 ${passwordRequirements.hasNumber(newPassword) ? 'text-green-600' : ''}`}>
              <span className="text-lg leading-none mt-[-2px]">{passwordRequirements.hasNumber(newPassword) ? '•' : '⊗'}</span> One number
            </li>
            <li className={`flex items-center gap-2 ${passwordRequirements.hasSpecialChar(newPassword) ? 'text-green-600' : ''}`}>
              <span className="text-lg leading-none mt-[-2px]">{passwordRequirements.hasSpecialChar(newPassword) ? '•' : '⊗'}</span> One special character
            </li>
            <li className={`flex items-center gap-2 ${passwordRequirements.hasUpperCase(newPassword) ? 'text-green-600' : ''}`}>
              <span className="text-lg leading-none mt-[-2px]">{passwordRequirements.hasUpperCase(newPassword) ? '•' : '⊗'}</span> One uppercase letter
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center w-full max-w-lg mx-auto pb-4">
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[#f8f9fa] text-black hover:bg-gray-100 transition-colors py-3.5 rounded-lg text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed border border-gray-100"
        >
          {isLoading ? 'Loading...' : 'Set Password'}
        </button>
        <p className="text-xs text-gray-400 mt-4">
          Enter and confirm a password that meets all requirements.
        </p>
      </div>
    </form>
  );
};
