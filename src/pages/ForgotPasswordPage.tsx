import React from 'react';
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm';

export const ForgotPasswordPage: React.FC = () => {
  const handleEmailSubmit = (_email: string) => {
    // Email has been submitted, next page will show OTP input
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-6 md:px-12 md:py-8">
      {/* Top Bar / Back Button */}
      <div className="w-full relative flex items-center justify-center pt-8">
        <button onClick={() => window.history.back()} className="absolute left-0 text-2xl font-bold text-black border-0 bg-transparent cursor-pointer hover:opacity-75">
          &lt;
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center mt-12 w-full max-w-2xl mx-auto">
        {/* Title */}
        <div className="text-center w-full mb-10">
          <h1 className="text-3xl md:text-[40px] font-normal text-black mb-4 tracking-wide">FORGOT PASSWORD?</h1>
          <p className="text-gray-500 text-base">
            Enter your email address and we&apos;ll send you an OTP to reset your password
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-xl flex-1 flex flex-col">
          <ForgotPasswordForm onEmailSubmit={handleEmailSubmit} />
        </div>
      </div>
    </div>
  );
};
