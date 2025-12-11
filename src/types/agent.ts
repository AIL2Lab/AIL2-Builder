
export interface LocalAgent {
  id: string;
  name: string;
  description: string;
  descriptionJA?: string;
  descriptionKO?: string;
  descriptionZH?: string;

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

export interface GetAgentsParams {
  page?: number;
  pageSize?: number;
  searchKeyword?: string;
  category?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  forceRefresh?: boolean;
}


export enum AgentSortField {
  INVESTED_XAA = 'investedXAA',
  HOLDERS_COUNT = 'holdersCount',
  MARKET_CAP = 'marketCap',
  LATEST = 'createdAt',
}


export const STATUS_SORT_OPTIONS_MAP: Record<string, { 
  options: { value: AgentSortField, label: string }[], 
  default: AgentSortField 
}> = {
  '': {  // 全部状态
    options: [
      { value: AgentSortField.MARKET_CAP, label: 'marketCap' },
      { value: AgentSortField.LATEST, label: 'latest' },
    ],
    default: AgentSortField.MARKET_CAP,
  },
  'IAO_ONGOING': {
    options: [
      { value: AgentSortField.INVESTED_XAA, label: 'investedXAA' },
      { value: AgentSortField.LATEST, label: 'latest' },
    ],
    default: AgentSortField.INVESTED_XAA,
  },
  'TRADABLE': {
    options: [
      { value: AgentSortField.MARKET_CAP, label: 'marketCap' },
      { value: AgentSortField.LATEST, label: 'latest' },
    ],
    default: AgentSortField.MARKET_CAP,
  },
  'IAO_COMING_SOON': {
    options: [
      { value: AgentSortField.LATEST, label: 'latest' },
    ],
    default: AgentSortField.LATEST,
  },
  'FAILED': {
    options: [
      { value: AgentSortField.INVESTED_XAA, label: 'investedXAA' },
      { value: AgentSortField.LATEST, label: 'latest' },
    ],
    default: AgentSortField.INVESTED_XAA,
  }
};


