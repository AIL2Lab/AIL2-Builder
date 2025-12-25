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
  getModels: async (params: { page: number; pageSize: number; query?: string; filter?: 'all' | 'tradable' | 'iao_active' }) => {
    // For server components or direct server action usage
    // We can't import server actions directly in client components if we want to use them as simple functions sometimes
    // But here we are calling the server action.
    
    // Dynamically import to avoid build issues if mixed environment
    // OR just call the action directly if this file is used in client components
    const { getModels } = await import('@/actions/models');
    return getModels(params);
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
