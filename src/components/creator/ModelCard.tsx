import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CountdownTimer } from './CountdownTimer';
import { ModelWithIaos } from '@/actions/models';

interface ModelCardProps {
  model: ModelWithIaos;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const t = useTranslations('Creator.table');
  // TODO: Implement mock data or helpers for fields not in schema (ticker, holders, etc.)
  // For now, we'll use placeholders or derived data
  const ticker = model.symbol ? `$${model.symbol}` : 'N/A';
  // Mock data to match previous UI, should be replaced with real data when available
  const holders = '0';
  const mCap = '0';
  const change24h = '0%';
  const price = '0';
  const vol = '0';
  const liquidity = '0';
  const isPositive = true;
  const type = 'MODEL';

  // Check if there's an active IAO
  const activeIAO = model.iaos?.find(iao => {
    if (!iao?.iaoEndTime) return false;
    const now = new Date();
    const endTime = new Date(iao.iaoEndTime);
    return endTime > now;
  });
  const isIAOActive = !!activeIAO;

  return (
    <div className="p-4 bg-white/5 space-y-4">
      {/* Header: Model Info & Action */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-xl border-blue-500 text-blue-500`}>
            {model.symbol ? model.symbol[0] : '?'}
          </div>
          <div>
            <div className="font-bold text-white text-lg">{model.name}</div>
            <div className="text-gray-400 text-sm">{ticker}</div>
          </div>
        </div>
        <Link 
          href={`/models/detail/${model.id}`} 
          className="px-4 py-1.5 text-xs rounded-full border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors whitespace-nowrap"
        >
          {isIAOActive ? '参与IAO' : t('viewDetails')}
        </Link>
      </div>

      {isIAOActive && activeIAO ? (
        /* IAO Active View */
        <div className="space-y-3">
          {/* Countdown */}
          <div className="flex items-center justify-between py-3 px-4 bg-black/30 rounded-lg border border-[#F3BA2F]/20">
            <div className="text-gray-400 text-sm">剩余时间</div>
            <CountdownTimer endTime={activeIAO.iaoEndTime} />
          </div>
          
          {/* Type Badge */}
          <div className="flex items-center justify-between">
            <div className="text-gray-500 text-xs uppercase">{t('type')}</div>
            <span className="inline-block px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
              {type}
            </span>
          </div>
        </div>
      ) : (
        /* Normal View */
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500 text-xs uppercase mb-1">{t('price')}</div>
              <div className="font-mono text-gray-300">{price}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase mb-1">{t('change24h')}</div>
              <div className={`font-mono ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {change24h}
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase mb-1">{t('mcap')}</div>
              <div className="font-mono font-bold text-white">{mCap}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase mb-1">{t('type')}</div>
              <span className="inline-block px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
                {type}
              </span>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-xs">
            <div>
              <div className="text-gray-500 mb-0.5">{t('holders')}</div>
              <div className="font-mono text-gray-400">{holders}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">{t('vol')}</div>
              <div className="font-mono text-gray-400">{vol}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">{t('liquidity')}</div>
              <div className="font-mono text-gray-400">{liquidity}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};