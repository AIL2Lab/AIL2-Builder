// src/app/api/model/route.ts
import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { CONTRACTS } from "@/config/contracts";
import { deployIaoOnChain } from "./utils/deployIao";
import { currentChain } from "@/config/network.config";
import { IAO_CONFIG } from "@/config/iao.config";

export async function POST(request: NextRequest) {
  try {
    const requestHeaders = request.headers;
    const userId = requestHeaders.get("x-user-id");
    const address = requestHeaders.get("x-user-address") as string;
    
    const body = await request.json();
    const { name, description, symbol, ...otherFields } = body;
    const targetChainId = currentChain.id;

    // ===== 1. 参数校验 =====
    if (!userId || !address) {
      return NextResponse.json(
        { code: 401, message: "Unauthorized: Missing user information" },
        { status: 401 }
      );
    }

    if (!name || !description || !symbol) {
      return NextResponse.json(
        { code: 400, message: "缺少必填字段" },
        { status: 400 }
      );
    }

    const targetNetwork = currentChain;

    // ===== 2. 检查重复和限制 =====
    const checkPromises: Promise<any>[] = [
      prisma.model.findFirst({
        where: {
          OR: [
            { name: { equals: name, mode: "insensitive" } },
            { symbol: { equals: symbol, mode: "insensitive" } },
          ],
        },
        select: { name: true, symbol: true },
      }),
    ];

    const shouldCheckLimit = process.env.LIMIT_ONEPWALLET_ONEMODEL === "true";
    if (shouldCheckLimit) {
      checkPromises.push(
        prisma.user.findUnique({
          where: { address: address },
          select: { models: { select: { id: true }, take: 1 } },
        })
      );
    }

    const [conflictModel, userCheck] = await Promise.all(checkPromises);
    
    if (conflictModel) {
      if (conflictModel.name.toLowerCase() === name.toLowerCase()) {
        return NextResponse.json(
          { code: 400, message: "Model 名称已存在" },
          { status: 400 }
        );
      }
      if (conflictModel.symbol?.toLowerCase() === symbol.toLowerCase()) {
        return NextResponse.json(
          { code: 400, message: "Model Symbol 已存在" },
          { status: 400 }
        );
      }
    }

    if (shouldCheckLimit && userCheck?.models?.length > 0) {
      return NextResponse.json(
        { code: 4001, message: "每个钱包地址只能创建一个 Model" },
        { status: 400 }
      );
    }

    // ===== 3. 部署 IAO 合约 =====
    let txHash = "";
    let iaoContractAddress = "";
    let iaoDeployResult: any = null;

    try {
      // 使用配置对象
      const tokenIn = CONTRACTS.SIC_TOKEN; 
      const rewardToken = CONTRACTS.SIC_TOKEN; 
      const aiL2NftHolder = IAO_CONFIG.nftHolder;
      
      // 计算时间（使用配置）
      const startTime = new Date(Date.now() + IAO_CONFIG.delayStartSeconds * 1000);
      const depositPeriodHours = IAO_CONFIG.durationHours;
      const endTime = new Date(startTime.getTime() + depositPeriodHours * 3600 * 1000);
      
      // 合约需要秒时间戳
      const startTimeSeconds = BigInt(Math.floor(startTime.getTime() / 1000));
      const totalReward = IAO_CONFIG.iaoRewardAmount;

      iaoDeployResult = await deployIaoOnChain(
        address, 
        tokenIn,
        rewardToken,
        aiL2NftHolder,
        startTimeSeconds,
        BigInt(depositPeriodHours),
        totalReward,
      );

      console.log("iaoDeployResult", iaoDeployResult);

      txHash = iaoDeployResult.txHash;
      iaoContractAddress = iaoDeployResult.contractAddress;

      // ===== 4. 数据库事务 =====
      const result = await prisma.$transaction(async (tx) => {
        const model = await tx.model.create({ 
          data: {
            name,
            description,
            symbol,
            status: otherFields.status || "CREATING",
            creatorId: userId,
            avatar: otherFields.avatar || null,
            socialLinks: otherFields.socialLinks || null,
          } 
        });

        // ✅ 直接使用 Date 对象
        const iao = await tx.iAO.create({
          data: {
            modelId: model.id,
            chainId: targetChainId?.toString(),
            iaoContractAddress: iaoContractAddress,
            iaoCreator: address,
            iaoOwner: iaoDeployResult.owner || address,
            iaoStakeToken: iaoDeployResult.stakeToken || CONTRACTS.SIC_TOKEN,
            iaoRewardToken: iaoDeployResult.rewardToken || CONTRACTS.SIC_TOKEN,
            iaoNftHolder: iaoDeployResult.nftHolder || "0x0000000000000000000000000000000000000000",
            iaoStartTime: startTime,    // ✅ Date 对象
            iaoEndTime: endTime,        // ✅ Date 对象
            iaoDepositPeriod: depositPeriodHours,
            iaoTotalReward: totalReward.toString(),
            iaoTxHash: txHash,
          }
        });

        const task = await tx.task.create({
          data: {
            type: "DEPLOY_IAO",
            status: "PENDING",
            modelId: model.id,
            createdBy: address,
            result: JSON.stringify({ 
              txHash, 
              iaoContractAddress,
              chainId: targetChainId 
            })
          },
        });

        return { model, iao, task };
      });

      return successResponse(
        {
          modelId: result.model.id,
          iaoId: result.iao.id,
          status: "CREATING",
          taskId: result.task.id,
          txHash: txHash,
          chainId: targetChainId,
          chainName: targetNetwork.name,
          iaoContractAddress: iaoContractAddress
        },
        "Model and IAO created successfully.",
        201
      );
    } catch (contractError: any) {
      console.error("Contract call failed:", contractError);
      return errorResponse(
        `Failed to create IAO on chain: ${contractError.message}`,
        500,
        contractError
      );
    }
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = (error.meta?.target as string[])?.join(", ") || "field";
      return errorResponse(
        `A model with this ${target} already exists.`,
        409,
        null
      );
    }
    return errorResponse(
      `Could not create model. Reason: ${error.message}.`,
      500,
      error
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return errorResponse('Model ID is required', 400);
    }

    const model = await prisma.model.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            address: true,
            nickname: true,
            avatar: true,
          }
        },
        iaos: true,
      }
    });

    if (!model) {
      return errorResponse('Model not found', 404);
    }

    // ✅ Date 对象可以直接比较
    const iaosWithChainInfo = model.iaos.map(iao => {
      const now = new Date();
      
      let status: string;
      if (now < iao.iaoStartTime) {
        status = 'PENDING';
      } else if (now < iao.iaoEndTime) {
        status = 'ACTIVE';
      } else {
        status = 'ENDED';
      }

      const chainInfo = currentChain ? {
        chainId: currentChain.id,
        name: currentChain.name,
        rpcUrl: currentChain.rpcUrls.default.http[0],
        explorerUrl: currentChain.blockExplorers?.default.url,
      } : {
        chainId: iao.chainId,
        name: 'Unknown Network',
      };

      return {
        ...iao,
        // ✅ Date 对象会自动序列化为 ISO 8601 字符串
        // 例如："2025-12-25T06:30:00.000Z"
        chain: chainInfo,
        status,
      };
    });

    return successResponse({
      ...model,
      iaos: iaosWithChainInfo
    });
  } catch (error: any) {
    return errorResponse(
      `Failed to fetch model. Reason: ${error.message}`,
      500,
      error
    );
  }
}
