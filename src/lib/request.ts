import { ApiResponse } from '@/types/api';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

async function http<T>(path: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
  const { params, headers, ...rest } = config;
  
  // 1、deal params
  let url = `${BASE_URL}${path}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // 2. send request
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...rest,
    });

    // 3. parse JSON
    const data: ApiResponse<T> = await response.json();

    // 4. Unified handling of non-200 HTTP status codes or business logic errors.
    if (!response.ok || !data.success) {
      if (!response.ok) {
        throw new Error(data.message || `HTTP Error ${response.status}`);
      }
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// Easy export method
export const request = {
  get: <T>(path: string, config?: RequestConfig) => http<T>(path, { ...config, method: 'GET' }),
  post: <T>(path: string, data?: any, config?: RequestConfig) => http<T>(path, { ...config, method: 'POST', body: JSON.stringify(data) }),
  put: <T>(path: string, data?: any, config?: RequestConfig) => http<T>(path, { ...config, method: 'PUT', body: JSON.stringify(data) }),
  delete: <T>(path: string, config?: RequestConfig) => http<T>(path, { ...config, method: 'DELETE' }),
};