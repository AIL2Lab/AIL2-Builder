"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Link } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { usePathname } from "@/i18n/navigation";
interface NavItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[]
}

interface NavDropdownProps {
  item: NavItem;
  locale: string;
}

const NavDropdown = ({item, locale }: NavDropdownProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const checkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === `/${locale}`;
    }
    return pathname === href || pathname === `/${locale}${href}` || pathname.startsWith(`/${locale}${href}/`);
  };
  const hasChildren = item?.children && item?.children?.length > 0;
  if(!hasChildren) {
    return (
      <Link href={item.href as any}>{item.label}</Link>
    )
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
          className={clsx("-mr-1 ml-1 h-4 w-4 transition-transform duration-200", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute left-1/2 -translate-x-1/2 mt-4 w-40 rounded-xl shadow-lg bg-[#1e1e1e] border border-white/10 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            {item.children?.map((child, idx) => {
              const isActive = checkActive(child.href || "");
              return (
              <Link
                key={idx}
                href={child.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors text-center ${isActive ? 'text-theme':''}`}
                role="menuitem"
              >
                {child.label}
              </Link>
            )
            })}
          </div>
        </div>
      )}
    </div>
  );
  
};

export default NavDropdown;