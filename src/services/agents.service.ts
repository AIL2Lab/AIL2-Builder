import { request } from '@/lib/request';
import type { Agent } from '@/generated/client'; 

export interface GetAgentsResult {
  list: Agent[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface GetAgentsParams {
  page?: number;
  pageSize?: number;
  query?: string;
}

// get Agent list
export const fetchAgents = (params: GetAgentsParams) => {
  return request.get<GetAgentsResult>('/agent/list', {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      query: params.query
    }
  });
};

// create Agent
export const createAgentApi = (data: Partial<Agent>) => {
  return request.post<Agent>('/agent', data);
};

// get single Agent (示例)
export const getAgentByIdApi = (id: string) => {
  return request.get<Agent>(`/agent/${id}`);
};