'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const TinyMCEEditor = dynamic(
  () => import('@/components/editor/TinyMCEEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] bg-[#1a1a1a] animate-pulse rounded-xl" />
    ),
  }
);

interface Category {
  id: string;
  name: string;
}

export default function NewPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    coverImage: '',
    metaTitle: '',
    metaDesc: '',
    keywords: '',
    ogImage: '',
    categoryId: '',
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
    authorName: '管理员',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }

  const handleContentChange = (html: string) => {
    setFormData((prev) => ({
      ...prev,
      content: html,
    }));
  };

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug || !formData.content) {
      alert('请填写标题、Slug 和内容');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          keywords: formData.keywords
            .split(',')
            .map((k) => k.trim())
            .filter(Boolean),
        }),
      });

      if (res.ok) {
        router.push('/admin/posts');
      } else {
        const error = await res.json();
        alert(error.error || '保存失败');
      }
    } catch (err) {
      alert('保存失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">新建文章</h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 bg-theme text-black font-semibold rounded-xl hover:bg-theme/90 transition-all shadow-[0_0_20px_rgba(248,199,0,0.3)] hover:shadow-[0_0_30px_rgba(248,199,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                保存中...
              </span>
            ) : '保存'}
          </button>
        </div>
      </div>

      <form className="space-y-6">
        <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              标题 <span className="text-theme">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-theme focus:outline-none transition-colors"
              placeholder="文章标题"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              URL Slug <span className="text-theme">*</span>
            </label>
            <div className="flex">
              <span className="px-4 py-3 bg-[#1a1a1a] border border-r-0 border-white/10 rounded-l-xl text-white/50 text-sm flex items-center">
                /blog/
              </span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-r-xl text-white placeholder:text-white/40 focus:border-theme focus:outline-none transition-colors"
                placeholder="url-friendly-slug"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                分类
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:border-theme focus:outline-none transition-colors"
              >
                <option value="">未分类</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                作者名称
              </label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) =>
                  setFormData({ ...formData, authorName: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:border-theme focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                发布状态
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as any })
                }
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:border-theme focus:outline-none transition-colors"
              >
                <option value="DRAFT">草稿</option>
                <option value="PUBLISHED">已发布</option>
                <option value="ARCHIVED">已归档</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              封面图 CDN 链接
            </label>
            <input
              type="url"
              value={formData.coverImage}
              onChange={(e) =>
                setFormData({ ...formData, coverImage: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-theme focus:outline-none transition-colors"
              placeholder="https://your-cdn.com/image.jpg"
            />
            {formData.coverImage && (
              <img
                src={formData.coverImage}
                alt="封面预览"
                className="mt-3 h-32 object-cover rounded-xl border border-white/10"
              />
            )}
          </div>
        </div>

        <div className="border-b border-white/10">
          <nav className="flex gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'content'
                  ? 'border-theme text-theme'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              内容编辑
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('seo')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'seo'
                  ? 'border-theme text-theme'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              SEO 设置
            </button>
          </nav>
        </div>

        {activeTab === 'content' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                文章内容 <span className="text-theme">*</span>
              </label>
              <TinyMCEEditor
                value={formData.content}
                onChange={handleContentChange}
                height={600}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                摘要（留空自动从内容生成）
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-theme focus:outline-none transition-colors h-24"
                placeholder="文章摘要，用于列表展示和 SEO 描述"
              />
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Meta 标题（默认使用文章标题）
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) =>
                  setFormData({ ...formData, metaTitle: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-theme focus:outline-none transition-colors"
                placeholder="SEO 标题（60字以内）"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Meta 描述（默认使用摘要）
              </label>
              <textarea
                value={formData.metaDesc}
                onChange={(e) =>
                  setFormData({ ...formData, metaDesc: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-theme focus:outline-none transition-colors h-20"
                placeholder="SEO 描述（160字以内）"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                关键词（逗号分隔）
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) =>
                  setFormData({ ...formData, keywords: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-theme focus:outline-none transition-colors"
                placeholder="区块链, AI, Web3, DeFi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Open Graph 图片（社交媒体分享图）
              </label>
              <input
                type="url"
                value={formData.ogImage}
                onChange={(e) =>
                  setFormData({ ...formData, ogImage: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-theme focus:outline-none transition-colors"
                placeholder="https://your-cdn.com/og-image.jpg"
              />
              <p className="mt-2 text-sm text-white/40">建议尺寸: 1200 x 630</p>
              {formData.ogImage && (
                <img
                  src={formData.ogImage}
                  alt="OG 图片预览"
                  className="mt-3 h-40 object-cover rounded-xl border border-white/10"
                />
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
