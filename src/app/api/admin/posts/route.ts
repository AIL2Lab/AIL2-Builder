import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // 构建查询条件
    const where: any = {};

    // 状态筛选
    if (status && status !== 'all') {
      where.status = status;
    }

    // 搜索筛选
    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          slug: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    // 从数据库获取文章列表
    const posts = await prisma.post.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 格式化返回数据
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      metaTitle: post.metaTitle,
      metaDesc: post.metaDesc,
      keywords: post.keywords,
      ogImage: post.ogImage,
      status: post.status,
      publishedAt: post.publishedAt?.toISOString(),
      authorId: post.authorId,
      authorName: post.authorName,
      categoryId: post.categoryId,
      category: post.category,
      viewCount: post.viewCount,
      tags: post.tags,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('获取文章列表失败:', error);
    return NextResponse.json(
      { error: '获取文章列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/admin/posts
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 检查 slug 是否已存在
    const existingPost = await prisma.post.findUnique({
      where: { slug: body.slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: '文章 slug 已存在' },
        { status: 400 }
      );
    }

    // 创建新文章
    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        coverImage: body.coverImage,
        metaTitle: body.metaTitle,
        metaDesc: body.metaDesc,
        keywords: body.keywords || [],
        ogImage: body.ogImage,
        status: body.status || 'DRAFT',
        publishedAt: body.publishedAt
          ? new Date(body.publishedAt)
          : body.status === 'PUBLISHED'
          ? new Date()
          : null,
        authorId: body.authorId || 'admin',
        authorName: body.authorName || '管理员',
        categoryId: body.categoryId || null,
        tags: body.tagIds
          ? {
              connect: body.tagIds.map((id: string) => ({ id })),
            }
          : undefined,
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return NextResponse.json(
      {
        ...newPost,
        publishedAt: newPost.publishedAt?.toISOString(),
        createdAt: newPost.createdAt.toISOString(),
        updatedAt: newPost.updatedAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('创建文章失败:', error);
    return NextResponse.json({ error: '创建文章失败' }, { status: 500 });
  }
}
