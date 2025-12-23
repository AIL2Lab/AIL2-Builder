"use client";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import { Github } from "./icons/Github";
import { Document } from "./icons/document";
import Menu from "./Menu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig, getNavbarConfig } from "@/config/site";
import { NavbarLeft, NavbarRight } from "./NavbarComponents";

export default function Navbar() {
  const t = useTranslations("Navbar")
  const locale = useLocale()
  const {navbarLeft, navbarRight, allNavbar} = getNavbarConfig(t)
  
  return (
    <div className="w-full sticky flex items-center justify-center top-0 z-50">
      <nav className="w-full bg-black/80 backdrop-blur-md border-b border-white/5 h-20 hidden md:flex items-center justify-between px-6">
        <div className="flex items-center">
            <NavbarLeft items={navbarLeft} />
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
            <Logo />
        </div>

        <div className="flex items-center">
            <NavbarRight items={navbarRight} />
        </div>
      </nav>
      {/* mobile menu */}
      <nav className="w-full flex items-center justify-between md:hidden px-2.5 h-20 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="flex-1">
          <Menu data={allNavbar} />
        </div>
        <Logo size="small" className="!static !translate-x-0 !translate-y-0" />
        <div className="flex-1 flex justify-end">
          <Link href={siteConfig.githubUrl} target="_blank" className="bg-white/10 justify-center items-center rounded-xl px-2.5 hidden sm:flex h-9 w-9">
            <Github />
          </Link>
          <Link href="/docs" className="bg-white/10 justify-center items-center rounded-xl px-2.5 mx-2.5 hidden sm:flex h-9 w-9">
            <Document />
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
}
