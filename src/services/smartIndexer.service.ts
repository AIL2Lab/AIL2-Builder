import { createPublicClient, http, parseAbiItem, Log } from 'viem';
import prisma from "@/lib/prisma";
import { dbcMainnet } from '@/config/network.config';

// 配置
const CHAIN = dbcMainnet;
const RPC_URL = process.env.NEXT_PUBLIC_MAINNET_RPC_URL;
const POLLING_INTERVAL = 10_000; // 每10秒检查一次（比每分钟检查更实时，且压力更小）
const MAX_BLOCK_RANGE = 1000; // 每次最多拉取多少个区块的日志，防止 RPC 超时

// 事件签名
const EVENT_ABI = parseAbiItem('event TimeUpdated(uint256 startTime, uint256 endTime)');

class SmartContractIndexer {
  private client;
  private isRunning = false;
  private watchedAddresses: Set<string> = new Set(); // 内存白名单，查询极快
  private lastProcessedBlock: bigint = 0n; // 记录处理进度

  constructor() {
    this.client = createPublicClient({
      chain: CHAIN,
      transport: http(RPC_URL, {
        retryCount: 3,
        timeout: 30_000,
      }),
    });
  }

  /**
   * 初始化：从数据库加载所有需要监听的合约地址，并获取当前区块高度
   */
  async init() {
    console.log('🔄 [Indexer] 初始化索引器...');
    
    // 1. 加载白名单
    await this.refreshAddressList();
    
    // 2. 确定起始区块
    // 如果是第一次启动，从最新区块开始；如果需要持久化，这里可以从 Redis/DB 读取 lastProcessedBlock
    const currentBlock = await this.client.getBlockNumber();
    this.lastProcessedBlock = currentBlock;

    console.log(`✅ [Indexer] 初始化完成。监听合约数: ${this.watchedAddresses.size}, 起始区块: ${currentBlock}`);
  }

  /**
   * 刷新内存中的合约地址列表 (无需重启服务)
   */
  async refreshAddressList() {
    const models = await prisma.model.findMany({
      where: { iaoContractAddress: { not: null } },
      select: { iaoContractAddress: true },
    });
    
    // 更新 Set，全部转小写以防大小写敏感问题
    this.watchedAddresses = new Set(
      models.map(a => a.iaoContractAddress!.toLowerCase())
    );
    console.log(`📋 [Indexer] 合约白名单已更新，当前数量: ${this.watchedAddresses.size}`);
  }

  /**
   * 启动循环扫描
   */
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
    console.log('🚀 [Indexer] 服务已启动');
  }

  /**
   * 核心循环逻辑
   */
  private async loop() {
    while (this.isRunning) {
      try {
        const latestBlock = await this.client.getBlockNumber();

        // 如果没有新区块，休息一下
        if (latestBlock <= this.lastProcessedBlock) {
          await new Promise(r => setTimeout(r, POLLING_INTERVAL));
          continue;
        }

        // 计算本次扫描范围
        // 从 上次处理+1 开始
        const fromBlock = this.lastProcessedBlock + 1n;
        // 结束区块不能超过 MAX_BLOCK_RANGE，避免 RPC 报错
        let toBlock = latestBlock;
        if (toBlock - fromBlock > BigInt(MAX_BLOCK_RANGE)) {
          toBlock = fromBlock + BigInt(MAX_BLOCK_RANGE);
        }

        console.log(`🔍 [Indexer] 扫描区块范围: ${fromBlock} -> ${toBlock} (滞后: ${latestBlock - toBlock})`);

        // --- 核心优化：单次 RPC 获取所有日志 ---
        // 我们不传 address 参数，而是拉取全网的 TimeUpdated 事件，然后在内存里过滤
        // 这样可以避免 address 数组过长导致 RPC 拒绝请求
        const logs = await this.client.getLogs({
          event: EVENT_ABI,
          fromBlock,
          toBlock,
        });

        // 内存过滤与处理
        await this.processLogs(logs);

        // 更新进度
        this.lastProcessedBlock = toBlock;

      } catch (error) {
        console.error('❌ [Indexer] 扫描出错:', error);
        // 出错后等待较长时间再重试
        await new Promise(r => setTimeout(r, POLLING_INTERVAL * 2));
      }
    }
  }

  /**
   * 处理日志
   */
  private async processLogs(logs: any[]) {
    if (logs.length === 0) return;

    console.log(`⚡ 捕获到 ${logs.length} 个 TimeUpdated 事件，开始过滤...`);

    const updatePromises = logs.map(async (log) => {
      const contractAddress = log.address.toLowerCase();

      // 1. 内存过滤：只处理我们在乎的合约
      if (!this.watchedAddresses.has(contractAddress)) {
        return; // 忽略不相关的合约事件
      }

      const { startTime, endTime } = log.args;
      
      console.log(`🎯 [Hit] 更新合约 ${contractAddress}: Start=${startTime}, End=${endTime}`);

      // 2. 数据库更新
      // 注意：这里使用 updateMany 而不是 update，因为我们只知道 iaoContractAddress
      // 这样避免了先 find 一次 id 的开销
      return prisma.model.updateMany({
        where: { 
          iaoContractAddress: { equals: contractAddress, mode: 'insensitive' } 
        },
        data: {
          iaoStartTime: BigInt(startTime),
          iaoEndTime: BigInt(endTime),
        }
      });
    });

    await Promise.all(updatePromises);
  }

  /**
   * 新增合约时调用此方法（极速）
   */
  public addContractToWatch(address: string) {
    this.watchedAddresses.add(address.toLowerCase());
    console.log(`➕ [Indexer] 动态添加监听地址: ${address}`);
  }
}


// 定义全局类型，防止 TS 报错
const globalForIndexer = global as unknown as { smartIndexer: SmartContractIndexer | undefined };

// 如果全局已有实例则使用，否则新建
export const smartIndexer = globalForIndexer.smartIndexer ?? new SmartContractIndexer();

// 在非生产环境下，将实例挂载到 global，防止热重载导致重复创建
if (process.env.NODE_ENV !== 'production') {
  globalForIndexer.smartIndexer = smartIndexer;
}
