"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import clsx from "clsx";
import { localeMap } from "@/i18n/locales";
import { ChevronDown } from "lucide-react";
const LanguageSwitcherSelect = ({className}: {className?:string}) => {
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const params = useParams();
  
  const currentLanguage =
    routing.locales.find((lang) => lang === locale) || routing.locales[0];
  
  const handleLanguageChange = (newLocale: string) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params},
      { locale: newLocale, scroll: false }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={clsx("relative inline-block text-left", className)} ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="cursor-pointer inline-flex items-center justify-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span className={`fi fi-${localeMap[currentLanguage].flag.toLowerCase()}`} />
          {localeMap[currentLanguage].label}
          <ChevronDown size={20}/>
        </button>
      </div>
      {isOpen && (
        <div
          className="w-32 origin-top-right absolute right-0 mt-4 rounded-xl shadow-lg bg-[#0A0A0A] border border-white/10 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="p-1" role="none">
            {routing.locales.map((lang, idx) => (
              <button
                key={idx}
                onClick={() => handleLanguageChange(lang)}
                className={`cursor-pointer block w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors`}
                role="menuitem"
              >
                <span className={`fi fi-${localeMap[lang].flag.toLowerCase()}`} />
                {localeMap[lang].label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcherSelect;
