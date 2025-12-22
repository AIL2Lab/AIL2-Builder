"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { ChevronDown, Activity, Rocket, Sparkles, Zap, Cpu } from 'lucide-react';
interface NavItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
    description?: string;
    icon: string;
  }[];
}

interface NavDropdownProps {
  item: NavItem;
  locale: string;
}

const NavDropdown = ({ item, locale }: NavDropdownProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const checkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === `/${locale}`;
    }
    return (
      pathname === href ||
      pathname === `/${locale}${href}` ||
      pathname.startsWith(`/${locale}${href}/`)
    );
  };
  const hasChildren = item?.children && item?.children?.length > 0;
  if (!hasChildren) {
    return <Link href={item.href as any}>{item.label}</Link>;
  }
  const dropdownRef = useRef<HTMLDivElement>(null);
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
  const iconMap:any = {
    'Activity': <Activity className="text-theme" size={18}   />,
    'Rocket': <Rocket className="text-theme" size={18}   />,
    'Zap': <Zap className="text-theme" size={18}   />,
    'Cpu':<Cpu className="text-theme" size={18}  />,
    'Sparkles': <Sparkles className="text-theme" size={18} />
  }
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="cursor-pointer inline-flex items-center justify-center w-full text-base font-normal hover:text-gray-300 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          className={clsx(
            "-mr-1 ml-1 h-4 w-4 transition-transform duration-200",
            {
              "rotate-180": isOpen,
            }
          )}
        />
      </button>

      {isOpen && (
        // <div
        //   className="origin-top-right absolute left-1/2 -translate-x-1/2 mt-4 w-40 rounded-xl shadow-lg bg-[#1e1e1e] border border-white/10 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
        //   role="menu"
        //   aria-orientation="vertical"
        // >
        //   <div className="py-1">
        //     {item.children?.map((child, idx) => {
        //       const isActive = checkActive(child.href || "");
        //       return (
        //       <Link
        //         key={idx}
        //         href={child.href}
        //         onClick={() => setIsOpen(false)}
        //         className={`block px-4 py-2.5 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors text-center ${isActive ? 'text-theme':''}`}
        //         role="menuitem"
        //       >
        //         {child.label}
        //       </Link>
        //     )
        //     })}
        //   </div>
        // </div>
        <div className="absolute top-15 left-0 w-64 bg-neutral-900 border border-gray-800 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {
              item.children?.map((child, idx) => {
                const isActive = checkActive(child.href || "");
                return (
                  <Link
                  key={idx}
                  href={child.href}
                  className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group"
                >
                  {iconMap[child.icon]}
                  <div>
                    <div className={`text-sm font-bold  group-hover:text-brand-gold group-hover:text-theme ${isActive ? 'text-brand-gold text-theme':'text-white'}`}>
                      {child.label}
                    </div>
                    <div className="text-[10px] text-gray-500">{child.description}</div>
                  </div>
                </Link>
                )
              })
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
