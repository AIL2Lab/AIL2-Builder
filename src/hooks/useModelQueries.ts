import { getModels } from "@/actions/models";
import { GetModelsParams } from "@/types/model";
import { useQuery } from "@tanstack/react-query";

// 查询键工厂
export const modelQueryKeys = {
  all: ['models'] as const,
  lists: () => [...modelQueryKeys.all, 'list'] as const,
  list: (params: GetModelsParams) => [...modelQueryKeys.lists(), params] as const,
  details: () => [...modelQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...modelQueryKeys.details(), id] as const,
  prices: () => [...modelQueryKeys.all, 'prices'] as const,
}

// 获取 Model 列表
export function useModelList(params: GetModelsParams = {}) {
  return useQuery({
    queryKey: modelQueryKeys.list(params),
    queryFn: () => getModels(params),
    staleTime: 30 * 1000, // 30秒内数据被认为是新鲜的
    gcTime: 5 * 60 * 1000, // 5分钟后清理缓存
    retry: (failureCount, error) => {
      // 4xx 错误不重试
      if (error && typeof error === 'object' && 'status' in error) {
        const status = (error as any).status;
        if (status >= 400 && status < 500) return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}