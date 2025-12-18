// --- START OF FILE useAuth.ts ---

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { apiClient } from '@/lib/api-client';
import { useTranslations } from 'next-intl';
import { useDisconnect } from 'wagmi';
import { atom, useAtom, useSetAtom } from 'jotai';
import { errorAtom, isAuthenticatedAtom, isLoadingAtom, lastAuthAddressAtom, resetAuthAtom } from '@/store/auth';
import { getToken } from '@/lib/utils';


export function useAuth() {
  const { address, isConnected, status } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const t = useTranslations();

  // Jotai Hooks
  const [isAuthenticated, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isLoading, setLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [lastAuthAddress, setLastAuthAddress] = useAtom(lastAuthAddressAtom);
  const reset = useSetAtom(resetAuthAtom);

  // 本地状态
  const [connectAttempts, setConnectAttempts] = useState(0);
  const maxConnectAttempts = 3;

  // Refs
  const prevAddressRef = useRef<string | undefined>(undefined);
  
  // 优化防抖：使用 ref 存储最新的 authenticate 函数，避免闭包陷阱
  const authenticateRef = useRef<() => Promise<void>>();

  // --- 核心逻辑 ---

  const checkToken = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) return false;
      
      apiClient.setToken(token);
      
      // 尝试简单验证，避免重型请求
      try {
        const user = await apiClient.getUserProfile();
        if (user?.address) return true;
      } catch (err) {
        // 静默失败，仅打印日志
        console.warn('Token validation failed:', err);
      }
      return false;
    } catch (error) {
      console.error('Token check error:', error);
      localStorage.removeItem('token');
      apiClient.clearToken();
      return false;
    }
  }, []);

  const authenticate = useCallback(async () => {
    // 基础校验
    if (!address || !isConnected || status !== 'connected' || isLoading) {
      return;
    }

    // 防止重复认证
    if (isAuthenticated && address.toLowerCase() === lastAuthAddress?.toLowerCase()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. 检查现有 Token
      const hasValidToken = await checkToken();
      if (hasValidToken) {
        setAuthenticated(true);
        setLastAuthAddress(address);
        setLoading(false);
        return;
      }

      const formattedAddress = address.toLowerCase();

      // 2. 执行登录 (无签名模式)
      try {
        const { token } = await apiClient.connectWalletNoSig({
          address: formattedAddress
        });

        // 登录成功处理
        localStorage.setItem('token', token);
        apiClient.setToken(token);

        setLastAuthAddress(address);
        setAuthenticated(true);
        setConnectAttempts(0); // 重置重试计数
      } catch (err: any) {
        console.error('Wallet connect error:', err);
        
        const newAttempts = connectAttempts + 1;
        setConnectAttempts(newAttempts);

        // 特定错误的自动重试逻辑
        if (err?.message?.includes('Restore will override. subscription') && newAttempts < maxConnectAttempts) {
          console.log(`Subscription conflict detected, retrying (${newAttempts}/${maxConnectAttempts})...`);
          
          setTimeout(() => {
            setError(null);
            setLoading(false);
            // 调用 Ref 中最新的函数引用
            authenticateRef.current?.();
          }, 1000);
          return;
        }

        // 失败处理
        throw err; // 抛出给外层 catch 处理通用错误
      }
    } catch (err: any) {
      console.error('Authentication final failure:', err);
      localStorage.removeItem('token');
      apiClient.clearToken();
      reset();
      disconnect();
      setError(err instanceof Error ? err.message : t('messages.authenticationFailed'));
    } finally {
      // 如果不是在重试中，才关闭 loading
      // 注意：上面的重试逻辑直接 return 了，所以这里只会处理非重试的情况
      setLoading(false);
    }
  }, [
    address, isConnected, status, isLoading, isAuthenticated, lastAuthAddress,
    checkToken, connectAttempts, setAuthenticated, setError, setLastAuthAddress, setLoading, 
    reset, disconnect, t
  ]);

  // 更新 ref 以供防抖函数调用
  useEffect(() => {
    authenticateRef.current = authenticate;
  }, [authenticate]);

  // --- 防抖调用 ---
  // 创建一个稳定的防抖函数，内部始终调用最新的 authenticateRef
  const debouncedAuthenticate = useCallback(() => {
    const handler = setTimeout(() => {
      authenticateRef.current?.();
    }, 300);
    return () => clearTimeout(handler);
  }, []); // 依赖为空，确保该函数引用稳定

  // 触发防抖执行的 Wrapper（用于外部调用）
  const triggerAuthenticate = useCallback(() => {
    // 这里我们简单地执行上面的逻辑，实际防抖通常需要保存 timer id
    // 由于 React hooks 的限制，我们使用一个更简单的实现：
    // 当需要调用时，设置一个 timeout，并清除上一个 (useRef存储timer)
    if (authenticateTimerRef.current) {
      clearTimeout(authenticateTimerRef.current);
    }
    authenticateTimerRef.current = setTimeout(() => {
      authenticateRef.current?.();
    }, 300);
  }, []);
  
  const authenticateTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- 副作用监听 ---

  // 1. 网络/账户切换监听
  useEffect(() => {
    const isNetworkSwitch = 
      isAuthenticated && 
      address && 
      isConnected && 
      prevAddressRef.current && 
      address.toLowerCase() !== prevAddressRef.current.toLowerCase();

    if (isNetworkSwitch) {
      console.log('Network/Account switch detected, re-authenticating...');
      localStorage.removeItem('token');
      apiClient.clearToken();
      triggerAuthenticate();
    }
    
    if (address) {
        prevAddressRef.current = address;
    }
  }, [address, isAuthenticated, isConnected, triggerAuthenticate]);

  // 2. 页面可见性检查
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated) {
        checkToken().catch(() => {
          console.log('Visibility check failed, re-authenticating');
          triggerAuthenticate();
        });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isAuthenticated, checkToken, triggerAuthenticate]);

  // 3. 断开连接清理
  useEffect(() => {
    if (!isConnected) {
      // 只有当真正断开且之前是已认证状态时才清理，避免初始化时的闪烁
      if (isAuthenticated || localStorage.getItem('token')) {
          console.log('Wallet disconnected, clearing session');
          localStorage.removeItem('token');
          apiClient.clearToken();
          reset();
      }
    }
  }, [isConnected, isAuthenticated, reset]);

  // Logout 函数
  const logout = useCallback(async () => {
    try {
      await apiClient.disconnect();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('token');
      apiClient.clearToken();
      reset();
      // 选择性：是否断开钱包连接？通常 Logout 意味着清除应用状态
      // disconnect(); 
    }
  }, [reset]);

  return {
    isAuthenticated,
    isLoading,
    error,
    authenticate: triggerAuthenticate, // 对外暴露防抖后的函数
    logout,
  };
}