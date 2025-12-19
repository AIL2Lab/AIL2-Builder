"use client";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import { Github } from "./icons/Github";
import { Document } from "./icons/document";
import Menu from "./Menu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig, getNavbarConfig } from "@/config/site";
import NavDropdown from "./NavDropdown";
import { usePathname } from "@/i18n/navigation";

export default function Navbar() {
  const t = useTranslations("Navbar")
  const locale = useLocale()
  const {navbarLeft, navbarRight, allNavbar} = getNavbarConfig(t)
  const pathname = usePathname();
  const checkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === `/${locale}`;
    }
    return pathname === href || pathname === `/${locale}${href}` || pathname.startsWith(`/${locale}${href}/`);
  };
  return (
    <div className="w-full sticky flex items-center justify-center top-6 md:top-12 z-50">
      <nav className="items-center hidden md:grid grid-cols-2 bg-[#121212] relative h-[84px] rounded-2xl">
        <div className="flex col-span-1 items-center pr-20 space-x-4 lg:space-x-6 xl:space-x-12">
            {
              navbarLeft.map((item,idx) => {
                const isActive = checkActive(item.href || "");
                return (
                <div key={idx} className={`${idx === 0 ? 'ml-5 lg:ml-10' : ''} text-base font-normal ${isActive? 'text-theme' : ''}`}>
                  <NavDropdown locale={locale} item={item} />
                </div>
              )
              })
            }
        </div>
        <div className="flex col-span-1 items-center pl-20 space-x-4 lg:space-x-6 xl:space-x-12">
            {
              navbarRight.map((item,idx) => {
                const isActive = checkActive(item.href || "");
                return (
                <div key={idx} className={`text-base font-normal ${isActive? 'text-theme' : ''}`}>
                  <NavDropdown locale={locale} item={item} />
                </div>
              )
              })
            }
            <div className="text-base font-normal flex flex-1 justify-end ml-4 lg:ml-8">
              <Link href={siteConfig.githubUrl} target="_blank" className="github-icon">
                <Github />
              </Link>
              <Link href="/docs" className="document-icon ml-2.5">
                <Document />
              </Link>
              <LanguageSwitcher className="ml-6 mr-4 lg:ml-10 lg:mr-6" />
            </div>
        </div>
        <Logo className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </nav>
      {/* mobile menu */}
      <nav className="w-full flex items-center justify-between md:hidden px-2.5">
        <div className="flex-1">
          <Menu data={allNavbar} />
        </div>
        <Logo size="small" />
        <div className="flex-1 flex justify-end">
          <Link href="/" className="bg-white/10 justify-center items-center rounded-xl px-2.5  hidden sm:flex">
            <Github />
          </Link>
          <Link href="/docs" className="bg-white/10 justify-center items-center rounded-xl px-2.5  mx-2.5 hidden sm:flex">
            <Document />
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
}
