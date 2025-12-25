// src/services/onchain/iaoCreatedListener.service.ts

import { 
  createPublicClient, 
  http, 
  webSocket,
  parseAbiItem, 
  formatUnits,
} from 'viem';
import { currentChain } from '@/config/network.config';

// IAO Factory 合约 ABI
const IAO_FACTORY_ABI = [
  parseAbiItem('event IaoCreated(address indexed proxyAddress, address indexed creator, address indexed owner, address tokenIn, address rewardToken, address aiL2NftHolder, uint256 startTime, uint256 depositPeriodHours, uint256 totalReward, uint256 timestamp)')
] as const;

/**
 * IAO 创建事件接口
 */
export interface IaoCreatedEvent {
  proxyAddress: string;
  creator: string;
  owner: string;
  tokenIn: string;
  rewardToken: string;
  aiL2NftHolder: string;
  startTime: bigint;
  depositPeriodHours: bigint;
  totalReward: bigint;
  timestamp: bigint;
  blockNumber: bigint;
  transactionHash: string;
}

/**
 * IAO Created 事件监听器（简化版）
 */
export class IaoCreatedListenerService {
  private client;
  private wsClient;
  private factoryAddress: string = '';
  private unwatch?: () => void;
  private onEventCallback?: (event: IaoCreatedEvent) => Promise<void>;

  constructor() {
    const RPC_URL = process.env.NEXT_PUBLIC_MAINNET_RPC_URL;
    const WS_URL = process.env.NEXT_PUBLIC_MAINNET_WS_URL;

    // HTTP 客户端
    this.client = createPublicClient({
      chain: currentChain,
      transport: http(RPC_URL),
    });

    // WebSocket 客户端（如果有的话）
    this.wsClient = WS_URL 
      ? createPublicClient({
          chain: currentChain,
          transport: webSocket(WS_URL),
        })
      : this.client;
  }

  /**
   * 初始化
   */
  async init(factoryAddress: string) {
    this.factoryAddress = factoryAddress.toLowerCase();
    console.log(`✅ [IAO Created] 初始化完成，Factory: ${this.factoryAddress}`);
  }

  /**
   * 设置事件回调
   */
  onIaoCreated(callback: (event: IaoCreatedEvent) => Promise<void>) {
    this.onEventCallback = callback;
  }

  /**
   * 启动监听
   */
  start() {
    console.log('🚀 [IAO Created] 开始监听 IaoCreated 事件...\n');

    this.unwatch = this.wsClient.watchContractEvent({
      address: this.factoryAddress as `0x${string}`,
      abi: IAO_FACTORY_ABI,
      eventName: 'IaoCreated',
      onLogs: async (logs) => {
        for (const log of logs) {
          await this.handleLog(log);
        }
      },
    });
  }

  /**
   * 停止监听
   */
  stop() {
    if (this.unwatch) {
      this.unwatch();
      console.log('🛑 [IAO Created] 已停止监听');
    }
  }

  /**
   * 处理日志
   */
  private async handleLog(log: any) {
    try {
      const block = await this.client.getBlock({ blockNumber: log.blockNumber });

      const event: IaoCreatedEvent = {
        proxyAddress: log.args.proxyAddress.toLowerCase(),
        creator: log.args.creator.toLowerCase(),
        owner: log.args.owner.toLowerCase(),
        tokenIn: log.args.tokenIn.toLowerCase(),
        rewardToken: log.args.rewardToken.toLowerCase(),
        aiL2NftHolder: log.args.aiL2NftHolder.toLowerCase(),
        startTime: log.args.startTime,
        depositPeriodHours: log.args.depositPeriodHours,
        totalReward: log.args.totalReward,
        timestamp: log.args.timestamp,
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
      };

      // 打印事件
      this.printEvent(event, Number(block.timestamp));

      // 触发回调
      if (this.onEventCallback) {
        await this.onEventCallback(event);
      }

    } catch (error) {
      console.error('❌ 处理事件失败:', error);
    }
  }

  /**
   * 打印事件
   */
  private printEvent(event: IaoCreatedEvent, blockTimestamp: number) {
    console.log('\n' + '='.repeat(80));
    console.log('🎉 检测到新 IAO 创建！');
    console.log('='.repeat(80));
    
    console.log(`\n📍 IAO 地址:        ${event.proxyAddress}`);
    console.log(`👤 创建者:          ${event.creator}`);
    console.log(`👤 所有者:          ${event.owner}`);
    
    console.log(`\n💰 质押代币:        ${event.tokenIn}`);
    console.log(`💰 奖励代币:        ${event.rewardToken}`);
    console.log(`🎨 NFT 持有者:      ${event.aiL2NftHolder}`);
    
    const startDate = new Date(Number(event.startTime) * 1000);
    const endDate = new Date((Number(event.startTime) + Number(event.depositPeriodHours) * 3600) * 1000);
    
    console.log(`\n⏰ 开始时间:        ${startDate.toLocaleString('zh-CN')}`);
    console.log(`⏰ 存款周期:        ${event.depositPeriodHours} 小时`);
    console.log(`⏰ 结束时间:        ${endDate.toLocaleString('zh-CN')}`);
    
    console.log(`\n💎 总奖励:          ${formatUnits(event.totalReward, 18)} (${event.totalReward} Wei)`);
    
    console.log(`\n🔗 区块高度:        ${event.blockNumber}`);
    console.log(`🔗 交易哈希:        ${event.transactionHash}`);
    
    console.log('\n' + '='.repeat(80) + '\n');
  }

  /**
   * 扫描历史事件
   */
  async scanHistory(fromBlock: bigint, toBlock?: bigint) {
    console.log(`\n📜 [IAO Created] 扫描历史事件 (${fromBlock} -> ${toBlock || 'latest'})...\n`);

    const logs = await this.client.getContractEvents({
      address: this.factoryAddress as `0x${string}`,
      abi: IAO_FACTORY_ABI,
      eventName: 'IaoCreated',
      fromBlock,
      toBlock: toBlock || 'latest',
    });

    console.log(`✅ 找到 ${logs.length} 个历史事件\n`);

    const events: IaoCreatedEvent[] = [];

    for (const log of logs) {
      const block = await this.client.getBlock({ blockNumber: log.blockNumber });
      
      const event: IaoCreatedEvent = {
        proxyAddress: log.args.proxyAddress!.toLowerCase(),
        creator: log.args.creator!.toLowerCase(),
        owner: log.args.owner!.toLowerCase(),
        tokenIn: log.args.tokenIn!.toLowerCase(),
        rewardToken: log.args.rewardToken!.toLowerCase(),
        aiL2NftHolder: log.args.aiL2NftHolder!.toLowerCase(),
        startTime: log.args.startTime!,
        depositPeriodHours: log.args.depositPeriodHours!,
        totalReward: log.args.totalReward!,
        timestamp: log.args.timestamp!,
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
      };

      events.push(event);
      this.printEvent(event, Number(block.timestamp));
    }

    return events;
  }

  /**
   * 获取状态
   */
  getStatus() {
    return {
      isRunning: !!this.unwatch,
      factoryAddress: this.factoryAddress,
      mode: process.env.NEXT_PUBLIC_MAINNET_WS_URL ? 'WebSocket' : 'HTTP Polling',
    };
  }
}

// 单例导出
export const iaoCreatedListenerService = new IaoCreatedListenerService();
