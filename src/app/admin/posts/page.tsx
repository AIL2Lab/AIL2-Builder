'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  category: { name: string } | null;
  viewCount: number;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [filter, search]);

  async function fetchPosts() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('status', filter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/admin/posts?${params}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setPosts(data);
      } else if (data.error) {
        console.error('API error:', data.error);
        setPosts([]);
      } else {
        console.error('Unexpected response format:', data);
        setPosts([]);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  async function deletePost(id: string) {
    if (!confirm('确定要删除这篇文章吗？')) return;

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      }
    } catch (error) {
      alert('删除失败');
    }
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PUBLISHED: 'bg-green-500/20 text-green-400 border-green-500/30',
      DRAFT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      ARCHIVED: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    const labels: Record<string, string> = {
      PUBLISHED: '已发布',
      DRAFT: '草稿',
      ARCHIVED: '已归档',
    };
    return (
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full border ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

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

      {/* Filters */}
      <div className="bg-[#121212] border border-white/10 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row gap-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:border-theme focus:outline-none transition-colors"
        >
          <option value="all">全部状态</option>
          <option value="PUBLISHED">已发布</option>
          <option value="DRAFT">草稿</option>
          <option value="ARCHIVED">已归档</option>
        </select>
        <input
          type="text"
          placeholder="搜索标题或 Slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-theme focus:outline-none transition-colors"
        />
      </div>

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
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/60">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-theme/30 border-t-theme rounded-full animate-spin" />
                      加载中...
                    </div>
                  </td>
                </tr>
              ) : posts.length === 0 ? (
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
                        <div className="font-medium text-white">
                          {post.title}
                        </div>
                        <div className="text-sm text-white/40 mt-1">
                          /{post.slug}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {post.category?.name || '-'}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(post.status)}</td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString('zh-CN')
                        : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {post.viewCount}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-theme hover:text-theme/80 mr-4 transition-colors"
                      >
                        预览
                      </Link>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-blue-400 hover:text-blue-300 mr-4 transition-colors"
                      >
                        编辑
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        删除
                      </button>
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
