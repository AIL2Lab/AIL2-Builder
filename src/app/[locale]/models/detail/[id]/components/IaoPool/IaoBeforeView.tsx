/**
 * IAO开始前的视图组件
 * 显示IAO准备信息和倒计时
 */

'use client';

import { useTranslations } from 'next-intl';
import { Clock, Gift, Timer, ExternalLink } from 'lucide-react';
import { Countdown } from "@/components/ui/countdown";
import type { LocalModel } from "@/types/model";
import { useState } from 'react';

interface IaoBeforeViewProps {
  modelData: LocalModel & {
    iaos?: Array<{
      id: string;
      chainId: string;
      iaoContractAddress: string;
      iaoStartTime: string;
      iaoEndTime: string;
      iaoDepositPeriod: number;
      iaoTotalReward: string;
      chain?: {
        chainId: number;
        name: string;
        explorerUrl: string;
      };
    }>;
  };
}

export const IaoBeforeView = ({ modelData }: IaoBeforeViewProps) => {
  const t = useTranslations('iaoPool');
  const [, forceUpdate] = useState({});

  // 从 modelData.iaos 获取 IAO 数据
  const iao = modelData.iaos?.[0];
  
  if (!iao) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          {t('noIaoData')}
        </p>
      </div>
    );
  }

  // 转换时间戳（ISO 字符串转毫秒）
  const startTime = new Date(iao.iaoStartTime).getTime();
  const now = Date.now();
  const remainingTime = Math.max(0, startTime - now);

  // 计算总奖励（从 wei 转换）
  const totalReward = Number(iao.iaoTotalReward) / 10 ** 18;

  // 刷新组件（倒计时结束时）
  const handleCountdownEnd = () => {
    forceUpdate({});
  };

  return (
    <div className="space-y-4">
      {/* 状态提示 */}
      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
        <div className="flex items-start gap-3">
          <Clock 
            className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" 
            strokeWidth={2}
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              {t('iaoComingSoon')}
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
              {t('pleaseWaitPatiently')}
            </p>
            
            {/* 倒计时 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {t('startCountdown')}
              </div>
              <Countdown
                remainingTime={remainingTime}
                className="text-2xl font-bold text-blue-600 dark:text-blue-400"
                onEnd={handleCountdownEnd}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 基本信息（可选，简洁显示） */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* 总奖励 */}
        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-1">
            <Gift className="w-4 h-4" />
            {t('totalReward')}
          </div>
          <div className="text-lg font-semibold text-orange-600 dark:text-orange-400">
            {totalReward.toLocaleString()} {modelData.symbol}
          </div>
        </div>

        {/* 持续时间 */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-1">
            <Timer className="w-4 h-4" />
            {t('duration')}
          </div>
          <div className="text-lg font-semibold text-green-600 dark:text-green-400">
            {iao.iaoDepositPeriod} {t('hours')}
          </div>
        </div>
      </div>

      {/* 合约地址（可选） */}
      {iao.iaoContractAddress && iao.iaoContractAddress !== '0x0000000000000000000000000000000000000000' && (
        <div className="p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            {t('contractAddress')}
          </div>
          <a
            href={`${iao.chain?.explorerUrl || 'https://testnet.bscscan.com'}/address/${iao.iaoContractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-mono text-blue-500 hover:text-blue-600 dark:text-blue-400 break-all group"
          >
            <span>{iao.iaoContractAddress}</span>
            <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      )}
    </div>
  );
};
