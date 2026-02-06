import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT /api/admin/categories/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // 检查分类是否存在
    const existing = await prisma.category.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: '分类不存在' },
        { status: 404 }
      );
    }

    // 检查 slug 冲突
    if (data.slug && data.slug !== existing.slug) {
      const conflict = await prisma.category.findUnique({
        where: { slug: data.slug },
      });
      if (conflict) {
        return NextResponse.json(
          { error: 'Slug 已被其他分类使用' },
          { status: 400 }
        );
      }
    }

    // 更新分类
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('更新分类失败:', error);
    return NextResponse.json(
      { error: '更新分类失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/categories/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 检查分类是否存在
    const existing = await prisma.category.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: '分类不存在' },
        { status: 404 }
      );
    }

    // 检查是否有文章使用此分类
    const postsWithCategory = await prisma.post.count({
      where: { categoryId: id },
    });

    if (postsWithCategory > 0) {
      return NextResponse.json(
        { error: `该分类下还有 ${postsWithCategory} 篇文章，请先移除这些文章的分类或删除文章` },
        { status: 400 }
      );
    }

    // 删除分类
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除分类失败:', error);
    return NextResponse.json(
      { error: '删除分类失败' },
      { status: 500 }
    );
  }
}
