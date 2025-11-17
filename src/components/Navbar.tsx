import Link from "next/link";
import Logo from "./Logo";
import { Github } from "./icons/Github";
import { Document } from "./icons/document";
import Menu from "./Menu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("Navbar")
  return (
    <div className="w-full sticky flex items-center justify-center top-6 md:top-12 z-50">
      <nav className="items-center hidden md:grid grid-cols-2 bg-[#121212] relative h-[84px] rounded-2xl">
        <div className="flex col-span-1 items-center pr-20 space-x-4 lg:space-x-6 xl:space-x-12">
            <div className="text-base font-normal ml-5 lg:ml-10">
              <Link href="/">{t("research")}</Link>
            </div>
            <div className="text-base font-normal md:red">
              <Link href="/">{t("ecosystem")}</Link>
            </div>
            <div className="text-base font-normal">
              <Link href="/">{t("learn")}</Link>
            </div>
        </div>
        <div className="flex col-span-1 items-center pl-20 space-x-4 lg:space-x-6 xl:space-x-12">
          <div className="text-base font-normal">
              <Link href="/">{t("blog")}</Link>
            </div>
            <div className="text-base font-normal flex flex-1 justify-end ml-4 lg:ml-8">
              <Link href="/" className="github-icon">
                <Github />
              </Link>
              <Link href="/" className="document-icon ml-2.5">
                <Document />
              </Link>
              <LanguageSwitcher className="ml-6 mr-4 lg:ml-10 lg:mr-6" />
            </div>
        </div>
        <Logo className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </nav>
      {/* mobile menu */}
      <nav className="w-full flex items-center justify-between md:hidden px-6">
        <div className="flex-1">
          <Menu />
        </div>
        <Logo size="small" />
        <div className="flex-1 flex justify-end">
          <Link href="/" className="bg-white/10 justify-center items-center rounded-xl px-2.5  hidden sm:flex">
            <Github />
          </Link>
          <Link href="/" className="bg-white/10 justify-center items-center rounded-xl px-2.5  mx-2.5 hidden sm:flex">
            <Document />
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
}
