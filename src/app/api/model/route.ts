import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { serverWalletClient, publicClient } from "@/lib/server-wallet";
import { currentContracts } from "@/config/network.config";
import { CONTRACTS } from "@/config/contracts";
import { deployIaoOnChain } from "./utils/deployIao";

export async function POST(request: NextRequest) {
  try {
    const requestHeaders = request.headers;
    console.log(requestHeaders);
    
    const userId = requestHeaders.get("x-user-id")
    const address = requestHeaders.get("x-user-address") as string;
    console.log('userId',userId);
    console.log('address',address);
    const body = await request.json();
    const { name, description, symbol, ...otherFields } = body;
    // check params
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
      if (
        conflictModel.symbol &&
        conflictModel.symbol.toLowerCase() === symbol.toLowerCase()
      ) {
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

    // Call Smart Contract to create token
    let txHash = "";
    try {
        // Prepare IAO parameters
        // TODO: These should ideally come from the request body or configuration
        const tokenIn = CONTRACTS.SIC_TOKEN; 
        // Use standard SIC token for reward as well for testing to avoid StackUnderflow
        // assuming SIC token is standard ERC20.
        // If XAA is causing issues, maybe it is non-standard or user balance is insufficient?
        // But StackUnderflow is usually code logic.
        // Reverting to SIC for both for now to test.
        const rewardToken = CONTRACTS.SIC_TOKEN; 
        
        const aiL2NftHolder = "0x0000000000000000000000000000000000000000"; // Placeholder or from config
        // Ensure startTime is in the future. If too close to current time, block timestamp might be > startTime
        // causing revert if contract checks startTime > block.timestamp
        const startTime = BigInt(Math.floor(Date.now() / 1000) + 3600); // Start in 1 hour
        const depositPeriodHours = BigInt(24); // 24 hours
         // Ensure totalReward is within reasonable bounds and supported by token decimals
         // Reducing to 1 token to minimize balance issues during test
         const totalReward = BigInt(1) * BigInt(10 ** 18); // 1 token

        txHash = await deployIaoOnChain(
            address, 
            tokenIn,
            rewardToken,
            aiL2NftHolder,
            startTime,
            depositPeriodHours,
            totalReward
        );
    } catch (contractError: any) {
        console.error("Contract call failed:", contractError);
        return errorResponse(
            `Failed to create token on chain: ${contractError.message}`,
            500,
            contractError
        );
    }

    const result = await prisma.$transaction(async (tx) => {
      const modelData: any = {
        name,
        description,
        status: otherFields.status || "CREATING",
        creatorId: userId,
        symbol,
        avatar: otherFields.avatar || null,
        socialLinks: otherFields.socialLinks || null,
        // Store the txHash if you have a field for it, otherwise you might want to log it
        // deployTxHash: txHash 
      };
      const model = await tx.model.create({ data: modelData });

      const task = await tx.task.create({
        data: {
          type: "DEPLOY_IAO",
          status: "PENDING",
          modelId: model.id,
          createdBy: address,
          result: { txHash } // Store txHash in task result
        },
      });

      return {
        model,
        task,
      };
    });

    return successResponse(
      {
        modelId: result.model.id,
        status: "CREATING",
        taskId: result.task.id,
        txHash: txHash
      },
      "Model created successfully.",
      201
    );
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
