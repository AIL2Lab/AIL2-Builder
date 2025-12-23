import React from 'react';
import { Model } from '@/generated/client';
import { useTranslations } from 'next-intl';

interface ModelTableProps {
  models: Model[];
}

export const ModelTable: React.FC<ModelTableProps> = ({ models }) => {
  const t = useTranslations('Creator.table');

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px]">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-3 pl-4">{t('modelInfo')}</div>
          <div className="col-span-1">{t('symbol')}</div>
          <div className="col-span-1">{t('type')}</div>
          <div className="col-span-1 text-right">{t('holders')}</div>
          <div className="col-span-1 text-right">{t('mcap')}</div>
          <div className="col-span-1 text-right">{t('change24h')}</div>
          <div className="col-span-1 text-right">{t('price')}</div>
          <div className="col-span-1 text-right">{t('vol')}</div>
          <div className="col-span-1 text-right">{t('liquidity')}</div>
          <div className="col-span-1 text-center">{t('action')}</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/10">
          {models.map((model, index) => {
             // TODO: Implement mock data or helpers for fields not in schema
            const ticker = model.symbol ? `$${model.symbol}` : 'N/A';
            const holders = '0';
            const mCap = '0';
            const change24h = '0%';
            const price = '0';
            const vol = '0';
            const liquidity = '0';
            const isPositive = true;
            const type = 'MODEL';

            return (
              <div key={model.id || index} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group">
                {/* Model Info */}
                <div className="col-span-3 flex items-center gap-4 pl-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-lg border-blue-500 text-blue-500`}>
                    {model.symbol ? model.symbol[0] : '?'}
                  </div>
                  <span className="font-bold text-white">{model.name}</span>
                </div>

                {/* Symbol */}
                <div className="col-span-1 text-gray-400 text-sm">{ticker}</div>

                {/* Type */}
                <div className="col-span-1">
                  <span className="px-3 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
                    {type}
                  </span>
                </div>

                {/* Holders */}
                <div className="col-span-1 text-right text-gray-300 font-mono text-sm">{holders}</div>

                {/* Market Cap */}
                <div className="col-span-1 text-right font-bold text-white font-mono text-sm">{mCap}</div>

                {/* 24h Change */}
                <div className={`col-span-1 text-right font-mono text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {change24h}
                </div>

                {/* Price */}
                <div className="col-span-1 text-right text-gray-300 font-mono text-sm">{price}</div>

                {/* Volume */}
                <div className="col-span-1 text-right text-gray-300 font-mono text-sm">{vol}</div>

                {/* Liquidity */}
                <div className="col-span-1 text-right text-gray-300 font-mono text-sm">{liquidity}</div>

                {/* Action */}
                <div className="col-span-1 text-center pr-2">
                  <button className="px-6 py-1.5 text-xs rounded-full border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors w-full whitespace-nowrap">
                    {t('chat')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};