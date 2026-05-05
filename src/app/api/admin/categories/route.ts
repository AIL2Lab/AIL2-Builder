import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createCategorySchema, validateBody } from '../_lib/schemas';

// GET /api/admin/categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('获取分类列表失败:', error);
    return NextResponse.json(
      { error: '获取分类列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/admin/categories
export async function POST(request: Request) {
  const parsed = await validateBody(request, createCategorySchema);
  if (!parsed.ok) return parsed.response;
  const data = parsed.data;

  try {
    const existing = await prisma.category.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json({ error: 'Slug 已存在' }, { status: 400 });
    }

    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description ?? null,
        metaTitle: data.metaTitle ?? null,
        metaDesc: data.metaDesc ?? null,
      },
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    console.error('创建分类失败:', error);
    return NextResponse.json(
      { error: '创建分类失败' },
      { status: 500 }
    );
  }
}
