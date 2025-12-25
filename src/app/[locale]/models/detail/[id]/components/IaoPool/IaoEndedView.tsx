/**
 * IAO结束后的视图组件
 * 显示基本的 IAO 结束信息
 */

'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle, XCircle } from 'lucide-react';
import type { LocalModel } from "@/types/model";
import { formatDateWithTimezone } from '@/lib/dateUtils';

interface IaoEndedViewProps {
  modelData: LocalModel & {
    iaos?: Array<{
      id: string;
      chainId: string;
      iaoContractAddress: string;
      iaoStartTime: string;
      iaoEndTime: string;
      iaoDepositPeriod: number;
      iaoTotalReward: string;
      status: string;
      chain?: {
        chainId: number;
        name: string;
        explorerUrl: string;
      };
    }>;
  };
}

export const IaoEndedView = ({ modelData }: IaoEndedViewProps) => {
  const t = useTranslations('iaoPool');

  const formatNumber = (value: string | number, decimals: number = 2): string => {
    if (!value || value === '0') return '0';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '0';
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals
    });
  };

  // 从 modelData 中提取 IAO 信息
  const iaoInfo = modelData.iaos?.[0];
  
  if (!iaoInfo) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('noIaoData')}
      </div>
    );
  }

  const endTime = new Date(iaoInfo.iaoEndTime).getTime();
  const totalReward = Number(iaoInfo.iaoTotalReward) / 10**18;
  
  // 简化版：暂时无法判断成功/失败，需要链上数据
  // 这里仅展示 IAO 已结束的状态
  return (
    <div className="space-y-6">
      {/* IAO 已结束提示 */}
      <div className="p-6 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-gray-600 dark:text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {t('iaoEnded')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('iaoEndedDescription')}
        </p>
      </div>

      {/* 基本信息 */}
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="text-xs text-gray-500 dark:text-blue-300 mb-1">
            {t('totalReward')}
          </div>
          <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            {formatNumber(totalReward)} {modelData.symbol}
          </div>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
          <div className="text-xs text-gray-500 dark:text-purple-300 mb-1">
            {t('endTime')}
          </div>
          <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">
            {formatDateWithTimezone(iaoInfo.iaoEndTime)}
          </div>
        </div>
      </div>

      {/* 合约信息 */}
      {iaoInfo.iaoContractAddress && (
        <div className="p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {t('contractAddress')}
          </div>
          <a 
            href={`${iaoInfo.chain?.explorerUrl || 'https://testnet.bscscan.com'}/address/${iaoInfo.iaoContractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 break-all"
          >
            {iaoInfo.iaoContractAddress}
          </a>
        </div>
      )}

      {/* 提示信息 */}
      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
        <p className="font-medium mb-1">ℹ️ {t('notice')}</p>
        <p className="text-xs">
          {t('iaoEndedNotice')}
        </p>
      </div>
    </div>
  );
};
