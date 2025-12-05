"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import clsx from "clsx";
import { localeLabels, shortLocaleLabels } from "@/i18n/locales";
import { ChevronDown } from "lucide-react";
const LanguageSwitcherSelect = ({className}: {className?:string}) => {
  const locale = useLocale();
  console.log(locale);
  
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams()
  
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
          className="cursor-pointer inline-flex justify-center w-full rounded-md px-4 py-2 bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded="true"
          aria-haspopup="true"
        >
          {shortLocaleLabels[currentLanguage]}
          <ChevronDown size={20}/>
        </button>
      </div>
      {isOpen && (
        <div
          className="w-full origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white/10 ring-opacity-5 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1" role="none">
            {routing.locales.map((lang, idx) => (
              <button
                key={idx}
                onClick={() => handleLanguageChange(lang)}
                className={`cursor-pointer block w-full text-left px-4 py-2 text-sm hover:bg-black/30`}
                role="menuitem"
              >
                {localeLabels[lang]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcherSelect;
