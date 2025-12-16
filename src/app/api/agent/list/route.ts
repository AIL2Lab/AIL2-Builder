import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { Agent } from "@/generated/client";

export interface GetAgentsResult {
  list: Agent[]
  totalCount: number
  totalPages: number
  currentPage: number
}

// get agents list
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const query = searchParams.get("query") || "";
  //   const searchKeyword = searchParams.get("searchKeyword") || "";
  //   const category = searchParams.get("category");
  //   const status = searchParams.get("status");

  //   const sortBy = searchParams.get("sortBy") || "createdAt";
  //   const sortOrder = searchParams.get("sortOrder") || "desc";

  const skip = (page - 1) * pageSize;
  const where = query
    ? {
        OR: [{ name: { contains: query, mode: "insensitive" as const } }],
      }
    : {};

  try {
    const [agents, totalCount] = await prisma.$transaction([
      prisma.agent.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.agent.count({ where }),
    ]);
    const totalPages = Math.ceil(totalCount / pageSize);
    const resultData: GetAgentsResult = {
      list:agents,
      totalCount,
      totalPages,
      currentPage: page,
    };
    return successResponse(
        resultData
    )
  } catch (error:any) {
    return errorResponse(`Could not fetch agents. Reason: ${error.message}`);
  }
}
