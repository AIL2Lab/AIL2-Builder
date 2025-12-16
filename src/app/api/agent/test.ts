import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSuccessResponse, handleError } from "@/lib/error";
import { verify } from "jsonwebtoken";
import { Decimal } from "@prisma/client/runtime/library";
import { v4 as uuidv4 } from "uuid";
import { reloadContractListeners } from "@/services/contractEventListener";
import { calculateRewardAmount } from "@/lib/utils";
// 如果是 Next.js 15，可以使用 unstable_after；如果是 Vercel 部署，可以使用 @vercel/functions 的 waitUntil
// import { unstable_after as after } from 'next/server';

const JWT_SECRET = "xaiagent-jwt-secret-2024";

// 优化点：提取公共配置
const SERVER_WALLET = process.env.SERVER_WALLET_ADDRESS;
const IS_TESTNET = process.env.NEXT_PUBLIC_XAA_TEST_VERSION === "true";
const TOKEN_IN_ADDRESS = IS_TESTNET
  ? "0x8a88a1D2bD0a13BA245a4147b7e11Ef1A9d15C8a"
  : "0x16d83F6B17914a4e88436251589194CA5AC0f452";

export async function POST(request: Request) {
  try {
    // 1. 快速鉴权
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { code: 401, message: "未授权访问" },
        { status: 401 }
      );
    }

    let decoded: { address: string };
    try {
      decoded = verify(authHeader.split(" ")[1], JWT_SECRET) as {
        address: string;
      };
    } catch {
      return NextResponse.json(
        { code: 401, message: "无效的 token" },
        { status: 401 }
      );
    }

    // 2. 解析请求体
    const body = await request.json();
    console.log(body);

    // 提前解构关键校验字段，其他字段保持原样
    const {
      name,
      description,
      category,
      capabilities,
      symbol,
      startTimestamp,
      durationHours,
      tokenAmount,
      rewardAmount,
      rewardToken,
      containerLink,
      ...otherFields
    } = body;

    // 3. 基础校验 (CPU 计算，极快)
    if (!name || !description || !category || !capabilities || !symbol) {
      return NextResponse.json(
        { code: 400, message: "缺少必填字段" },
        { status: 400 }
      );
    }

    if (
      startTimestamp &&
      (typeof startTimestamp !== "number" || startTimestamp <= 0)
    ) {
      return NextResponse.json(
        { code: 400, message: "startTimestamp 必须是正整数" },
        { status: 400 }
      );
    }
    if (
      durationHours &&
      (typeof durationHours !== "number" || durationHours <= 0)
    ) {
      return NextResponse.json(
        { code: 400, message: "durationHours 必须是正数" },
        { status: 400 }
      );
    }

    // 4. 并行执行数据库检查 (关键优化：将3个串行查询改为1个并发查询)
    const checkPromises: Promise<any>[] = [
      prisma.agent.findFirst({
        where: {
          OR: [
            { name: { equals: name, mode: "insensitive" } },
            { symbol: { equals: symbol, mode: "insensitive" } },
          ],
        },
        // 只查出 name 和 symbol 用于比对，id 不需要
        select: { name: true, symbol: true },
      }),
    ];

    // 只有开启限制时才查询用户 Agents
    const shouldCheckLimit = process.env.LIMIT_ONEPWALLET_ONEAGENT === "true";
    if (shouldCheckLimit) {
      checkPromises.push(
        prisma.user.findUnique({
          where: { address: decoded.address },
          select: { agents: { select: { id: true }, take: 1 } }, // 只取一个以此判断是否存在
        })
      );
    }

    const [conflictAgent, userCheck] = await Promise.all(checkPromises);

    if (conflictAgent) {
      // 注意：这里需要转小写比较，因为数据库查询用了 insensitive
      if (conflictAgent.name.toLowerCase() === name.toLowerCase()) {
        return NextResponse.json(
          { code: 400, message: "Agent 名称已存在" },
          { status: 400 }
        );
      }
      // 如果名字没冲突，那肯定是 Symbol 冲突了
      if (
        conflictAgent.symbol &&
        conflictAgent.symbol.toLowerCase() === symbol.toLowerCase()
      ) {
        return NextResponse.json(
          { code: 400, message: "Agent Symbol 已存在" },
          { status: 400 }
        );
      }
    }
    if (shouldCheckLimit && userCheck?.agents?.length > 0) {
      return NextResponse.json(
        { code: 4001, message: "每个钱包地址只能创建一个 Agent" },
        { status: 400 }
      );
    }

    // 5. 数据库写入事务 (关键优化：合并3个写操作为1个事务)
    // const newId = uuidv4();

    const result = await prisma.$transaction(async (tx) => {
      // 5.1 确保用户存在
      const user = await tx.user.upsert({
        where: { address: decoded.address },
        update: {},
        create: { address: decoded.address },
        select: { id: true },
      });

      // 5.2 创建 Agent
      // 优化：直接使用 create，将 containerLink 放入后续如果需要 (Raw SQL 通常比 ORM 慢且破坏事务一致性，除非必要否则不用)
      // 如果 schema 支持 containerLink，直接在这里写。如果必须 Raw SQL，也在事务内执行。
      const agentData: any = {
        // id: newId,
        name,
        description,
        category,
        capabilities: JSON.stringify(capabilities),
        status: otherFields.status || "CREATING",
        creatorId: user.id,
        symbol,
        iaoTokenAmount: tokenAmount ? new Decimal(tokenAmount) : null,
        // ... 映射其他字段
        avatar: otherFields.avatar || null,
        type: otherFields.type || category,
        marketCap: otherFields.marketCap || "$0",
        change24h: otherFields.change24h || "0",
        tvl: otherFields.tvl || "$0",
        holdersCount: otherFields.holdersCount || 0,
        volume24h: otherFields.volume24h || "$0",
        statusJA: otherFields.statusJA,
        statusKO: otherFields.statusKO,
        statusZH: otherFields.statusZH,
        descriptionJA: otherFields.descriptionJA,
        descriptionKO: otherFields.descriptionKO,
        descriptionZH: otherFields.descriptionZH,
        longDescription: otherFields.detailDescription || null,
        lifetime: otherFields.lifetime || null,
        totalSupply: otherFields.totalSupply
          ? new Decimal(otherFields.totalSupply)
          : null,
        marketCapTokenNumber: otherFields.marketCapTokenNumber
          ? new Decimal(otherFields.marketCapTokenNumber)
          : null,
        useCases: otherFields.useCases
          ? JSON.stringify(otherFields.useCases)
          : null,
        useCasesJA: otherFields.useCasesJA
          ? JSON.stringify(otherFields.useCasesJA)
          : null,
        useCasesKO: otherFields.useCasesKO
          ? JSON.stringify(otherFields.useCasesKO)
          : null,
        useCasesZH: otherFields.useCasesZH
          ? JSON.stringify(otherFields.useCasesZH)
          : null,
        socialLinks: otherFields.socialLinks || null,
        chatEntry: otherFields.chatEntry || null,
        projectDescription: otherFields.projectDescription || null,
        totalSupplyYears: 8,
      };

      const agent = await tx.agent.create({ data: agentData });

      // 如果必须使用 Raw SQL 更新 containerLink
      if (containerLink) {
        await tx.$executeRaw`UPDATE "Agent" SET "containerLink" = ${containerLink} WHERE id = ${newId}`;
      }

      // 5.3 创建 Task
      const task = await tx.task.create({
        data: {
          type: "DEPLOY_IAO",
          status: "PENDING",
          agentId: agent.id,
          createdBy: decoded.address,
        },
      });

      return { agent, task };
    });

    // 6. 触发后台任务 (Fire and Forget)
    // 注意：如果部署在 Vercel 等 Serverless 平台，直接不 await 调用可能会被冻结。
    // 如果是 Node.js 长期运行服务器，这样做没问题。
    const taskPayload = {
      tokenAmount,
      startTimestamp,
      durationHours,
      rewardAmount,
      rewardToken,
      totalSupply: result.agent.totalSupply, // 传递过去避免再次查询
    };

    // 这里的 catch 只是为了防止未捕获的 promise rejection 导致进程崩溃（虽然在 Nextjs 路由中通常没事）
    processTask(
      result.agent.id,
      result.task.id,
      taskPayload,
      decoded.address
    ).catch((err) => {
      console.error("Background task error:", err);
    });

    return createSuccessResponse(
      {
        agentId: result.agent.id,
        status: "CREATING",
        taskId: result.task.id,
      },
      "任务已创建"
    );
  } catch (error) {
    return handleError(error);
  }
}

// 优化后的后台任务处理
async function processTask(
  agentId: string,
  taskId: string,
  taskData: any,
  creatorAddress: string // 直接传进来，省去一次查询
) {
  const MAX_RETRIES = 2;
  const RETRY_DELAY = 5000;

  try {
    // 立即更新状态
    await prisma.task.update({
      where: { id: taskId },
      data: { status: "PROCESSING", startedAt: new Date() },
    });

    // 检查 Pending (并发控制)
    // 优化：添加超时控制，防止 fetch 挂起
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
        await Promise.all([
          prisma.agent.update({
            where: { id: agentId },
            data: { status: "FAILED" },
          }),
          prisma.task.update({
            where: { id: taskId },
            data: {
              status: "FAILED",
              result: JSON.stringify({ message: "DEPLOYMENT_IN_PROGRESS" }),
            },
          }),
        ]);
        return;
      }
    } catch (e) {
      console.warn("Pending check failed, continuing...", e);
    }

    // 准备部署参数
    const startTs =
      taskData.startTimestamp || Math.floor(Date.now() / 1000) + 3600;
    const duration = taskData.durationHours || 72;
    const endTs = startTs + duration * 3600;

    // 部署逻辑重试机制
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
          reward_amount: calculateRewardAmount(taskData.totalSupply), // 使用传入的数据
          reward_token: "0x0000000000000000000000000000000000000000",
          start_timestamp: startTs,
          token_in_address: TOKEN_IN_ADDRESS,
        }),
      });

      // 快速失败检查
      if (!response.ok && response.status !== 400)
        throw new Error(`HTTP Error ${response.status}`);

      const result = await response.json();
      // 处理特殊业务逻辑
      if (result.code === 400 && result.message === "CREATING") return result;
      if (result.code !== 200 || !result.data?.proxy_address)
        throw new Error(result.message || "Deployment Failed");

      return result;
    };

    // 执行重试
    let iaoResult;
    for (let i = 0; i <= MAX_RETRIES; i++) {
      try {
        iaoResult = await deployLogic();
        break;
      } catch (e) {
        if (i === MAX_RETRIES) throw e;
        await new Promise((r) => setTimeout(r, RETRY_DELAY));
      }
    }

    const contractAddress = iaoResult.data.proxy_address;

    // 并行执行最终更新以节省时间
    await Promise.all([
      prisma.agent.update({
        where: { id: agentId },
        data: {
          status: "TBA",
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

    // 异步重新加载监听器，不阻塞
    reloadContractListeners().catch(console.error);
  } catch (error: any) {
    console.error(`[Task Failed] ${taskId}:`, error);

    // 错误状态更新事务
    await prisma.$transaction([
      prisma.task.update({
        where: { id: taskId },
        data: {
          status: "FAILED",
          completedAt: new Date(),
          result: JSON.stringify({ error: error.message || "Unknown error" }),
        },
      }),
      prisma.agent.update({
        where: { id: agentId },
        data: { status: "FAILED" },
      }),
    ]);
  }
}
