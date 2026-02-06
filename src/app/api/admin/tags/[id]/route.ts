import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT /api/admin/tags/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // 检查标签是否存在
    const existing = await prisma.tag.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: '标签不存在' },
        { status: 404 }
      );
    }

    // 检查 slug 冲突
    if (data.slug && data.slug !== existing.slug) {
      const slugConflict = await prisma.tag.findUnique({
        where: { slug: data.slug },
      });
      if (slugConflict) {
        return NextResponse.json(
          { error: 'Slug 已被其他标签使用' },
          { status: 400 }
        );
      }
    }

    // 检查 name 冲突
    if (data.name && data.name !== existing.name) {
      const nameConflict = await prisma.tag.findUnique({
        where: { name: data.name },
      });
      if (nameConflict) {
        return NextResponse.json(
          { error: '标签名称已被使用' },
          { status: 400 }
        );
      }
    }

    // 更新标签
    const updatedTag = await prisma.tag.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
      },
    });

    return NextResponse.json(updatedTag);
  } catch (error) {
    console.error('更新标签失败:', error);
    return NextResponse.json(
      { error: '更新标签失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/tags/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 检查标签是否存在
    const existing = await prisma.tag.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: '标签不存在' },
        { status: 404 }
      );
    }

    // 删除标签（Prisma 会自动处理与文章的多对多关系）
    await prisma.tag.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除标签失败:', error);
    return NextResponse.json(
      { error: '删除标签失败' },
      { status: 500 }
    );
  }
}
