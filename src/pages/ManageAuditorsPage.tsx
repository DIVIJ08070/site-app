import React, { useState, useEffect } from 'react';
import { auditorService } from '../services/auditorService';
import { Auditor, CreateAuditorRequest, PaginationParams } from '../types/auditor';
import { AuditorTable } from '../components/auditors/AuditorTable';
import { AddAuditorModal } from '../components/auditors/AddAuditorModal';
import { EditAuditorModal } from '../components/auditors/EditAuditorModal';
import { DeleteAuditorModal } from '../components/auditors/DeleteAuditorModal';

export const ManageAuditorsPage: React.FC = () => {
  const [auditors, setAuditors] = useState<Auditor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [goToPage, setGoToPage] = useState('');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAuditor, setSelectedAuditor] = useState<Auditor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadAuditors();
  }, [searchTerm, statusFilter, currentPage, pageSize]);

  const loadAuditors = async () => {
    setIsLoading(true);
    try {
      const params: PaginationParams = {
        page: currentPage,
        limit: pageSize,
        search: searchTerm,
        status: statusFilter,
      };
      const response = await auditorService.getAuditors(params);
      setAuditors(response.data);
      setTotalItems(response.total);
    } catch (error) {
      console.error('Failed to load auditors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAuditor = async (data: CreateAuditorRequest) => {
    setIsSubmitting(true);
    try {
      await auditorService.createAuditor(data);
      await loadAuditors();
      setSuccessMessage('Auditor added successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditAuditor = async (id: number, data: CreateAuditorRequest) => {
    setIsSubmitting(true);
    try {
      await auditorService.updateAuditor(id, data);
      await loadAuditors();
      setSuccessMessage('Auditor updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAuditor = async (id: number) => {
    setIsSubmitting(true);
    try {
      await auditorService.deleteAuditor(id);
      setShowDeleteModal(false);
      setSelectedAuditor(null);
      await loadAuditors();
      setSuccessMessage('Auditor deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (auditor: Auditor) => {
    try {
      // Use the toggle-status endpoint from swagger
      await (await import('../services/axiosClient')).default.patch(`/auditor/${auditor.id}/toggle-status`);
      await loadAuditors();
      setSuccessMessage(`Auditor status toggled successfully`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to toggle auditor status:', error);
    }
  };

  const handleEdit = (auditor: Auditor) => {
    setSelectedAuditor(auditor);
    setShowEditModal(true);
  };

  const handleDelete = (auditor: Auditor) => {
    setSelectedAuditor(auditor);
    setShowDeleteModal(true);
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  const handleGoToPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const page = parseInt(goToPage);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
      setGoToPage('');
    }
  };

  return (
    <div className="space-y-3">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Auditors</h1>
          <p className="text-gray-500 text-xs mt-0.5">
            Dashboard / <span className="font-semibold text-gray-700">Manage Auditors</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
          {/* Search */}
          <div>
            <label className="text-xs text-gray-600 block mb-1">Search Auditor</label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-56"
              />
            </div>
          </div>

          {/* Filter */}
          <div>
            <label className="text-xs text-gray-600 block mb-1">Filter:</label>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-28 bg-white"
            >
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2 bg-teal-700 text-white text-sm font-semibold rounded-lg hover:bg-teal-800 transition-colors"
          >
            Add Auditor
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-3 shadow-sm rounded text-sm" role="alert">
          <p className="font-medium">{successMessage}</p>
        </div>
      )}

      {/* Table */}
      <AuditorTable
        auditors={auditors}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        isLoading={isLoading}
      />

      {/* Pagination */}
      <div className="bg-white rounded-lg shadow px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
        {/* Left: Show entries */}
        <div className="flex items-center gap-1 text-gray-600">
          Show{' '}
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-gray-300 rounded px-2 py-1 text-sm mx-1 bg-white"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>{' '}
          entries
        </div>

        {/* Center: Page info + Go to page */}
        <div className="flex items-center gap-2 text-gray-600">
          <span>Page {currentPage} of {totalPages || 1}</span>
          <span className="text-gray-400">|</span>
          <span>Go to page</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            onKeyDown={handleGoToPage}
            className="border border-gray-300 rounded px-2 py-1 text-sm w-14 text-center"
            placeholder=""
          />
        </div>

        {/* Right: Nav buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded bg-teal-700 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-800 transition-colors"
          >
            «
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded bg-teal-700 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-800 transition-colors"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="w-8 h-8 flex items-center justify-center rounded bg-teal-700 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-800 transition-colors"
          >
            ›
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="w-8 h-8 flex items-center justify-center rounded bg-teal-700 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-800 transition-colors"
          >
            »
          </button>
        </div>
      </div>

      {/* Modals */}
      <AddAuditorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddAuditor}
        isLoading={isSubmitting}
      />

      <EditAuditorModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedAuditor(null);
        }}
        auditor={selectedAuditor}
        onSubmit={handleEditAuditor}
        isLoading={isSubmitting}
      />

      <DeleteAuditorModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedAuditor(null);
        }}
        auditor={selectedAuditor}
        onConfirm={handleDeleteAuditor}
        isLoading={isSubmitting}
      />
    </div>
  );
};
