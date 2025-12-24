import { createPublicClient, http, formatUnits } from 'viem';
import { currentChain } from '@/config/network.config';
import { getContractABI } from '@/config/contracts';
import prisma from '@/lib/prisma'; 

const publicClient = createPublicClient({
  chain: currentChain,
  transport: http()
});

/**
 * 批量检查 IAO 状态
 * 这一步包含了：过滤、Multicall 请求、数据库更新
 */
export async function batchCheckAndUpdateIaoStatus(models: any[]) {
  if (!models || models.length === 0) return;

  const now = Math.floor(Date.now() / 1000);
  
  // 1. 筛选出真正需要调用 RPC 的 Model
  // 排除掉那些虽然取出来了，但还没到结束时间的（双重保险）
  const modelsToCall = models.filter(model => {
    const iaoEndTime = model.iaoEndTime ? Number(model.iaoEndTime) : 0;
    return iaoEndTime > 0 && now >= iaoEndTime;
  });

  if (modelsToCall.length === 0) return;

  console.log(`准备批量检查 ${modelsToCall.length} 个 Model 的合约状态`);

  // 2. 构造 Multicall 参数
  const contracts = modelsToCall.map(model => {
    const address = process.env.NEXT_PUBLIC_IS_TEST_ENV === 'true'
      ? model.iaoContractAddressTestnet
      : model.iaoContractAddress;
    
    // 如果没有地址，构造一个无效调用或者标记跳过，这里简化处理
    // 实际业务中应确保数据库数据的完整性
    if (!address) return null;

    return {
      address: address as `0x${string}`,
      abi: getContractABI(model.symbol),
      functionName: 'isSuccess',
    };
  }).filter(item => item !== null); // 过滤掉没有地址的

  if (contracts.length === 0) return;

  try {
    // 3. 发起 单次 HTTP 请求 (Multicall)
    // allowFailure: true 允许部分失败而不抛出异常
    const results = await publicClient.multicall({
      contracts: contracts as any,
      allowFailure: true 
    });

    // 4. 处理结果并批量准备更新
    const updatePromises = results.map(async (result, index) => {
      const model = modelsToCall[index];
      
      // 如果调用失败或状态为 null
      if (result.status === 'failure') {
        console.error(`Model ${model.name} 检查失败:`, result.error);
        return; 
      }

      const isSuccessful = result.result as boolean;
      
      // 5. 更新数据库
      // 只有当状态真正改变或者确认需要写入时才更新
      return prisma.model.update({
        where: { id: model.id },
        data: {
          iaoSuccessful: isSuccessful,
          iaoSuccessChecked: true,
          iaoSuccessCheckTime: new Date()
        }
      });
    });

    // 等待所有数据库更新完成
    await Promise.all(updatePromises);
    console.log('批量检查并更新完成');

  } catch (error) {
    console.error('Multicall 执行失败:', error);
  }
}
