import { List } from "./List";

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/posts?limit=9999`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  } catch (error) {
    console.error(error);
    return { posts: [], total: 0, totalPages: 0, currentPage: 1 };
  }
}

export default async function BlogList() {
  const data = await getPosts();
  return <List posts={data.posts} total={data.total} />;
}
