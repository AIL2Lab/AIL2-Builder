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
    if (!name || !description || !symbol) {
      return NextResponse.json(
        { code: 400, message: "缺少必填字段" },
        { status: 400 }
      );
    }

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
    const shouldCheckLimit = process.env.LIMIT_ONEPWALLET_ONEAGENT === "true";
    if (shouldCheckLimit) {
      checkPromises.push(
        prisma.user.findUnique({
          where: { address: address },
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

    // const newId = uuidv4();
    const result = await prisma.$transaction(async (tx) => {
      // const user = await tx.user.upsert({
      //   where: { address: address },
      //   update: {},
      //   create: { address: address },
      //   select: { id: true },
      // });
      const agentData: any = {
        // id: newId,
        name,
        description,
        status: otherFields.status || "CREATING",
        creatorId: userId,
        symbol,
        avatar: otherFields.avatar || null,
        socialLinks: otherFields.socialLinks || null,
      };
      const agent = await tx.agent.create({ data: agentData });

      const task = await tx.task.create({
        data: {
          type: "DEPLOY_IAO",
          status: "PENDING",
          agentId: agent.id,
          createdBy: address,
        },
      });

      return {
        agent,
        task,
      };
    });

    return successResponse(
      {
        agentId: result.agent.id,
        status: "CREATING",
        taskId: result.task.id,
      },
      "Agent created successfully.",
      201
    );
    // try {
    //   const newAgent = await prisma.agent.create({
    //     data: body,
    //   });
    //   return successResponse(newAgent, "Agent created successfully.", 201);
    // } catch (error: any) {
    //   if (
    //     error instanceof PrismaClientKnownRequestError &&
    //     error.code === "P2002"
    //   ) {
    //     const target = (error.meta?.target as string[])?.join(", ") || "field";
    //     return errorResponse(
    //       `An agent with this ${target} already exists.`,
    //       409,
    //       null
    //     );
    //   }
    //   return errorResponse(
    //     `Could not create agent. Reason: ${error.message}.`,
    //     500,
    //     error
    //   );
    // }
    // return successResponse(null);
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = (error.meta?.target as string[])?.join(", ") || "field";
      return errorResponse(
        `An agent with this ${target} already exists.`,
        409,
        null
      );
    }
    return errorResponse(
      `Could not create agent. Reason: ${error.message}.`,
      500,
      error
    );
  }
}
