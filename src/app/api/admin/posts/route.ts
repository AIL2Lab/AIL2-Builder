import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { POST_STATUSES, createPostSchema, validateBody } from '../_lib/schemas';

// Structural where-clause type. We define it locally rather than importing
// Prisma.PostWhereInput because the generated client lives outside source
// control (next/typecheck may run before `prisma generate`); sticking to the
// fields we actually use keeps this handler typecheckable in any state.
type PostWhereClause = {
  status?: (typeof POST_STATUSES)[number];
  OR?: Array<{
    title?: { contains: string; mode: 'insensitive' };
    slug?: { contains: string; mode: 'insensitive' };
  }>;
};

// GET /api/admin/posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: PostWhereClause = {};

    if (status && status !== 'all' && (POST_STATUSES as readonly string[]).includes(status)) {
      where.status = status as (typeof POST_STATUSES)[number];
    }

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
  const parsed = await validateBody(request, createPostSchema);
  if (!parsed.ok) return parsed.response;
  const data = parsed.data;

  try {
    const existingPost = await prisma.post.findUnique({
      where: { slug: data.slug },
    });
    if (existingPost) {
      return NextResponse.json({ error: '文章 slug 已存在' }, { status: 400 });
    }

    const newPost = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt ?? null,
        coverImage: data.coverImage ?? null,
        metaTitle: data.metaTitle ?? null,
        metaDesc: data.metaDesc ?? null,
        keywords: data.keywords ?? [],
        ogImage: data.ogImage ?? null,
        status: data.status ?? 'DRAFT',
        publishedAt: data.publishedAt
          ? new Date(data.publishedAt)
          : data.status === 'PUBLISHED'
          ? new Date()
          : null,
        authorId: data.authorId ?? 'admin',
        authorName: data.authorName ?? '管理员',
        categoryId: data.categoryId ?? null,
        tags: data.tagIds
          ? {
              connect: data.tagIds.map((id) => ({ id })),
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
