'use server'

import prisma from "@/lib/prisma";
import { type Model, type IAO } from '@/generated/client'
import { ApiResponse } from '@/types/response.type'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export type ModelWithIaos = Model & {
  iaos: IAO[]
}

export interface GetModelsResult {
  models: ModelWithIaos[]
  totalCount: number
  totalPages: number
  currentPage: number
}

// 统一参数类型定义，确保兼容性
interface QueryParams {
  page?: number
  pageSize?: number
  query?: string
  filter?: 'all' | 'iao_active'
}

export async function getModels(
  pageOrParams: number | QueryParams = 1,
  pageSize: number = 10,
  query?: string,
  filterType?: 'all' | 'iao_active'
): Promise<ApiResponse<GetModelsResult>> {
  // 处理参数重载
  let page = 1;
  let size = 10;
  let searchQuery: string | undefined = undefined;
  let filter: 'all' | 'iao_active' = 'all';

  if (typeof pageOrParams === 'object') {
    page = pageOrParams.page || 1;
    size = pageOrParams.pageSize || 10;
    searchQuery = pageOrParams.query;
    filter = pageOrParams.filter || 'all';
  } else {
    page = pageOrParams;
    size = pageSize;
    searchQuery = query;
    filter = filterType || 'all';
  }

  const skip = (page - 1) * size

  const where: any = {};
  
  if (searchQuery) {
    where.OR = [
      { name: { contains: searchQuery, mode: 'insensitive' as const } },
    ];
  }

  // IAO 进行中：需要关联查询 IAO 表，判断当前时间是否在 IAO 开始和结束时间之间
  if (filter === 'iao_active') {
    const now = new Date();
    where.iaos = {
      some: {
        iaoStartTime: { lte: now },
        iaoEndTime: { gte: now }
      }
    };
  }

  try {
    const [models, totalCount] = await prisma.$transaction([
      prisma.model.findMany({
        where,
        skip,
        take: size,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          iaos: true,
        },
      }),
      prisma.model.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / size)
    const resultData: GetModelsResult = {
      models,
      totalCount,
      totalPages,
      currentPage: page,
    }
    return {
      code: 200,
      data: resultData,
      message: 'Models fetched successfully.',
    }
  } catch (error: any) {
    console.error('Failed to fetch models:', error)
    return {
      code: 500,
      message: `Could not fetch models. Reason: ${error.message}`,
    }
  }
}


export async function createModel(
  data: Omit<Model, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<Model>> {
  try {
    const newModel = await prisma.model.create({
      data,
    })

    return {
      code: 201,
      data: newModel,
      message: 'Model created successfully.',
    }
  } catch (error: any) {
    console.error('Failed to create model:', error)

    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      const target = (error.meta?.target as string[])?.join(', ') || 'field'
      return {
        code: 409, // 409 Conflict
        message: `An model with this ${target} already exists.`,
      }
    }

    return {
      code: 500,
      message: `Could not create model. Reason: ${error.message}`,
    }
  }
}


export async function deleteModel(id: string): Promise<ApiResponse<null>> {
  try {
    await prisma.model.delete({
      where: { id },
    })

    return {
      code: 200,
      message: 'Model deleted successfully.',
    }
  } catch (error: any) {
    console.error(`Failed to delete model with ID ${id}:`, error)

    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return {
        code: 404,
        message: `Model with ID ${id} not found. Cannot delete.`,
      }
    }

    return {
      code: 500,
      message: `Could not delete model. Reason: ${error.message}`,
    }
  }
}

export async function updateModel(
  id: string,
  data: Partial<Omit<Model, 'id' | 'createdAt'>>
): Promise<ApiResponse<Model>> {
  try {
    const updatedModel = await prisma.model.update({
      where: { id },
      data,
    })

    return {
      code: 200,
      data: updatedModel,
      message: 'Model updated successfully.',
    }
  } catch (error: any) {
    console.error(`Failed to update model with ID ${id}:`, error)

    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return {
        code: 404,
        message: `Model with ID ${id} not found. Cannot update.`,
      }
    }

    return {
      code: 500,
      message: `Could not update model. Reason: ${error.message}`,
    }
  }
}


export async function getModelById(id: string): Promise<ApiResponse<Model>> {
  try {
    const model = await prisma.model.findUnique({
      where: { id },
    })

    if (!model) {
      return {
        code: 404,
        message: `Model with ID ${id} not found.`,
      }
    }

    return {
      code: 200,
      data: model,
      message: 'Model fetched successfully.',
    }
  } catch (error: any) {
    console.error(`Failed to fetch model with ID ${id}:`, error)
    return {
      code: 500,
      message: `Could not fetch model. Reason: ${error.message}`,
    }
  }
}
