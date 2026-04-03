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
