import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-teal-800 text-white shadow-md h-12 flex-shrink-0">
      <div className="flex items-center justify-between px-4 h-full">
        {/* Left: hamburger for mobile */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-white hover:bg-teal-700 p-1.5 rounded"
          aria-label="Toggle sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right: user menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center justify-center p-1.5 rounded-full hover:bg-teal-700 transition-colors"
            aria-label="User Menu"
          >
            <img src="/settings.png" alt="Settings" className="w-6 h-6 object-contain" />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 mt-1 w-44 bg-white text-gray-900 rounded-lg shadow-lg py-1 z-40 text-sm">
                <div className="px-3 py-2 border-b border-gray-200 text-xs text-gray-500">
                  {user?.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600 text-sm"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
