import React from 'react';

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600">Welcome to the Disability Inclusion Solutions Admin Panel.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-semibold">AUDITORS</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">0</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-semibold">SITES</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">0</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-semibold">QUESTIONNAIRES</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">0</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-semibold">AUDITS</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">0</div>
        </div>
      </div>
    </div>
  );
};
