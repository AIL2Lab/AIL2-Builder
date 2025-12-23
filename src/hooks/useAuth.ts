// --- START OF FILE useAuth.ts ---

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { useTranslations } from "next-intl";
import { useDisconnect } from "wagmi";
import { atom, useAtom, useSetAtom } from "jotai";
import {
  errorAtom,
  isAuthenticatedAtom,
  isLoadingAtom,
  lastAuthAddressAtom,
  resetAuthAtom,
} from "@/store/auth";
import { clearToken, getToken, setToken } from "@/lib/utils";
import { debounce } from "lodash-es";
import { getUserProfile } from "@/services/user.service";
import { connectWalletNoSig } from "@/services/wallet.service";

export function useAuth() {
  const { address, isConnected, status } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const t = useTranslations();
  
  const [isAuthenticated, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isLoading, setLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [lastAuthAddress, setLastAuthAddress] = useAtom(lastAuthAddressAtom);
  const reset = useSetAtom(resetAuthAtom);

  const [connectAttempts, setConnectAttempts] = useState(0);
  const maxConnectAttempts = 3;
  const prevAddressRef = useRef<string | undefined>(undefined);

  const checkToken = useCallback(async () => {
    try {
      const response = await getUserProfile();
      if (response?.data && response?.data?.address) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      clearToken();
      return false;
    }
  }, []);
  const authenticate = useCallback(async () => {
    console.log('address', address);
    console.log('isConnected', isConnected);
    console.log('status', status);
    if (!address || !isConnected || status !== "connected" || isLoading) {
      return;
    }
    if (
      isAuthenticated &&
      address.toLowerCase() === lastAuthAddress?.toLowerCase()
    ) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      let hasValidToken = false;
      
      if (token) {
        hasValidToken = await checkToken();
      }
      console.log('hasValidToken',hasValidToken);
      
      if (hasValidToken) {
        setAuthenticated(true);
        setLastAuthAddress(address);
        setLoading(false);
        return;
      }

      const formattedAddress = address.toLowerCase();
      try {
        const {data} = await connectWalletNoSig({
          address: formattedAddress
        });
        const token = data?.token
        setToken(token as string)
        setLastAuthAddress(address);
        setAuthenticated(true);
      } catch (error) {
        
      }
    } catch (error) {
      clearToken();
      reset();
      disconnect();
      setError("authentication failed");
    } finally {
      setLoading(false);
    }
  }, [address,isConnected,status,isLoading,isAuthenticated,lastAuthAddress,checkToken,setAuthenticated,setLoading,setError,setLastAuthAddress,reset,clearToken]);
  const debouncedAuthenticate = useMemo(
    () => debounce(authenticate, 300),
    [authenticate]
  );
  useEffect(() => {
    if (
      isAuthenticated &&
      address &&
      isConnected &&
      prevAddressRef.current &&
      address.toLowerCase() !== prevAddressRef.current.toLowerCase()
    ) {
      clearToken();
      // Re-authentication
    }
  }, [address, isAuthenticated, isConnected, debouncedAuthenticate]);
  useEffect(() => {
    if (!isConnected) {
      clearToken();
      reset();
    }
  }, [isConnected, reset]);
  const logout = useCallback(async () => {
    clearToken();
    reset();
  }, [reset]);

  return {
    isAuthenticated,
    isLoading,
    error,
    authenticate: debouncedAuthenticate, // 对外暴露防抖后的函数
    logout,
  };
}
