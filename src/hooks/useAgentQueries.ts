import { getAgents } from "@/actions/agents";
import { GetAgentsParams } from "@/types/agent";
import { useQuery } from "@tanstack/react-query";

// 查询键工厂
export const agentQueryKeys = {
  all: ['agents'] as const,
  lists: () => [...agentQueryKeys.all, 'list'] as const,
  list: (params: GetAgentsParams) => [...agentQueryKeys.lists(), params] as const,
  details: () => [...agentQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...agentQueryKeys.details(), id] as const,
  prices: () => [...agentQueryKeys.all, 'prices'] as const,
}

// 获取 Agent 列表
export function useAgentList(params: GetAgentsParams = {}) {
  return useQuery({
    queryKey: agentQueryKeys.list(params),
    queryFn: () => getAgents(params),
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