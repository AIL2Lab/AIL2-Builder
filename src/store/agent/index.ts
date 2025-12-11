
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { GetAgentsParams } from '@/types/agent'

export const statusFilterAtom = atom("");

// URL 参数和过滤器状态
export const agentFilterAtom = atom<GetAgentsParams>({
  sortBy: 'marketCap',
  sortOrder: 'desc',
  searchKeyword: '',
  status: '',
  pageSize: 1000,
})

// UI 状态
export const agentUIAtom = atom({
  selectedAgentId: null as string | null,
  isCreateModalOpen: false,
  isEditModalOpen: false,
})

// 本地存储的偏好设置
export const agentPreferencesAtom = atomWithStorage('agent-preferences', {
  defaultSortBy: 'marketCap',
  defaultSortOrder: 'desc',
})

