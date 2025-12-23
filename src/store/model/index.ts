
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { GetModelsParams } from '@/types/model'

export const statusFilterAtom = atom("");

// URL 参数和过滤器状态
export const modelFilterAtom = atom<GetModelsParams>({
  sortBy: 'marketCap',
  sortOrder: 'desc',
  searchKeyword: '',
  status: '',
  pageSize: 1000,
})

// UI 状态
export const modelUIAtom = atom({
  selectedModelId: null as string | null,
  isCreateModalOpen: false,
  isEditModalOpen: false,
})

// 本地存储的偏好设置
export const modelPreferencesAtom = atomWithStorage('model-preferences', {
  defaultSortBy: 'marketCap',
  defaultSortOrder: 'desc',
})
