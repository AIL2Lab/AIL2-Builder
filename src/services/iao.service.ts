import { createPublicClient, http } from 'viem';
import { dbcMainnet } from '@/config/network.config';
import { getContractABI } from '@/config/contracts';
import prisma from '@/lib/prisma';


const publicClient = createPublicClient({
  chain: dbcMainnet,
  transport: http()
});

export async function processPendingIaoChecks() {
  const now = Math.floor(Date.now() / 1000);
  
  const pendingAgents = await prisma.agent.findMany({
    where: {
      iaoSuccessChecked: false, 
      iaoEndTime: {
        not: null,
        lte: now 
      },
      OR: [
        { iaoContractAddress: { not: null } },
      ]
    },
    take: 50, 
    select: {
      id: true,
      name: true,
      symbol: true,
      iaoContractAddress: true,
    }
  });

  if (pendingAgents.length === 0) {
    return { count: 0, message: 'No Agent needs to be checked' };
  }

  console.log(`[Cron] Start batch checking ${pendingAgents.length} agents`);
  
  const contractCalls = pendingAgents.map(agent => {
    return {
      address: agent.iaoContractAddress as `0x${string}`,
      abi: getContractABI(agent.symbol),
      functionName: 'isSuccess',
    };
  });

  try {
    const results = await publicClient.multicall({
      contracts: contractCalls as any,
      allowFailure: true
    });
    
    const updatePromises = results.map(async (result, index) => {
      const agent = pendingAgents[index];
      if (result.status === 'failure') {
        console.error(`[Cron] Agent ${agent.name} Contract call failed:`, result.error);
        return null;
      }

      const isSuccessful = result.result as boolean;
      
      console.log(`[Cron] Agent ${agent.name} result: ${isSuccessful}`);
      
      return prisma.agent.update({
        where: { id: agent.id },
        data: {
          iaoSuccessful: isSuccessful,
          iaoSuccessChecked: true, // 标记为已检查，下次不会再查
          iaoSuccessCheckTime: new Date()
        }
      });
    });

    // 等待所有数据库更新完成
    await Promise.all(updatePromises);

    return { count: pendingAgents.length, message: 'Batch inspection completed' };

  } catch (error: any) {
    console.error('[Cron] Multicall Execution exception:', error);
    throw new Error(`Cron Job Failed: ${error.message}`);
  }
}