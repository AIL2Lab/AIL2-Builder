// components/KLineChart.tsx
'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

interface KLineChartProps {
  /** 代币地址 */
  tokenAddress?: string;
  /** 流动性池地址 */
  liquidityPoolAddress?: string;
  /** 链ID (56=BSC主网, 97=BSC测试网) */
  chainId: number;
  /** 图表高度，默认600px */
  height?: number;
  /** 自定义类名 */
  className?: string;
}

export function KLineChart({
  tokenAddress,
  liquidityPoolAddress,
  chainId,
  height = 600,
  className = ''
}: KLineChartProps) {
  const t = useTranslations('tokenDetail');

  // 构建 GeckoTerminal 图表 URL
  const chartUrl = useMemo(() => {
    if (!tokenAddress || !liquidityPoolAddress) return null;

    // 根据链ID确定网络名称
    const networkMap: Record<number, string> = {
      56: 'bsc',
      97: 'bsc_testnet',
      1: 'eth',
      137: 'polygon'
    };
    const network = networkMap[chainId] || 'bsc';

    // 图表参数配置
    const params = new URLSearchParams({
      embed: '1',              // 嵌入模式
      info: '0',               // 隐藏信息面板
      swaps: '0',              // 隐藏交易记录
      light_chart: '0',        // 使用深色主题
      chart_type: 'price',     // 图表类型：价格
      resolution: '1d',        // 时间间隔：1天
      bg_color: '111827'       // 背景色
    });

    return `https://www.geckoterminal.com/${network}/pools/${liquidityPoolAddress}?${params.toString()}`;
  }, [tokenAddress, liquidityPoolAddress, chainId]);

  // 无流动性状态
  if (!chartUrl) {
    return (
      <div 
        className={`relative w-full rounded-lg overflow-hidden shadow-lg border border-border ${className}`}
        style={{ height: `${height}px` }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 bg-card">
          {/* 加载动画 */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 rounded-full animate-pulse bg-primary/60" />
            <div className="w-3 h-3 rounded-full animate-pulse bg-primary/60 [animation-delay:200ms]" />
            <div className="w-3 h-3 rounded-full animate-pulse bg-primary/60 [animation-delay:400ms]" />
          </div>
          <p className="text-sm text-muted-foreground">
            {t('waitingForLiquidity') || '等待流动性池创建...'}
          </p>
          <div className="text-xs text-muted-foreground/70">
            {t('chartAfterLiquidity') || '图表将在添加流动性后显示'}
          </div>
        </div>
      </div>
    );
  }

  // 渲染图表
  return (
    <div 
      className={`relative w-full bg-[#111827] rounded-lg overflow-hidden shadow-lg ${className}`}
      style={{ height: `${height}px` }}
    >
      <iframe
        id="kline-chart"
        title="K线图表"
        src={chartUrl}
        className="w-full h-full border-0"
        allow="clipboard-write"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
