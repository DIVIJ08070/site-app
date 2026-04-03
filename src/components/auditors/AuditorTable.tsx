import React from 'react';
import { Auditor } from '../../types/auditor';

interface AuditorTableProps {
  auditors: Auditor[];
  onEdit: (auditor: Auditor) => void;
  onDelete: (auditor: Auditor) => void;
  onToggleStatus?: (auditor: Auditor) => void;
  isLoading?: boolean;
}

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '-';
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(-2);
    return `${mm}/${dd}/${yy}`;
  } catch {
    return '-';
  }
};

export const AuditorTable: React.FC<AuditorTableProps> = ({
  auditors,
  onEdit,
  onDelete,
  onToggleStatus,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-700 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading auditors...</p>
        </div>
      </div>
    );
  }

  if (auditors.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
        <div className="text-center">
          <p className="text-gray-500 text-base">No auditors found</p>
          <p className="text-gray-400 text-sm mt-1">Add a new auditor to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Id</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Full Name</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Company</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Phone Number</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Created</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Password</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
          </tr>
        </thead>
        <tbody>
          {auditors.map((auditor, index) => {
            const isActive = auditor.status === 'Active' || auditor.numericStatus === 1;
            return (
              <tr key={auditor.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                <td className="px-4 py-3 text-gray-800 font-medium">{auditor.fullName}</td>
                <td className="px-4 py-3 text-gray-600">{auditor.email}</td>
                <td className="px-4 py-3 text-gray-600">{auditor.companyName || '-'}</td>
                <td className="px-4 py-3 text-gray-600">{auditor.phoneNumber || '-'}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(auditor.createdAt)}</td>
                <td className="px-4 py-3 text-gray-600">{auditor.passwordCreated || 'Not Created'}</td>
                <td className="px-4 py-3">
                  {/* Toggle Switch */}
                  <button
                    onClick={() => onToggleStatus?.(auditor)}
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none"
                    style={{ backgroundColor: isActive ? '#0f766e' : '#d1d5db' }}
                    aria-label={`Toggle status for ${auditor.fullName}`}
                  >
                    <span
                      className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200"
                      style={{ transform: isActive ? 'translateX(1.35rem)' : 'translateX(0.2rem)' }}
                    />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(auditor)}
                      className="text-gray-500 hover:text-teal-700 transition-colors p-1"
                      aria-label="Edit auditor"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(auditor)}
                      className="text-gray-500 hover:text-red-600 transition-colors p-1"
                      aria-label="Delete auditor"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
