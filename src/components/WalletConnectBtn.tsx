"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Wallet } from "lucide-react";
import { shortenAddress } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function WalletConnectBtn() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { authenticate } = useAuth();
  const t = useTranslations("Navbar");

  useEffect(() => {
    if (address && isConnected) {
      authenticate();
    }
  }, [address, isConnected, authenticate]);

  const handleConnect = () => {
    if (address) {
      open({ view: "Account" });
    } else {
      open({ view: "Connect" });
    }
  };

  return (
    <button
      onClick={handleConnect}
      className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10 text-gray-300 text-xs hover:border-gray-600 hover:text-[#F3BA2F] transition-colors"
    >
      <Wallet size={16} />
      <span>{address ? shortenAddress(address) : t("connectWallet")}</span>
    </button>
  );
}
