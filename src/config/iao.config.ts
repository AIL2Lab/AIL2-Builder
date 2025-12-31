/**
 * IAO 配置参数
 */
export const IAO_CONFIG = {
  // 代币供应
  totalSupply: BigInt('100000000000') * BigInt(10 ** 18),      // 1000亿代币
  iaoRewardAmount: BigInt('15000000000') * BigInt(10 ** 18),   // 150亿代币 (15%)
  
  // 时间配置
  delayStartSeconds: 0,        // 立即开始
  // delayStartSeconds: 3600,        // 1小时后开始
  durationHours: 72,              // 持续72小时 (3天)
  
  // 代币地址
  nftHolder: '0x0000000000000000000000000000000000000000',
} as const;
