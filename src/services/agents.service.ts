import { LocalAgent } from '@/types/agent';

const API_BASE_URL = (process.env.APP_ORIGIN || 'http://localhost:3000') + '/api';
console.log(11112222);

console.log(process.env.APP_ORIGIN);

// 通用 fetch 请求封装
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // 获取认证信息
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const walletAddress = typeof window !== 'undefined' ? localStorage.getItem('walletAddress') : null;
  
  // 构建请求头
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (userId) headers['x-user-id'] = userId;
  if (walletAddress) headers['x-user-address'] = walletAddress;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
    
    throw new Error('Network error');
  }
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface GetAgentsParams {
  page?: number;
  pageSize?: number;
  searchKeyword?: string;
  category?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  forceRefresh?: boolean;
}

interface GetAgentsData {
  items: LocalAgent[];
  total: number;
  page: number;
  pageSize: number;
}

export const agentAPI = {
  // 获取所有 agents
  getAllAgents: async (params: GetAgentsParams = {}): Promise<ApiResponse<GetAgentsData>> => {
    const { 
      page = 1, 
      pageSize = 20, 
      searchKeyword, 
      category, 
      status,
      sortBy,
      sortOrder = 'desc',
      forceRefresh
    } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(searchKeyword && { searchKeyword }),
      ...(category && { category }),
      ...(status && { status }),
      ...(sortBy && { sortBy }),
      ...(sortOrder && { sortOrder }),
      ...(forceRefresh && { forceRefresh: 'true' }),
    });

    return apiRequest<ApiResponse<GetAgentsData>>(`/agents?${queryParams}`);
  }
};
