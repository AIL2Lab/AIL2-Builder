/**
 * IAO进行中的视图组件
 * 显示募集进度、剩余时间、基本信息
 */

'use client';

import { Progress } from "@/components/ui/progress";
import { useTranslations } from 'next-intl';
import { Countdown } from "@/components/ui/countdown";
import type { LocalModel } from "@/types/model";
import { useState } from 'react';
import { formatDateWithTimezone } from '@/lib/dateUtils';

interface IaoActiveViewProps {
  modelData: LocalModel & {
    iaos?: Array<{
      id: string;
      chainId: string;
      iaoContractAddress: string;
      iaoStakeToken: string;
      iaoRewardToken: string;
      iaoStartTime: string;
      iaoEndTime: string;
      iaoDepositPeriod: number;
      iaoTotalReward: string;
      status: string;
      chain?: {
        chainId: number;
        name: string;
        rpcUrl: string;
        explorerUrl: string;
      };
    }>;
    creator?: {
      id: string;
      address: string;
      nickname?: string;
      avatar?: string;
    };
  };
}

export const IaoActiveView = ({ modelData }: IaoActiveViewProps) => {
  const t = useTranslations('iaoPool');
  const [, forceUpdate] = useState({});

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
        {t('noIaoData') || 'No IAO data available'}
      </div>
    );
  }

  const startTime = new Date(iaoInfo.iaoStartTime).getTime();
  const endTime = new Date(iaoInfo.iaoEndTime).getTime();
  const totalReward = Number(iaoInfo.iaoTotalReward) / 10**18;
  const depositPeriod = iaoInfo.iaoDepositPeriod;

  // 计算剩余时间
  const remainingTime = Math.max(0, endTime - Date.now());

  // 刷新组件（倒计时结束时）
  const handleCountdownEnd = () => {
    forceUpdate({});
  };

  return (
    <div className="space-y-6">
      {/* 状态和进度 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-green-500">
              {t('iaoOngoing') || 'IAO Ongoing'}
            </span>
          </div>
          
          {/* 剩余时间 */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              {t('timeLeft') || 'Time Left'}:
            </span>
            <Countdown
              remainingTime={remainingTime}
              className="font-medium text-[#F47521] dark:text-orange-400"
              onEnd={handleCountdownEnd}
            />
          </div>
        </div>

        {/* 进度条 - 暂时显示为 0，需要从链上获取实际数据 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              {t('raisedAmount') || 'Raised'}: 0 {modelData.symbol === 'XAA' ? 'DBC' : 'XAA'}
            </span>
            <span className="font-medium text-[#F47521] dark:text-orange-400">
              0%
            </span>
          </div>
          <Progress value={0} className="h-2" />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{t('softCap') || 'Soft Cap'}: - {modelData.symbol === 'XAA' ? 'DBC' : 'XAA'}</span>
            <span>{t('hardCap') || 'Hard Cap'}: - {modelData.symbol === 'XAA' ? 'DBC' : 'XAA'}</span>
          </div>
        </div>
      </div>

      {/* 基本信息 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {t('totalReward') || 'Total Reward'}
          </div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {formatNumber(totalReward)} {modelData.symbol}
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {t('depositPeriod') || 'Deposit Period'}
          </div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {depositPeriod} {t('hours') || 'hours'}
          </div>
        </div>
      </div>

      {/* 时间信息 */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {t('startTime') || 'Start Time'}:
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {formatDateWithTimezone(iaoInfo.iaoStartTime)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {t('endTime') || 'End Time'}:
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {formatDateWithTimezone(iaoInfo.iaoEndTime)}
          </span>
        </div>
      </div>

      {/* 合约信息 */}
      {iaoInfo.iaoContractAddress && (
        <div className="p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {t('contractAddress') || 'Contract Address'}
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

      {/* 网络信息 */}
      {iaoInfo.chain && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-xs text-gray-500 dark:text-blue-300 mb-1">
            {t('network') || 'Network'}
          </div>
          <div className="font-medium text-gray-900 dark:text-blue-100">
            {iaoInfo.chain.name} (Chain ID: {iaoInfo.chain.chainId})
          </div>
        </div>
      )}

      {/* 提示信息 */}
      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
        <p className="font-medium mb-1">ℹ️ {t('notice') || 'Notice'}</p>
        <p className="text-xs">
          {t('connectWalletToParticipate') || 'Connect your wallet to participate in the IAO and view detailed information.'}
        </p>
      </div>
    </div>
  );
};
