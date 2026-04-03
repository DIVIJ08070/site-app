import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Auditor, CreateAuditorRequest } from '../../types/auditor';
import { validators } from '../../utils/validators';

interface AddAuditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAuditorRequest) => Promise<void>;
  isLoading?: boolean;
}

export const AddAuditorModal: React.FC<AddAuditorModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<CreateAuditorRequest>({
    fullName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    companyName: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validators.isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!validators.isValidDate(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Invalid date';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validators.isValidPhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number (10 digits required)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      setFormData({
        fullName: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        companyName: '',
        phoneNumber: '',
      });
      setErrors({});
      onClose();
    } catch (error: any) {
      const respData = error.response?.data;
      const detailedMessage = respData?.errors ? JSON.stringify(respData.errors) : respData?.message || 'Failed to add auditor';
      setErrors({
        submit: detailedMessage,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Auditor">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            {errors.submit}
          </div>
        )}

        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="John Auditor"
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="auditor@company.com"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            error={errors.dateOfBirth}
            required
          />

          <Select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]}
            error={errors.gender}
            placeholder="Select Gender"
            required
          />
        </div>

        <Input
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          error={errors.companyName}
          placeholder="Acme Corp"
          helpText="Enter the organization the auditor is associated with"
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          placeholder="9876543210"
          required
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" fullWidth loading={isLoading}>
            Add Auditor
          </Button>
        </div>
      </form>
    </Modal>
  );
};
