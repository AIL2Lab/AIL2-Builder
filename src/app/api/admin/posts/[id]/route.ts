import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { updatePostSchema, validateBody } from '../../_lib/schemas';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        category: true,
        tags: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    return NextResponse.json({
      ...post,
      publishedAt: post.publishedAt?.toISOString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error('获取文章详情失败:', error);
    return NextResponse.json(
      { error: '获取文章详情失败' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsed = await validateBody(request, updatePostSchema);
  if (!parsed.ok) return parsed.response;
  const data = parsed.data;

  try {
    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    if (data.slug && data.slug !== existingPost.slug) {
      const slugConflict = await prisma.post.findUnique({
        where: { slug: data.slug },
      });
      if (slugConflict) {
        return NextResponse.json(
          { error: '文章 slug 已被使用' },
          { status: 400 }
        );
      }
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
        keywords: data.keywords,
        ogImage: data.ogImage,
        status: data.status,
        // publishedAt rules: explicit value wins; transitioning to PUBLISHED
        // without one stamps now; explicit null clears; otherwise leave it.
        publishedAt: data.publishedAt
          ? new Date(data.publishedAt)
          : data.status === 'PUBLISHED' && !existingPost.publishedAt
          ? new Date()
          : data.publishedAt === null
          ? null
          : undefined,
        authorId: data.authorId || undefined,
        authorName: data.authorName || undefined,
        categoryId: data.categoryId ?? null,
        tags: data.tagIds
          ? {
              set: [], // clear existing first, then connect the new set
              connect: data.tagIds.map((tagId) => ({ id: tagId })),
            }
          : undefined,
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return NextResponse.json({
      ...updatedPost,
      publishedAt: updatedPost.publishedAt?.toISOString(),
      createdAt: updatedPost.createdAt.toISOString(),
      updatedAt: updatedPost.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error('更新文章失败:', error);
    return NextResponse.json({ error: '更新文章失败' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 检查文章是否存在
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    // 删除文章（Prisma 会自动处理关联的标签关系）
    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除文章失败:', error);
    return NextResponse.json({ error: '删除文章失败' }, { status: 500 });
  }
}
