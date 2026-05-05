import Link from 'next/link';
import prisma from '@/lib/prisma';
import DeletePostButton from './_components/DeletePostButton';

// The page reads from the database on every request and is gated by the
// admin_session cookie at the middleware layer; both make it inherently
// dynamic. Force-dynamic is explicit so Next.js' prerender pass at build
// time doesn't try to hit Prisma without a DB.
export const dynamic = 'force-dynamic';

// Server Component: data fetch happens during render on the server, no
// client-side useEffect waterfall, no loading flicker, and the ~20kb of
// state-management JS that the old client version pulled in vanishes from
// the bundle. The only client island left is the row-level delete button,
// which needs confirm() + fetch.

const STATUS_LABEL: Record<string, string> = {
  PUBLISHED: '已发布',
  DRAFT: '草稿',
  ARCHIVED: '已归档',
};

const STATUS_STYLE: Record<string, string> = {
  PUBLISHED: 'bg-green-500/20 text-green-400 border-green-500/30',
  DRAFT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  ARCHIVED: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const ALLOWED_STATUSES = ['PUBLISHED', 'DRAFT', 'ARCHIVED'] as const;

type PostWhere = {
  status?: (typeof ALLOWED_STATUSES)[number];
  OR?: Array<{
    title?: { contains: string; mode: 'insensitive' };
    slug?: { contains: string; mode: 'insensitive' };
  }>;
};

async function getPosts(filter: string, search: string) {
  const where: PostWhere = {};
  if ((ALLOWED_STATUSES as readonly string[]).includes(filter)) {
    where.status = filter as (typeof ALLOWED_STATUSES)[number];
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { slug: { contains: search, mode: 'insensitive' } },
    ];
  }
  return prisma.post.findMany({
    where,
    include: { category: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const params = await searchParams;
  const filter = params.status ?? 'all';
  const search = params.search ?? '';
  const posts = await getPosts(filter, search);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">文章管理</h1>
        <Link
          href="/admin/posts/new"
          className="px-6 py-3 bg-theme text-black font-semibold rounded-xl hover:bg-theme/90 transition-all shadow-[0_0_20px_rgba(248,199,0,0.3)] hover:shadow-[0_0_30px_rgba(248,199,0,0.5)]"
        >
          + 新建文章
        </Link>
      </div>

      {/* Filters as a plain GET form: server reads searchParams, no client
          state, no useEffect, browser back/forward works for free. */}
      <form
        method="GET"
        className="bg-[#121212] border border-white/10 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row gap-4"
      >
        <select
          name="status"
          defaultValue={filter}
          className="px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:border-theme focus:outline-none transition-colors"
        >
          <option value="all">全部状态</option>
          <option value="PUBLISHED">已发布</option>
          <option value="DRAFT">草稿</option>
          <option value="ARCHIVED">已归档</option>
        </select>
        <input
          type="text"
          name="search"
          placeholder="搜索标题或 Slug..."
          defaultValue={search}
          className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-theme focus:outline-none transition-colors"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-theme/20 text-theme border border-theme/40 rounded-xl hover:bg-theme/30 transition-colors"
        >
          应用
        </button>
      </form>

      {/* Table */}
      <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a1a] border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                  标题
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                  分类
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                  发布时间
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                  浏览量
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-white/60 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                    暂无文章
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-white">{post.title}</div>
                        <div className="text-sm text-white/40 mt-1">/{post.slug}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {post.category?.name || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${
                          STATUS_STYLE[post.status] ?? ''
                        }`}
                      >
                        {STATUS_LABEL[post.status] ?? post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString('zh-CN')
                        : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {post.viewCount}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <a
                        href={`/zh/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-theme hover:text-theme/80 mr-4 transition-colors"
                      >
                        预览
                      </a>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-blue-400 hover:text-blue-300 mr-4 transition-colors"
                      >
                        编辑
                      </Link>
                      <DeletePostButton postId={post.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
