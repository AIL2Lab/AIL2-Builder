import { createPublicClient, http, formatUnits } from 'viem';
import { dbcMainnet } from '@/config/network.config';
import { getContractABI } from '@/config/contracts';
import prisma from '@/lib/prisma'; 

const publicClient = createPublicClient({
  chain: dbcMainnet,
  transport: http()
});

/**
 * 批量检查 IAO 状态
 * 这一步包含了：过滤、Multicall 请求、数据库更新
 */
export async function batchCheckAndUpdateIaoStatus(agents: any[]) {
  if (!agents || agents.length === 0) return;

  const now = Math.floor(Date.now() / 1000);
  
  // 1. 筛选出真正需要调用 RPC 的 Agent
  // 排除掉那些虽然取出来了，但还没到结束时间的（双重保险）
  const agentsToCall = agents.filter(agent => {
    const iaoEndTime = agent.iaoEndTime ? Number(agent.iaoEndTime) : 0;
    return iaoEndTime > 0 && now >= iaoEndTime;
  });

  if (agentsToCall.length === 0) return;

  console.log(`准备批量检查 ${agentsToCall.length} 个 Agent 的合约状态`);

  // 2. 构造 Multicall 参数
  const contracts = agentsToCall.map(agent => {
    const address = process.env.NEXT_PUBLIC_IS_TEST_ENV === 'true'
      ? agent.iaoContractAddressTestnet
      : agent.iaoContractAddress;
    
    // 如果没有地址，构造一个无效调用或者标记跳过，这里简化处理
    // 实际业务中应确保数据库数据的完整性
    if (!address) return null;

    return {
      address: address as `0x${string}`,
      abi: getContractABI(agent.symbol),
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
      const agent = agentsToCall[index];
      
      // 如果调用失败或状态为 null
      if (result.status === 'failure') {
        console.error(`Agent ${agent.name} 检查失败:`, result.error);
        return; 
      }

      const isSuccessful = result.result as boolean;
      
      // 5. 更新数据库
      // 只有当状态真正改变或者确认需要写入时才更新
      return prisma.agent.update({
        where: { id: agent.id },
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