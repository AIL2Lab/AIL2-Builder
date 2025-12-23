"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { ChevronDown, Sparkles, Zap, Cpu } from 'lucide-react';
interface NavItem {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  children?: {
    label: string;
    description?: string;
    icon?: React.ReactNode;
    href: string;
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
    if (!href) return false;
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const hasChildren = item?.children && item?.children?.length > 0;
  const isChildActive = hasChildren && item.children?.some((child) => checkActive(child.href));
  
  if (!hasChildren) {
    const isActive = checkActive(item.href || "");
    return (
      <Link 
        href={item.href as any}
        className={clsx(
          "hover:text-[#F3BA2F] text-sm font-medium transition-colors h-20 flex items-center",
          isActive ? "text-[#f3ba2f]" : "text-gray-300"
        )}
      >
        {item.label}
      </Link>
    )
  }
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close when clicking outside
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

  const iconMap: any = {
    'Zap': <Zap size={18} />,
    'Cpu': <Cpu size={18} />,
    'Sparkles': <Sparkles size={18} />
  };

  return (
    <div 
      className="relative h-full flex items-center" 
      ref={dropdownRef}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={clsx(
          "cursor-pointer flex items-center gap-1 text-sm font-medium transition-colors h-20 outline-none",
          (isOpen || isChildActive) ? "text-[#F3BA2F]" : "text-gray-300 hover:text-[#F3BA2F]"
        )}
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          className={clsx("h-3.5 w-3.5 transition-transform duration-200", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      {isOpen && (
        <div
          className="origin-top-left absolute top-16 left-0 mt-2 w-64 rounded-2xl shadow-2xl bg-[#0A0A0A] border border-white/10 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          role="menu"
          aria-orientation="vertical"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-2 space-y-1">
            {item.children?.map((child, idx) => {
              const isActive = checkActive(child.href || "");
              return (
                <Link
                  key={idx}
                  href={child.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group",
                    isActive ? "bg-white/5" : ""
                  )}
                  role="menuitem"
                >
                  {child.icon && iconMap[child.icon as string] && (
                    <div className={clsx(
                      "flex-shrink-0 transition-colors",
                      isActive ? "text-[#F3BA2F]" : "text-[#F3BA2F] group-hover:text-white"
                    )}>
                      {iconMap[child.icon as string]}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className={clsx(
                      "text-sm font-bold transition-colors text-left",
                      isActive ? "text-[#F3BA2F]" : "text-white group-hover:text-[#F3BA2F]"
                    )}>
                      {child.label}
                    </span>
                    {child.description && (
                      <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors text-left">
                        {child.description}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
