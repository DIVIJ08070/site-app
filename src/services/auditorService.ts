import axiosClient from './axiosClient';
import {
  Auditor,
  CreateAuditorRequest,
  AuditorsListResponse,
  PaginationParams,
  BackendAuditor,
  BackendResponse,
} from '../types/auditor';

const mapAuditorFromBackend = (data: BackendAuditor): Auditor => ({
  id: data.id,
  fullName: data.full_name || '',
  email: data.email || '',
  dateOfBirth: data.dob || '',
  gender: data.gender || '',
  companyName: data.company_name || '',
  phoneNumber: data.phone || '',
  createdAt: data.created_at || new Date().toISOString(),
  status: data.status === 1 ? 'Active' : 'Inactive',
  passwordCreated: data.is_password_created === 1 || data.is_password_created === true ? 'Created' : 'Not Created',
  numericStatus: data.status,
});

const mapAuditorToBackend = (data: CreateAuditorRequest): Partial<BackendAuditor> => {
  return {
    full_name: data.fullName,
    email: data.email,
    dob: data.dateOfBirth,
    gender: data.gender,
    company_name: data.companyName,
    phone: data.phoneNumber,
    status: 1, 
  };
};

export const auditorService = {
  async getAuditors(params: PaginationParams): Promise<AuditorsListResponse> {
    const apiParams: Record<string, string | number | undefined> = {
      page: params.page,
      limit: params.limit,
      search: params.search || '',
    };
    
    if (params.status && params.status !== '') {
      apiParams.status = params.status;
    } else {
      apiParams.is_active_inactive = 1;
    }

    const response = await axiosClient.get<BackendResponse<BackendAuditor[]> & { total: number, page: number, limit: number }>('/auditor', {
      params: apiParams,
    });
    return {
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
      data: response.data.data ? response.data.data.map(mapAuditorFromBackend) : [],
    };
  },

  async getAuditorById(id: number): Promise<Auditor> {
    const response = await axiosClient.get<BackendResponse<BackendAuditor>>(`/auditor/${id}`);
    const auditorData = response.data.data;
    return mapAuditorFromBackend(auditorData);
  },

  async createAuditor(data: CreateAuditorRequest): Promise<Auditor> {
    const response = await axiosClient.post<BackendResponse<BackendAuditor>>('/auditor', mapAuditorToBackend(data));
    return mapAuditorFromBackend(response.data.data);
  },

  async updateAuditor(id: number, data: CreateAuditorRequest): Promise<Auditor> {
    const response = await axiosClient.patch<BackendResponse<BackendAuditor>>(`/auditor/${id}`, mapAuditorToBackend(data));
    return mapAuditorFromBackend(response.data.data);
  },

  async deleteAuditor(id: number): Promise<void> {
    await axiosClient.delete(`/auditor/${id}`);
  },
};
