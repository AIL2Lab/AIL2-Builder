import { request } from '@/lib/request';
import type { Agent } from '@/generated/client'; 

export interface GetModelsResult {
  list: Agent[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface GetModelsParams {
  page?: number;
  pageSize?: number;
  query?: string;
}

// get Model list
export const fetchModels = (params: GetModelsParams) => {
  return request.get<GetModelsResult>('/agent/list', {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      query: params.query
    }
  });
};

// create Model
export const createModelApi = (data: Partial<Agent>) => {
  return request.post<Agent>('/agent', data);
};

// get single Model (示例)
export const getModelByIdApi = (id: string) => {
  return request.get<Agent>(`/agent/${id}`);
};