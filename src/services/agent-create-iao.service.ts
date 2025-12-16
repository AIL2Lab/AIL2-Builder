import prisma from "@/lib/prisma";
import { reloadContractListeners } from "@/services/contractEventListener";
import { smartIndexer } from "./smartIndexer.service";
import { calculateRewardAmount } from "@/lib/utils";
import { Decimal } from "@prisma/client/runtime/library";

const SERVER_WALLET = process.env.SERVER_WALLET_ADDRESS;
const TOKEN_IN_ADDRESS = process.env.IAO_TOKEN_IN_ADDRESS

export interface IAOTaskPayload {
  tokenAmount?: string;
  startTimestamp?: number;
  durationHours?: number;
  rewardAmount?: string;
  rewardToken?: string;
  totalSupply: Decimal | null;
}


export async function processIAODeployTask(
  agentId: string,
  taskId: string,
  taskData: IAOTaskPayload,
  creatorAddress: string
) {
  const MAX_RETRIES = 2;
  const RETRY_DELAY = 5000;

  console.log(`[Task Start] Agent: ${agentId}, Task: ${taskId}`);

  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { status: "PROCESSING", startedAt: new Date() },
    });
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const pendingResponse = await fetch("http://54.179.233.88:8070/pending", {
        headers: {
          accept: "application/json",
          authorization: "Basic YWRtaW46MTIz",
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const pendingResult = await pendingResponse.json();
      if (pendingResult.data?.pending === true) {
        throw new Error("DEPLOYMENT_BUSY"); 
      }
    } catch (e: any) {
      if (e.message === "DEPLOYMENT_BUSY") {
        await handleTaskFailure(agentId, taskId, "Deployment queue is busy (Pending check)");
        return;
      }
      console.warn("[Warning] Pending check skipped/failed:", e.message);
    }

    // 3. prepare params
    const startTs = taskData.startTimestamp || Math.floor(Date.now() / 1000) + 3600;
    const duration = taskData.durationHours || 72;
    const endTs = startTs + duration * 3600;

    // 4. 封装部署请求逻辑
    const deployLogic = async () => {
      const response = await fetch("http://54.179.233.88:8070/deploy/IAO", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: "Basic YWRtaW46MTIz",
        },
        body: JSON.stringify({
          duration_hours: duration,
          owner: SERVER_WALLET,
          reward_amount: calculateRewardAmount(taskData.totalSupply),
          reward_token: "0x0000000000000000000000000000000000000000",
          start_timestamp: startTs,
          token_in_address: TOKEN_IN_ADDRESS,
        }),
      });

      if (!response.ok && response.status !== 400) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      const result = await response.json();
      if (result.code === 400 && result.message === "CREATING") return result;
      if (result.code !== 200 || !result.data?.proxy_address) {
        throw new Error(result.message || "Deployment API returned error");
      }
      return result;
    };

    // 5. 执行重试机制
    let iaoResult;
    for (let i = 0; i <= MAX_RETRIES; i++) {
      try {
        iaoResult = await deployLogic();
        break; // 成功则跳出循环
      } catch (e) {
        if (i === MAX_RETRIES) throw e; // 最后一次尝试失败，抛出错误
        console.log(`[Retry] Deployment attempt ${i + 1} failed, retrying in ${RETRY_DELAY}ms...`);
        await new Promise((r) => setTimeout(r, RETRY_DELAY));
      }
    }

    const contractAddress = iaoResult.data.proxy_address;

    // 6. 成功：并行更新数据库
    await prisma.$transaction([
      prisma.agent.update({
        where: { id: agentId },
        data: {
        //   status: "TBA",
          iaoContractAddress: contractAddress,
          iaoStartTime: BigInt(startTs),
          iaoEndTime: BigInt(endTs),
        },
      }),
      prisma.task.update({
        where: { id: taskId },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
          result: JSON.stringify({
            message: "IAO部署成功",
            iaoContractAddress: contractAddress,
            startTime: startTs,
            endTime: endTs,
          }),
        },
      }),
    ]);

    // 7. 重新加载监听器 (Fire and Forget inside Service)
    // reloadContractListeners().catch((err:any) => console.error("Failed to reload listeners:", err));
    // console.log(`[Task Success] Task ${taskId} completed.`);
    smartIndexer.addContractToWatch(contractAddress);
  } catch (error: any) {
    await handleTaskFailure(agentId, taskId, error.message || "Unknown Error");
  }
}

// 私有辅助函数：统一处理失败状态
async function handleTaskFailure(agentId: string, taskId: string, errorMessage: string) {
  console.error(`[Task Failed] ${taskId}:`, errorMessage);
  try {
    await prisma.$transaction([
      prisma.task.update({
        where: { id: taskId },
        data: {
          status: "FAILED",
          completedAt: new Date(),
          result: JSON.stringify({ error: errorMessage }),
        },
      }),
      prisma.agent.update({
        where: { id: agentId },
        data: { status: "FAILED" },
      }),
    ]);
  } catch (dbErr) {
    console.error("CRITICAL: Failed to write error status to DB", dbErr);
  }
}