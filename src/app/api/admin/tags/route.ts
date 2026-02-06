import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/tags
export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(tags);
  } catch (error) {
    console.error('获取标签列表失败:', error);
    return NextResponse.json(
      { error: '获取标签列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/admin/tags
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 检查 slug 是否已存在
    const existing = await prisma.tag.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Slug 已存在' },
        { status: 400 }
      );
    }

    // 检查 name 是否已存在
    const existingName = await prisma.tag.findUnique({
      where: { name: data.name },
    });

    if (existingName) {
      return NextResponse.json(
        { error: '标签名称已存在' },
        { status: 400 }
      );
    }

    // 创建新标签
    const newTag = await prisma.tag.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });

    return NextResponse.json(newTag);
  } catch (error) {
    console.error('创建标签失败:', error);
    return NextResponse.json(
      { error: '创建标签失败' },
      { status: 500 }
    );
  }
}
