'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Rendered {
  rendered: string;
}

interface BlogPost {
  id: number;
  title: Rendered;
  link: string;
  seo_desc: string;
  seo_image: string;     
  release_time: string;  
  categories: number[];
}


const API_URL = "https://www.decentralgpt.org/wp-json/wp/v2/posts?per_page=9999&_fields=id,title,link,seo_desc,seo_image,categories,release_time";


async function getPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  const t = useTranslations("Blog")
  return (
    <Link 
      href={post.link} 
      target="_blank" 
      className="group flex flex-col h-full"
    >
      <article className="bg-[#111111] border border-[#333] rounded-[32px] overflow-hidden transition-all duration-300 hover:border-[#F8C700] hover:shadow-[0_10px_40px_rgba(248,199,0,0.15)] hover:-translate-y-2 flex flex-col h-full">
        <div className="relative h-48 w-full overflow-hidden bg-[#0a0a0a]">
          {post.seo_image ? (
            <Image src={post.seo_image} alt={post.title.rendered} fill />
          ) : (
            <div className="flex items-center justify-center h-full text-[#333]">NO IMAGE</div>
          )}
        </div>
        <div className="p-8 flex flex-col flex-1">
          <div className="text-[#F8C700] text-xs font-bold tracking-[0.2em] mb-4 uppercase opacity-80 group-hover:opacity-100 transition-opacity">
            {post.release_time}
          </div>
          <h2 
            className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-[#F8C700] transition-colors line-clamp-2"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <p className="text-[#A0A0A0] text-base leading-relaxed mb-6 flex-1 line-clamp-3 font-light">
            {post.seo_desc}
          </p>
          <div className="flex items-center text-white font-bold text-sm group-hover:text-[#F8C700] transition-colors mt-auto border-t border-[#222] pt-6 group-hover:border-[#F8C700]/30">
            {t("readBtn")} 
            <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
};

export function List({ allPosts }: { allPosts: BlogPost[] }) {
  const t = useTranslations("Blog")
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const listRef = useRef<HTMLDivElement>(null); 
  
  const totalPages = Math.ceil(allPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = allPosts.slice(startIndex, startIndex + itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div ref={listRef} className="min-h-screen bg-black text-white font-sans selection:bg-[#F8C700] selection:text-black">
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white leading-[0.9]">
            {t("title")} 
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-[#222] rounded-3xl bg-[#111111]">
            <p className="text-[#A0A0A0]">{t("noData")}</p>
          </div>
        )}
        {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-20 pb-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-6 py-3 border border-[#333] rounded-xl text-[#A0A0A0] font-bold text-sm hover:border-[#F8C700] hover:text-[#F8C700] disabled:opacity-30 disabled:hover:text-[#A0A0A0] disabled:hover:border-[#333] transition-all"
          >
            &larr; {t("prev")}
          </button>
          <div className="hidden sm:flex gap-2">
            {pages.map((page) => {
               if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`
                        w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-all duration-300
                        ${page === currentPage 
                          ? 'bg-[#F8C700] text-black shadow-[0_0_15px_rgba(248,199,0,0.5)] scale-110' 
                          : 'bg-[#111111] text-[#A0A0A0] border border-[#333] hover:border-[#F8C700] hover:text-white'}
                      `}
                    >
                      {page}
                    </button>
                  );
               }
               if (page === 2 || page === totalPages - 1) return <span key={page} className="text-[#333] px-1 self-end">...</span>;
               return null;
            })}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-6 py-3 border border-[#333] rounded-xl text-[#A0A0A0] font-bold text-sm hover:border-[#F8C700] hover:text-[#F8C700] disabled:opacity-30 disabled:hover:text-[#A0A0A0] disabled:hover:border-[#333] transition-all"
          >
            {t("next")} &rarr;
          </button>
        </div>
      )}
      </div>
    </div>
  );
}