"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";

interface NavItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  title: string;
  items: NavItem[];
  className?: string;
}

const NavDropdown = ({ title, items, className }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭菜单，与 LanguageSwitcher 逻辑一致
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
      <button
        type="button"
        // 这里去掉了 bg-white/10，因为导航栏本身有背景，文字保持透明背景更自然
        // 如果需要背景色，可以加上 bg-white/10
        className="cursor-pointer inline-flex items-center justify-center w-full text-base font-normal hover:text-gray-300 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
        {/* 下拉小箭头图标 */}
        <svg
          className={clsx("-mr-1 ml-1 h-4 w-4 transition-transform duration-200", {
            "rotate-180": isOpen
          })}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute left-1/2 -translate-x-1/2 mt-4 w-40 rounded-xl shadow-lg bg-[#1e1e1e] border border-white/10 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            {items.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setIsOpen(false)} // 点击链接后关闭菜单
                className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors text-center"
                role="menuitem"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;