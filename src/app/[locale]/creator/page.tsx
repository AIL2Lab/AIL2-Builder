"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useRouter } from '@/i18n/navigation';
import { ModelCard } from '@/components/creator/ModelCard';
import { ModelTable } from '@/components/creator/ModelTable';
import { ModelService } from '@/services/api/model';
import { Agent } from '@/generated/client';
import { useTranslations } from 'next-intl';

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const baseStyle = "px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-[#F3BA2F] text-black hover:bg-white hover:scale-105",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
    outline: "border border-gray-600 text-gray-300 hover:border-[#F3BA2F] hover:text-[#F3BA2F]",
    ghost: "text-gray-400 hover:text-[#F3BA2F]"
  };
  return (
    <button className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default function CreatorPage() {
  const [activeTab, setActiveTab] = useState('All');
  const router = useRouter();
  const t = useTranslations('Creator');
  
  // Data Fetching State
  const [page, setPage] = useState(1);
  const [allAgents, setAllAgents] = useState<Agent[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const observerTarget = useRef<HTMLDivElement>(null);
  const pageSize = 10;
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch Data Function
  const fetchAgents = useCallback(async (pageNum: number) => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new controller for this request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setIsError(false);

    try {
      // Use direct service call instead of hook
      // Note: request library should support signal passing if we want true cancellation at fetch level
      // but our simplified service wrapper might not expose it directly yet.
      // For now we just handle the logic state.
      const response = await ModelService.getModels({ 
        page: pageNum, 
        pageSize 
      });

      if (response.success && response.data) {
        if (pageNum === 1) {
          setAllAgents(response.data.agents);
        } else {
          setAllAgents(prev => [...prev, ...(response.data?.agents || [])]);
        }
        
        // Check if we've reached the end
        if (response.data.currentPage >= response.data.totalPages) {
          setHasMore(false);
        }
      } else {
        setIsError(true);
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Failed to fetch agents:', error);
        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  // Initial fetch and page changes
  useEffect(() => {
    fetchAgents(page);
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page, fetchAgents]);

  // Infinite Scroll Intersection Observer
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !isLoading) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, isLoading]);

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: '100px',
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <PageLayout isShowFooter={true}>
      <div className="min-h-screen bg-black text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
        <div className="mb-16">
          <div className="text-[#F3BA2F] text-sm font-bold tracking-widest mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#F3BA2F]"></span>
            {t('product')}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t.rich('title', { br: () => <br /> })}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
            {t('description')}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('All')}
                className={`px-6 py-2 rounded-lg border transition-colors ${
                  activeTab === 'All' 
                    ? 'border-[#F3BA2F] text-[#F3BA2F]' 
                    : 'border-white/10 text-gray-400 hover:border-white/30'
                }`}
              >
                {t('tabs.all')}
              </button>
              <button 
                onClick={() => setActiveTab('IAO Active')}
                className={`px-6 py-2 rounded-lg border transition-colors ${
                  activeTab === 'IAO Active' 
                    ? 'border-[#F3BA2F] text-[#F3BA2F]' 
                    : 'border-white/10 text-gray-400 hover:border-white/30'
                }`}
              >
                {t('tabs.iaoActive')}
              </button>
            </div>
            
            <Button onClick={() => router.push('/models/create')}>
              <Sparkles className="w-4 h-4" />
              {t('launchIAO')}
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0A0A0A]">
          {/* Model Info - Desktop Table */}
          <div className="hidden md:block">
            {isLoading && page === 1 ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
              </div>
            ) : isError ? (
               <div className="flex flex-col justify-center items-center py-20 text-gray-400">
                <p>{t('failedToLoad')}</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>{t('retry')}</Button>
              </div>
            ) : (
               <ModelTable agents={allAgents} />
            )}
          </div>

          {/* Agent Info - Mobile Cards */}
          <div className="md:hidden divide-y divide-white/10">
            {isLoading && page === 1 ? (
               <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
              </div>
            ) : isError ? (
               <div className="flex flex-col justify-center items-center py-20 text-gray-400">
                <p>{t('failedToLoad')}</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>{t('retry')}</Button>
              </div>
            ) : (
              allAgents.map((agent, index) => (
                <ModelCard key={agent.id || index} agent={agent} />
              ))
            )}
          </div>

          {/* Infinite Scroll Loader */}
          {(hasMore || isLoading) && !isError && (
             <div ref={observerTarget} className="flex justify-center items-center py-8">
               {isLoading && (
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
               )}
               {!hasMore && allAgents.length > 0 && (
                 <div className="text-gray-500 text-sm">{t('noMoreAgents')}</div>
               )}
             </div>
          )}
        </div>
      </div>
    </div>
    </PageLayout>
  );
}
