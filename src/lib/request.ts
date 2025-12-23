import { ApiResponse } from '@/types/api';
import { getToken } from './utils';
import { TOKEN_KEY } from '@/config/storage.config';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | undefined>;
  skipAuth?: boolean;
}

async function http<T>(path: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
  const { params, headers = {}, skipAuth = false, ...rest } = config;
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

// 2. deal Headers & Token
  const finalHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

if (!skipAuth) {
    const token = getToken();
    if (token) {
      // @ts-ignore
      finalHeaders['Authorization'] = `Bearer ${token}`;
    }
  }






  // 2. send request
  try {
    const response = await fetch(url, {
      headers: finalHeaders,
      ...rest,
    });

    // 3. parse JSON
    const data: ApiResponse<T> = await response.json();
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
      }
      throw new Error('Unauthorized: Please login again.');
    }

    // 4. Unified handling of non-200 HTTP status codes or business logic errors.
    if (!response.ok || !data.success) {
      if (!response.ok) {
        throw new Error(data.message || `HTTP Error ${response.status}`);
      }
    }

    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
       console.log('Request aborted');
       // Return a pending promise or specific error structure if needed, 
       // but typically we just let it throw or handle it in UI
       throw error; 
    }
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
  // Expose raw http for custom needs like AbortSignal
  http 
};