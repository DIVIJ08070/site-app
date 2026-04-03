import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';

const DISLogo: React.FC = () => (
  <img src="/dis-logo.png" alt="DIS Logo" width="56" height="56" />
);

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6">
          <DISLogo />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide text-center mb-2"
          style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", letterSpacing: '0.05em' }}
        >
          SECURE ADMINISTRATOR ACCESS
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm text-center mb-12">
          Access the Admin Panel using your registered credentials.
        </p>

        {/* Login Form */}
        <LoginForm />
      </div>

      {/* Bottom teal bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-teal-700"></div>
    </div>
  );
};
