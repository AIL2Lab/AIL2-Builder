'use server'

import prisma from "@/lib/prisma";
import { type Agent } from '@/generated/client'
import { ApiResponse } from '@/types/response.type'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export interface GetAgentsResult {
  agents: Agent[]
  totalCount: number
  totalPages: number
  currentPage: number
}

// 统一参数类型定义，确保兼容性
interface QueryParams {
  page?: number
  pageSize?: number
  query?: string
}

export async function getAgents(
  pageOrParams: number | QueryParams = 1,
  pageSize: number = 10,
  query?: string
): Promise<ApiResponse<GetAgentsResult>> {
  // 处理参数重载
  let page = 1;
  let size = 10;
  let searchQuery: string | undefined = undefined;

  if (typeof pageOrParams === 'object') {
    page = pageOrParams.page || 1;
    size = pageOrParams.pageSize || 10;
    searchQuery = pageOrParams.query;
  } else {
    page = pageOrParams;
    size = pageSize;
    searchQuery = query;
  }

  const skip = (page - 1) * size

  const where = searchQuery
    ? {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' as const } },
        ],
      }
    : {}

  try {
    const [agents, totalCount] = await prisma.$transaction([
      prisma.agent.findMany({
        where,
        skip,
        take: size,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.agent.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / size)
    const resultData: GetAgentsResult = {
      agents,
      totalCount,
      totalPages,
      currentPage: page,
    }
    return {
      code: 200,
      data: resultData,
      message: 'Agents fetched successfully.',
    }
  } catch (error: any) {
    console.error('Failed to fetch agents:', error)
    return {
      code: 500,
      message: `Could not fetch agents. Reason: ${error.message}`,
    }
  }
}


export async function createAgent(
  data: Omit<Agent, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<Agent>> {
  try {
    const newAgent = await prisma.agent.create({
      data,
    })

    return {
      code: 201,
      data: newAgent,
      message: 'Agent created successfully.',
    }
  } catch (error: any) {
    console.error('Failed to create agent:', error)

    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      const target = (error.meta?.target as string[])?.join(', ') || 'field'
      return {
        code: 409, // 409 Conflict
        message: `An agent with this ${target} already exists.`,
      }
    }

    return {
      code: 500,
      message: `Could not create agent. Reason: ${error.message}`,
    }
  }
}


export async function deleteAgent(id: string): Promise<ApiResponse<null>> {
  try {
    await prisma.agent.delete({
      where: { id },
    })

    return {
      code: 200,
      message: 'Agent deleted successfully.',
    }
  } catch (error: any) {
    console.error(`Failed to delete agent with ID ${id}:`, error)

    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return {
        code: 404,
        message: `Agent with ID ${id} not found. Cannot delete.`,
      }
    }

    return {
      code: 500,
      message: `Could not delete agent. Reason: ${error.message}`,
    }
  }
}

export async function updateAgent(
  id: string,
  data: Partial<Omit<Agent, 'id' | 'createdAt'>>
): Promise<ApiResponse<Agent>> {
  try {
    const updatedAgent = await prisma.agent.update({
      where: { id },
      data,
    })

    return {
      code: 200,
      data: updatedAgent,
      message: 'Agent updated successfully.',
    }
  } catch (error: any) {
    console.error(`Failed to update agent with ID ${id}:`, error)

    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return {
        code: 404,
        message: `Agent with ID ${id} not found. Cannot update.`,
      }
    }

    return {
      code: 500,
      message: `Could not update agent. Reason: ${error.message}`,
    }
  }
}


export async function getAgentById(id: string): Promise<ApiResponse<Agent>> {
  try {
    const agent = await prisma.agent.findUnique({
      where: { id },
    })

    if (!agent) {
      return {
        code: 404,
        message: `Agent with ID ${id} not found.`,
      }
    }

    return {
      code: 200,
      data: agent,
      message: 'Agent fetched successfully.',
    }
  } catch (error: any) {
    console.error(`Failed to fetch agent with ID ${id}:`, error)
    return {
      code: 500,
      message: `Could not fetch agent. Reason: ${error.message}`,
    }
  }
}
