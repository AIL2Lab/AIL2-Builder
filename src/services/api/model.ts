import { request } from '@/lib/request';
import { Model } from '@/generated/client';

export interface GetModelsResult {
  models: Model[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  list?: Model[]; // 兼容旧接口
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
    return request.get<GetModelsResult>('/model/list', {
      params: {
        page: params.page || 1,
        pageSize: params.pageSize || 10,
        query: params.query || ''
      }
    });
  },

  /**
   * Create a new model
   */
  createModel: (data: Partial<Model>) => {
    return request.post<Model>('/model', data);
  },

  /**
   * Get a single model by ID
   */
  getModelById: (id: string) => {
    return request.get<Model>(`/model/${id}`);
  }
};

// 导出单独的函数以保持兼容性
export const fetchModels = ModelService.getModels;
export const createModelApi = ModelService.createModel;
export const getModelByIdApi = ModelService.getModelById;
