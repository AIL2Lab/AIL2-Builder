"use client";

import { useState, useEffect } from "react";
import DocsSidebar from "./DocsSidebar";
import { Menu as MenuIcon } from "lucide-react"; 
// Using lucide-react Menu icon as seeing it in package.json, 
// though Menu.tsx used a custom Check if I should use that one.
// The user has lucide-react installed. 
import { CloseIcon } from "./icons/CloseIcon"; // maintain consistency if possible
import clsx from "clsx";

interface NavItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[];
}

export default function DocsMobileMenu({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
        document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden mb-8">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-white/80 hover:text-white border border-white/20 px-4 py-2 rounded-lg bg-white/5 w-full"
      >
        <MenuIcon className="w-5 h-5" />
        <span className="font-medium">Menu</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-background">
            <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-lg font-bold">Documentation</span>
                    <button onClick={() => setIsOpen(false)} className="p-2">
                        <CloseIcon />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <DocsSidebar 
                        items={items} 
                        className="w-full h-auto block" 
                        onItemClick={() => setIsOpen(false)}
                    />
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
