import { request } from '@/lib/request';
import { Agent } from '@/generated/client';

export interface GetModelsResult {
  agents: Agent[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface GetModelsParams {
  page?: number;
  pageSize?: number;
  query?: string;
}

export const ModelService = {
  /**
   * Get model list with pagination
   */
  getModels: (params: GetModelsParams = {}) => {
    return request.get<GetModelsResult>('/agent/list', {
      params: {
        page: params.page || 1,
        pageSize: params.pageSize || 10,
        query: params.query || ''
      }
    });
  }
};
