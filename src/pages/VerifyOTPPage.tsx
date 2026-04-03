import React from 'react';
import { OTPVerification } from '../components/auth/OTPVerification';

export const VerifyOTPPage: React.FC = () => {
  const handleOTPVerified = () => {
    // OTP verified, reset password page will use the token
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
          <h1 className="text-3xl md:text-[40px] font-normal text-black mb-4 tracking-wide">VERIFY YOUR EMAIL</h1>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-xl flex-1 flex flex-col">
          <OTPVerification onOTPVerified={handleOTPVerified} />
        </div>
      </div>
    </div>
  );
};
