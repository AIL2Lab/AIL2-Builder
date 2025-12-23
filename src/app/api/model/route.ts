import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

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

    const result = await prisma.$transaction(async (tx) => {
      const modelData: any = {
        name,
        description,
        status: otherFields.status || "CREATING",
        creatorId: userId,
        symbol,
        avatar: otherFields.avatar || null,
        socialLinks: otherFields.socialLinks || null,
      };
      const model = await tx.model.create({ data: modelData });

      const task = await tx.task.create({
        data: {
          type: "DEPLOY_IAO",
          status: "PENDING",
          modelId: model.id,
          createdBy: address,
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
