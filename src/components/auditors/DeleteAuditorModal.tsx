import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Auditor } from '../../types/auditor';

interface DeleteAuditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditor: Auditor | null;
  onConfirm: (id: number) => Promise<void>;
  isLoading?: boolean;
}

export const DeleteAuditorModal: React.FC<DeleteAuditorModalProps> = ({
  isOpen,
  onClose,
  auditor,
  onConfirm,
  isLoading = false,
}) => {
  const handleConfirm = async () => {
    if (auditor) {
      try {
        await onConfirm(auditor.id);
        onClose();
      } catch (error) {
        console.error('Failed to delete auditor:', error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        {/* Delete Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="text-3xl">🗑️</div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Auditor?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete {auditor?.fullName}? This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <Button type="button" variant="secondary" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            fullWidth
            onClick={handleConfirm}
            loading={isLoading}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
