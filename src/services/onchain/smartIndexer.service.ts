// src/services/onchain/smartIndexer.service.ts

import { currentContracts, networks } from '@/config/network.config';
import { databaseService } from './database.service';
import { 
  iaoCreatedListenerService, 
  IaoCreatedEvent 
} from './iaoCreatedListener.service';

/**
 * 智能索引器主服务（简化版）
 */
export class SmartIndexerService {
  /**
   * 启动索引器
   */
  async start() {
    console.log('🚀 Smart Indexer 启动中...\n');

    const factoryAddress = currentContracts.iaoFactory || '';
    
    if (!factoryAddress) {
      throw new Error('❌ 未配置 IAO_FACTORY_ADDRESS');
    }

    // 初始化并启动监听
    await iaoCreatedListenerService.init(factoryAddress);
    iaoCreatedListenerService.onIaoCreated(this.handleIaoCreated.bind(this));
    iaoCreatedListenerService.start();

    console.log('✅ Smart Indexer 启动成功\n');
  }

  /**
   * 处理新 IAO 创建事件
   */
  private async handleIaoCreated(event: IaoCreatedEvent) {
    try {
      // await databaseService.createIao({
      //   contractAddress: event.proxyAddress,
      //   creator: event.creator,
      //   owner: event.owner,
      //   tokenIn: event.tokenIn,
      //   rewardToken: event.rewardToken,
      //   aiL2NftHolder: event.aiL2NftHolder,
      //   startTime: event.startTime,
      //   depositPeriodHours: event.depositPeriodHours,
      //   totalReward: event.totalReward,
      //   createdAt: event.timestamp,
      //   transactionHash: event.transactionHash,
      //   blockNumber: event.blockNumber,
      // });

      console.log('✅ [Smart Indexer] 已保存到数据库\n');

    } catch (error) {
      console.error('❌ [Smart Indexer] 保存失败:', error);
    }
  }

  /**
   * 停止索引器
   */
  stop() {
    iaoCreatedListenerService.stop();
    console.log('✅ Smart Indexer 已停止\n');
  }

  /**
   * 扫描历史 IAO
   */
  async scanHistory(fromBlock: bigint, toBlock?: bigint) {
    const factoryAddress = currentContracts.iaoFactory || '';
    await iaoCreatedListenerService.init(factoryAddress);
    
    const events = await iaoCreatedListenerService.scanHistory(fromBlock, toBlock);

    for (const event of events) {
      await databaseService.createIao({
        contractAddress: event.proxyAddress,
        creator: event.creator,
        owner: event.owner,
        tokenIn: event.tokenIn,
        rewardToken: event.rewardToken,
        aiL2NftHolder: event.aiL2NftHolder,
        startTime: event.startTime,
        depositPeriodHours: event.depositPeriodHours,
        totalReward: event.totalReward,
        createdAt: event.timestamp,
        transactionHash: event.transactionHash,
        blockNumber: event.blockNumber,
      });
    }

    console.log(`✅ 已保存 ${events.length} 个历史 IAO\n`);
    return events;
  }
}

// 单例导出
export const smartIndexerService = new SmartIndexerService();
