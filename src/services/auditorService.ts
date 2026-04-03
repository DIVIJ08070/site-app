import axiosClient from './axiosClient';
import {
  Auditor,
  CreateAuditorRequest,
  AuditorsListResponse,
  PaginationParams,
} from '../types/auditor';

const mapAuditorFromBackend = (data: any): Auditor => ({
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
} as any);

const mapAuditorToBackend = (data: CreateAuditorRequest): any => {
  return {
    full_name: data.fullName,
    email: data.email,
    dob: data.dateOfBirth,
    gender: data.gender,
    company_name: data.companyName,
    phone: data.phoneNumber,
    status: 1, // required by schema 
  };
};

export const auditorService = {
  async getAuditors(params: PaginationParams): Promise<AuditorsListResponse> {
    const apiParams: any = {
      page: params.page,
      limit: params.limit,
      search: params.search || '',
    };
    
    if (params.status !== '') {
      apiParams.status = params.status;
    } else {
      apiParams.is_active_inactive = 1;
    }

    const response = await axiosClient.get<any>('/auditor', {
      params: apiParams,
    });
    return {
      ...response.data,
      data: response.data.data ? response.data.data.map(mapAuditorFromBackend) : [],
    };
  },

  async getAuditorById(id: number): Promise<Auditor> {
    const response = await axiosClient.get<any>(`/auditor/${id}`);
    return mapAuditorFromBackend(response.data.data || response.data);
  },

  async createAuditor(data: CreateAuditorRequest): Promise<Auditor> {
    const response = await axiosClient.post<any>('/auditor', mapAuditorToBackend(data));
    return mapAuditorFromBackend(response.data.data || response.data);
  },

  async updateAuditor(id: number, data: CreateAuditorRequest): Promise<Auditor> {
    const response = await axiosClient.patch<any>(`/auditor/${id}`, mapAuditorToBackend(data));
    return mapAuditorFromBackend(response.data.data || response.data);
  },

  async deleteAuditor(id: number): Promise<void> {
    await axiosClient.delete(`/auditor/${id}`);
  },
};
