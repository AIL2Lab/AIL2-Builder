"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import NavDropdown from "./NavDropdown";
import { siteConfig } from "@/config/site";
import { Github, FileText, ChevronDown } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import WalletConnectBtn from "./WalletConnectBtn";

interface NavbarLeftProps {
  items: any[];
}

export const NavbarLeft = ({ items }: NavbarLeftProps) => {
  const locale = useLocale();
  return (
    <div className="flex items-center gap-8">
      {items.map((item, idx) => (
        <div key={idx}>
          <NavDropdown locale={locale} item={item} />
        </div>
      ))}
    </div>
  );
};

interface NavbarRightProps {
  items: any[];
}

export const NavbarRight = ({ items }: NavbarRightProps) => {
  const locale = useLocale();
  return (
    <div className="flex items-center gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="mr-4">
          <NavDropdown locale={locale} item={item} />
        </div>
      ))}
      <Link 
        href={siteConfig.githubUrl} 
        target="_blank" 
        className="p-2 bg-white/5 rounded-lg border border-white/10 text-[#F3BA2F] hover:border-[#F3BA2F] transition-colors"
      >
        <Github size={18} />
      </Link>
      <Link 
        href="/docs" 
        className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-300 hover:text-[#F3BA2F] hover:border-[#F3BA2F] transition-colors"
      >
        <FileText size={18} />
      </Link>
      <WalletConnectBtn />
      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10 text-gray-300 text-xs hover:border-gray-600 transition-colors">
        <LanguageSwitcher />
      </div>
    </div>
  );
};
