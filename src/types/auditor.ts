export interface Auditor {
  id: number;
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  companyName: string;
  phoneNumber: string;
  createdAt: string;
  status: 'Created' | 'Not Created' | 'Active' | 'Inactive';
  password?: string;
  passwordCreated: 'Created' | 'Not Created';
  numericStatus: number;
}

export interface CreateAuditorRequest {
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  companyName: string;
  phoneNumber: string;
}

export interface UpdateAuditorRequest extends CreateAuditorRequest {
  id: number;
}

export interface BackendAuditor {
  id: number;
  full_name: string;
  email: string;
  dob: string;
  gender: string;
  company_name: string;
  phone: string;
  created_at: string;
  status: number;
  is_password_created: number | boolean;
}

export interface BackendResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface AuditorsListResponse {
  data: Auditor[];
  total: number;
  page: number;
  limit: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}
