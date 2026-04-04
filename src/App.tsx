import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Auth Pages
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { VerifyOTPPage } from './pages/VerifyOTPPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

// Dashboard Pages
import { DashboardPage } from './pages/DashboardPage';
import { ManageAuditorsPage } from './pages/ManageAuditorsPage';

export const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auditors"
            element={
              <ProtectedRoute>
                <ManageAuditorsPage />
              </ProtectedRoute>
            }
          />

          {/* Default route */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    </Router>
  );
};

export default App;
