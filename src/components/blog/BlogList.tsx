import { List } from "./List";
import prisma from "@/lib/prisma";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  viewCount: number;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
}

interface PostsResponse {
  posts: Post[];
  total: number;
  totalPages: number;
  currentPage: number;
}

async function getPosts(): Promise<PostsResponse> {
  try {
    // 查询已发布文章（兼容 publishedAt 为 null 的情况）
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          status: 'PUBLISHED',
        },
        include: {
          category: true,
          tags: true,
        },
        orderBy: {
          publishedAt: 'desc',
        },
      }),
      prisma.post.count({
        where: {
          status: 'PUBLISHED',
        },
      }),
    ]);

    const formattedPosts: Post[] = posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      publishedAt: post.publishedAt?.toISOString() || null,
      viewCount: post.viewCount,
      category: post.category,
      tags: post.tags,
    }));

    return {
      posts: formattedPosts,
      total,
      totalPages: Math.ceil(total / 6),
      currentPage: 1,
    };
  } catch (error) {
    console.error('获取文章列表失败:', error);
    throw error;
  }
}

export default async function BlogList() {
  const data = await getPosts();
  return <List posts={data.posts} total={data.total} />;
}
