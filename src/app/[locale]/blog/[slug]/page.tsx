import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { getTranslations } from 'next-intl/server';
import PageLayout from "@/components/PageLayout";
import prisma from '@/lib/prisma';

function sanitizeHtml(html: string) {
  const dom = new JSDOM('');
  const purify = DOMPurify(dom.window);
  return purify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote',
      'a', 'img', 'code', 'pre', 'span',
      'table', 'thead', 'tbody', 'tr', 'td', 'th', 'figure', 'figcaption'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'target',
      'class', 'style', 'width', 'height',
    ],
  });
}

// 获取文章数据
async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug,
      status: 'PUBLISHED',
    },
    include: {
      category: true,
      tags: true,
    },
  });
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPost(slug);

  if (!post) return { title: 'Not Found' };

  const title = post.metaTitle || post.title;
  const description = post.metaDesc || post.excerpt || '';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ail2.com';
  const url = `${baseUrl}/${locale}/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: post.ogImage || post.coverImage ? [post.ogImage || post.coverImage!] : [],
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.ogImage || post.coverImage ? [post.ogImage || post.coverImage!] : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });

  const post = await getPost(slug);

  if (!post) notFound();

  // 增加浏览量（非阻塞）
  prisma.post.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  }).catch(console.error);

  const cleanContent = sanitizeHtml(post.content);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ail2.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDesc || post.excerpt,
    image: post.ogImage || post.coverImage,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AIL2',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/${locale}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
    articleSection: post.category?.name,
  };

  return (
    <PageLayout isShowFooter className="bg-black text-white min-h-screen selection:bg-[#F8C700] selection:text-black">
      <article className="max-w-7xl mx-auto px-6 py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {post.coverImage && (
          <div className="relative w-full h-[400px] md:h-[600px] rounded-[32px] overflow-hidden mb-12 border border-[#333]">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-black mb-8 text-white leading-[1.1] tracking-tighter">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[#A0A0A0] mb-12 text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-[#F8C700]">
                {post.authorName[0]}
              </span>
              <span>{post.authorName}</span>
            </div>
            <span className="w-1 h-1 bg-[#333] rounded-full"></span>
            <time className="uppercase tracking-wider">
              {post.publishedAt?.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {post.category && (
              <>
                <span className="w-1 h-1 bg-[#333] rounded-full"></span>
                <span className="text-[#F8C700] uppercase tracking-widest text-[10px] font-bold bg-[#F8C700]/10 px-3 py-1 rounded-full border border-[#F8C700]/20">
                  {post.category.name}
                </span>
              </>
            )}
            <span className="w-1 h-1 bg-[#333] rounded-full"></span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.viewCount} {t('views')}
            </span>
          </div>

          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-white
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-[#A0A0A0] prose-p:leading-relaxed prose-p:mb-8
              prose-a:text-[#F8C700] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-img:rounded-[24px] prose-img:border prose-img:border-[#333]
              prose-blockquote:border-l-4 prose-blockquote:border-[#F8C700]
              prose-blockquote:bg-[#111] prose-blockquote:px-8 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl
              prose-code:text-[#F8C700] prose-code:bg-[#111] prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#111] prose-pre:border prose-pre:border-[#333] prose-pre:rounded-2xl
              prose-li:text-[#A0A0A0]
            "
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />

          {post.tags.length > 0 && (
            <div className="mt-20 pt-10 border-t border-[#222]">
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-4 py-2 bg-[#111] border border-[#333] text-[#A0A0A0] rounded-xl text-xs font-bold hover:border-[#F8C700] hover:text-[#F8C700] transition-colors"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </PageLayout>
  );
}
