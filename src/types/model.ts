
export interface LocalModel {
  id: string;
  name: string;
  description: string;
  descriptionJA?: string;
  descriptionKO?: string;
  descriptionZH?: string;
  descriptionZH_TW?: string;

  longDescription?: string | null;
  category: string;
  avatar?: string;
  status: string;
  capabilities: string;
  rating: number;
  usageCount: number;
  marketCap: string;
  marketCapTokenNumber?: number;
  change24h: string;
  volume24h: string;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  tvl: string;
  holdersCount: number;
  socialLinks?: string;
  tokenAddress?: string;
  iaoContractAddress?: string;
  totalSupply?: number;
  useCases?: string[];
  useCasesJA?: string[];
  useCasesKO?: string[];
  useCasesZH?: string[];
  chatEntry?: string;
  symbol: string;
  tokenAddressTestnet?: string;
  iaoContractAddressTestnet?: string;
  projectDescription?: string;
  iaoTokenAmount?: number;
  paymentContractAddress?: string;
  miningRate?: number; // 挖矿速率（每年可挖矿的代币比例）
  containerLink?: string; // 容器链接
  // Owner管理相关状态字段
  tokensDistributed?: boolean;
  ownerTransferred?: boolean;
  liquidityAdded?: boolean;
  tokensBurned?: boolean;
  miningOwnerTransferred?: boolean;
}

export interface GetModelsParams {
  page?: number;
  pageSize?: number;
  searchKeyword?: string;
  category?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  forceRefresh?: boolean;
}


export enum ModelSortField {
  INVESTED_XAA = 'investedXAA',
  HOLDERS_COUNT = 'holdersCount',
  MARKET_CAP = 'marketCap',
  LATEST = 'createdAt',
}


export const STATUS_SORT_OPTIONS_MAP: Record<string, { 
  options: { value: ModelSortField, label: string }[], 
  default: ModelSortField 
}> = {
  '': {  // 全部状态
    options: [
      { value: ModelSortField.MARKET_CAP, label: 'marketCap' },
      { value: ModelSortField.LATEST, label: 'latest' },
    ],
    default: ModelSortField.MARKET_CAP,
  },
  'IAO_ONGOING': {
    options: [
      { value: ModelSortField.INVESTED_XAA, label: 'investedXAA' },
      { value: ModelSortField.LATEST, label: 'latest' },
    ],
    default: ModelSortField.INVESTED_XAA,
  },
  'TRADABLE': {
    options: [
      { value: ModelSortField.MARKET_CAP, label: 'marketCap' },
      { value: ModelSortField.LATEST, label: 'latest' },
    ],
    default: ModelSortField.MARKET_CAP,
  },
  'IAO_COMING_SOON': {
    options: [
      { value: ModelSortField.LATEST, label: 'latest' },
    ],
    default: ModelSortField.LATEST,
  },
  'FAILED': {
    options: [
      { value: ModelSortField.INVESTED_XAA, label: 'investedXAA' },
      { value: ModelSortField.LATEST, label: 'latest' },
    ],
    default: ModelSortField.INVESTED_XAA,
  }
};
