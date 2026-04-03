import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  buttonText?: string;
  redirectPath?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  title,
  message,
  buttonText = 'Go To Log In',
  redirectPath = '/login',
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClick = () => {
    navigate(redirectPath);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden border-4 border-teal-700">
        <div className="flex flex-col items-center justify-center p-8 text-center gap-6">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center text-white text-4xl">
              ✓
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600">{message}</p>

          <Button onClick={handleClick} fullWidth>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
