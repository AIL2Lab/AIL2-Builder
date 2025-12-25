import prisma from "@/lib/prisma";

/**
 * 数据库服务：负责所有与数据库交互的操作
 */
export class DatabaseService {
  
  /**
   * 获取所有需要监听的合约地址
   */
  async getAllWatchedContracts(): Promise<string[]> {
    const models = await prisma.model.findMany({
      where: { iaoContractAddress: { not: null } },
      select: { iaoContractAddress: true },
    });
    
    return models
      .map(m => m.iaoContractAddress!)
      .filter(Boolean)
      .map(addr => addr.toLowerCase());
  }

  /**
   * 打印所有模型信息（调试用）
   */
  async printAllModels() {
    const models = await prisma.model.findMany({
      select: {
        id: true,
        name: true,
        iaoContractAddress: true,
        iaoStartTime: true,
        iaoEndTime: true,
      },
    });

    console.log('📊 ========== 所有模型列表 ==========');
    console.log(`总数: ${models.length}\n`);
    
    models.forEach((model, index) => {
      console.log(`[${index + 1}] ${model.name || '未命名'}`);
      console.log(`    ID: ${model.id}`);
      console.log(`    合约: ${model.iaoContractAddress || '未设置'}`);
      console.log(`    开始时间: ${model.iaoStartTime || '未设置'}`);
      console.log(`    结束时间: ${model.iaoEndTime || '未设置'}`);
      console.log('');
    });
    
    console.log('====================================\n');
    
    return models;
  }

  /**
   * 更新合约的时间信息
   */
  async updateContractTime(
    contractAddress: string, 
    startTime: bigint, 
    endTime: bigint
  ) {
    const result = await prisma.model.updateMany({
      where: { 
        iaoContractAddress: { 
          equals: contractAddress, 
          mode: 'insensitive' 
        } 
      },
      data: {
        iaoStartTime: startTime,
        iaoEndTime: endTime,
      }
    });

    console.log(
      `💾 [DB] 更新合约 ${contractAddress}: ` +
      `Start=${startTime}, End=${endTime} (影响行数: ${result.count})`
    );

    return result;
  }

  /**
   * 根据合约地址查询模型
   */
  async getModelByContract(contractAddress: string) {
    return await prisma.model.findFirst({
      where: {
        iaoContractAddress: {
          equals: contractAddress,
          mode: 'insensitive'
        }
      }
    });
  }

  /**
   * 批量更新合约时间（优化性能）
   */
  async batchUpdateContractTimes(
    updates: Array<{
      contractAddress: string;
      startTime: bigint;
      endTime: bigint;
    }>
  ) {
    const promises = updates.map(update =>
      this.updateContractTime(
        update.contractAddress,
        update.startTime,
        update.endTime
      )
    );

    return await Promise.all(promises);
  }
}

// 单例导出
export const databaseService = new DatabaseService();
