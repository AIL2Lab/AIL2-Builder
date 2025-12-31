/**
 * IAO进行中的视图组件
 * 显示募集进度、剩余时间、基本信息，支持投资交互
 */

'use client';

import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { Countdown } from "@/components/ui/countdown";
import type { LocalModel } from "@/types/model";
import { useState, useMemo, useCallback, useEffect } from 'react';
import { formatDateWithTimezone } from '@/lib/dateUtils';
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { useToast } from "@/hooks/use-toast";
import IAO_ABI from '@/config/abis/iao.json';

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
  // 投资交互相关的 props（可选，用于未来扩展）
  poolInfo?: any;
  userStakeInfo?: any;
  isStakeLoading?: boolean;
  onStake?: (amount: string) => void;
  onRefresh?: () => void | Promise<void>;
}

export const IaoActiveView = ({ 
  modelData,
  poolInfo,
  userStakeInfo,
  isStakeLoading = false,
  onStake,
  onRefresh
}: IaoActiveViewProps) => {
  const t = useTranslations('iaoPool');
  const [, forceUpdate] = useState({});
  const { isConnected, address } = useAppKitAccount();
  const { open } = useAppKit();
  const { toast } = useToast();
  
  // 投资金额状态
  const [stakeAmount, setStakeAmount] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  
  // IAO 合约地址
  const iaoContractAddress = modelData.iaos?.[0]?.iaoContractAddress as `0x${string}` | undefined;
  
  // 获取用户 BNB 余额
  const { data: balanceData, isLoading: isBalanceLoading, refetch: refetchBalance } = useBalance({
    address: address as `0x${string}`,
    query: {
      enabled: !!address && isConnected,
    }
  });

  // 读取用户在 IAO 合约中的存入金额
  const { data: userDepositedAmount, refetch: refetchUserDeposit } = useReadContract({
    address: iaoContractAddress,
    abi: IAO_ABI,
    functionName: 'userDeposits',
    args: [address as `0x${string}`],
    query: {
      enabled: !!iaoContractAddress && !!address && isConnected,
    }
  });

  // 读取总存入金额
  const { data: totalDepositedAmount, refetch: refetchTotalDeposit } = useReadContract({
    address: iaoContractAddress,
    abi: IAO_ABI,
    functionName: 'totalDepositedTokenIn',
    query: {
      enabled: !!iaoContractAddress,
    }
  });

  // 写入合约 - deposit
  const { writeContract, data: depositHash, isPending: isDepositPending } = useWriteContract();

  // 等待交易确认
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: depositHash,
  });

  // 交易确认成功后的处理
  useEffect(() => {
    if (isConfirmed && depositHash) {
      toast({
        title: t('success') || '成功',
        description: t('depositSuccess', { 
          amount: stakeAmount 
        }) || `成功存入 ${stakeAmount} BNB`,
      });
      
      // 清空输入
      setStakeAmount('');
      setIsDepositing(false);
      
      // 刷新数据
      refetchBalance();
      refetchUserDeposit();
      refetchTotalDeposit();
      
      // 调用父组件的刷新方法
      if (onRefresh) {
        onRefresh();
      }
    }
  }, [isConfirmed, depositHash, stakeAmount, toast, t, refetchBalance, refetchUserDeposit, refetchTotalDeposit, onRefresh]);

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

  // IAO 状态检查
  const isIaoStarted = Date.now() >= startTime;
  const isIaoEnded = Date.now() >= endTime;
  const isIaoActive = isIaoStarted && !isIaoEnded;
  const isCreator = modelData.creator?.address?.toLowerCase() === address?.toLowerCase();

  // 刷新组件（倒计时结束时）
  const handleCountdownEnd = () => {
    forceUpdate({});
  };

  // 处理刷新
  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setStakeAmount(value);
    }
  };

  // 处理键盘输入
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter'];
    const disallowedKeys = ['-', 'e', 'E', '+'];
    
    if (allowedKeys.includes(e.key)) return;
    if (disallowedKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }
    
    if (!/^[0-9.]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // 处理最大金额
  const handleSetMaxAmount = () => {
    if (balanceData?.value) {
      // 将 wei 转换为 BNB，保留小数
      const balance = formatUnits(balanceData.value, balanceData.decimals);
      // 保留 6 位小数
      const formattedBalance = parseFloat(balance).toFixed(6);
      setStakeAmount(formattedBalance);
    }
  };
  
  // 格式化余额显示
  const formattedBalance = useMemo(() => {
    if (!isConnected) return '0';
    if (isBalanceLoading) return t('loadingFromBlockchain');
    if (balanceData?.value) {
      const balance = formatUnits(balanceData.value, balanceData.decimals);
      return parseFloat(balance).toFixed(6);
    }
    return '0';
  }, [balanceData, isBalanceLoading, isConnected, t]);

  // 处理存入按钮点击
  const handleDepositClick = useCallback(async () => {
    // 检查钱包连接
    if (!isConnected) {
      open({ view: 'Connect' });
      return;
    }

    // 检查输入金额
    if (!stakeAmount || Number(stakeAmount) <= 0) {
      toast({
        title: t('error') || '错误',
        description: t('enterValidAmount') || '请输入有效金额',
        variant: 'destructive',
      });
      return;
    }

    // 检查余额
    const userBalance = balanceData?.value ? parseFloat(formatUnits(balanceData.value, balanceData.decimals)) : 0;
    const inputAmount = Number(stakeAmount);
    
    if (inputAmount > userBalance) {
      toast({
        title: t('error') || '错误',
        description: t('notEnoughBalance') || '余额不足',
        variant: 'destructive',
      });
      return;
    }

    // 检查合约地址
    if (!iaoContractAddress) {
      toast({
        title: t('error') || '错误',
        description: t('contractNotFound') || '未找到合约地址',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsDepositing(true);

      // 将 BNB 数量转换为 wei（18 位小数）
      const amountInWei = parseUnits(stakeAmount, 18);

      // 调用合约的 deposit 方法
      writeContract({
        address: iaoContractAddress,
        abi: IAO_ABI,
        functionName: 'deposit',
        args: [amountInWei],
        value: amountInWei, // 发送 BNB
      });

    } catch (error: any) {
      console.error('存入失败:', error);
      setIsDepositing(false);
      
      toast({
        title: t('error') || '错误',
        description: error.message || t('depositFailed') || '存入失败',
        variant: 'destructive',
      });
    }
  }, [
    isConnected,
    stakeAmount,
    balanceData,
    iaoContractAddress,
    open,
    toast,
    t,
    writeContract,
  ]);

  // 获取按钮文本
  const getButtonText = (): string => {
    if (!isIaoStarted) return t('iaoNotStarted') || 'IAO Not Started';
    if (!isConnected) return t('connectWalletFirst') || 'Connect Wallet';
    if (isStakeLoading) return t('processing') || 'Processing...';
    if (!isIaoActive) return t('investNotStarted') || 'Investment Not Available';
    return t('deposit') || 'Deposit';
  };

  // 按钮禁用状态
  const isButtonDisabled = useMemo((): boolean => {
    if (!isConnected) return false; // 允许点击连接钱包
    
    // 检查余额是否足够
    const userBalance = balanceData?.value ? parseFloat(formatUnits(balanceData.value, balanceData.decimals)) : 0;
    const inputAmount = Number(stakeAmount) || 0;
    
    return !isIaoActive ||
           isStakeLoading ||
           !isIaoStarted ||
           !stakeAmount ||
           inputAmount <= 0 ||
           inputAmount > userBalance; // 输入金额不能超过余额
  }, [isConnected, isIaoActive, isStakeLoading, isIaoStarted, stakeAmount, balanceData]);

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
              className="font-medium text-[#F8C700] dark:text-yellow-400"
              onEnd={handleCountdownEnd}
            />
          </div>
        </div>

        {/* 进度条 - 暂时显示为 0，需要从链上获取实际数据 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              {t('raisedAmount')}: 0 BNB
            </span>
            <span className="font-medium text-[#F8C700] dark:text-yellow-400">
              0%
            </span>
          </div>
          <Progress value={0} className="h-2" />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{t('softCap')}: - BNB</span>
            <span>{t('hardCap')}: - BNB</span>
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

      {/* 投资表单 */}
      {!isIaoEnded && (
        <div className="relative p-4 sm:p-6 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
          {/* 刷新状态覆盖层 */}
          {isRefreshing && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t('updatingData')}</span>
              </div>
            </div>
          )}

          <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {t('youSend')}
          </h3>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="font-medium text-sm sm:text-base text-gray-700 dark:text-gray-300 min-w-fit">
              BNB
            </div>
            
            <div className="flex-1 w-full relative">
              <Input
                type="number"
                value={stakeAmount}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                min="0"
                step="any"
                className="pr-16 h-12 text-base border-gray-300 dark:border-gray-600 focus:border-[#F8C700] focus:ring-[#F8C700] dark:bg-gray-800"
                placeholder="0.00"
                disabled={!isIaoActive || isStakeLoading || !isConnected}
              />
              
              <button
                onClick={handleSetMaxAmount}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-bold text-[#F8C700] hover:bg-[#F8C700] hover:text-black rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#F8C700]"
                disabled={!isConnected || !isIaoActive || isStakeLoading}
              >
                {t('maxButton')}
              </button>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center justify-between">
            <span>{t('availableBalance')}:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {formattedBalance} BNB
            </span>
          </div>

          {/* 余额不足提示 */}
          {isConnected && stakeAmount && balanceData?.value && 
           Number(stakeAmount) > parseFloat(formatUnits(balanceData.value, balanceData.decimals)) && (
            <div className="text-xs text-red-500 dark:text-red-400 mb-4">
              ⚠️ {t('insufficientBalance') || '余额不足'}
            </div>
          )}

          <Button
            className="w-full h-12 text-base font-semibold transition-all hover:shadow-lg hover:opacity-90"
            style={{ 
              backgroundColor: !isConnected ? '#9ca3af' : '#F8C700', 
              borderColor: !isConnected ? '#9ca3af' : '#F8C700',
              color: 'black'
            }}
            onClick={handleStakeClick}
            disabled={isButtonDisabled}
          >
            {getButtonText()}
          </Button>
        </div>
      )}

      {/* 用户质押信息 */}
      {isConnected && userStakeInfo && Number(userStakeInfo.userDeposited || 0) > 0 && (
        <div className="relative p-4 sm:p-5 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800/30">
          {isRefreshing && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t('updatingData')}</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                {t('yourDepositedAmount')}
              </p>
              <p className="text-lg sm:text-xl font-bold text-[#F8C700] dark:text-yellow-400">
                {formatNumber(userStakeInfo.userDeposited || 0)} BNB
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* 提示信息 */}
      {!isConnected ? (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base text-yellow-800 dark:text-yellow-300 mb-1">
                {t('notice')}
              </p>
              <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-400">
                {t('connectWalletToParticipate')}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800/30">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base text-green-800 dark:text-green-300 mb-1">
                {t('walletConnected')}
              </p>
              <p className="text-xs sm:text-sm text-green-700 dark:text-green-400">
                {t('readyToParticipate')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
