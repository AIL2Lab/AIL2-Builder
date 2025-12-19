"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[];
}

interface DocsSidebarProps {
  items: NavItem[];
}

export default function DocsSidebar({ items }: DocsSidebarProps) {
  // Simple active state tracking for demo purposes. 
  // In a real one-page docs, this would be a scroll spy.
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
     if (typeof window !== 'undefined') {
         const hash = window.location.hash;
         if (hash) setActiveId(hash);
         else setActiveId(items[0]?.children?.[0]?.href || "");
     }
  }, [items]);

  return (
    <aside className="docs-sidebar hidden md:block w-[280px] sticky top-[120px] h-[calc(100vh-160px)] overflow-y-auto shrink-0">
      {items.map((section, idx) => (
        <div key={idx} className="sidebar-section mb-8">
          <h4 className="text-sm uppercase tracking-[0.1em] text-theme mb-4 font-bold">
            {section.label}
          </h4>
          <ul className="flex flex-col">
            {section.children?.map((child, childIdx) => {
              const isActive = activeId === child.href;
              return (
                <Link
                  key={childIdx}
                  href={child.href}
                  onClick={() => setActiveId(child.href)}
                  className={clsx(
                    "sidebar-link block py-2 text-[0.9375rem] transition-colors",
                    isActive
                      ? "text-white font-semibold border-l-2 border-theme pl-[12px] -ml-[14px]"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  {child.label}
                </Link>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
