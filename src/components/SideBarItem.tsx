"use client"; // 确保是客户端组件

import { useState } from "react";
import clsx from "clsx";
import { Link } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";

export const SideNavItem = ({
  item,
}: {
  item: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  if (hasChildren) {
    return (
      <li>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between py-5 text-left text-base font-medium"
        >
          {item.label}
          <ChevronDown
            className={clsx("h-5 w-5 transition-transform duration-300", {
              "rotate-180": isOpen,
            })}
          />
        </button>
        <div
          className={clsx(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[500px] opacity-100 pb-5" : "max-h-0 opacity-0"
          )}
        >
          <ul className="flex flex-col gap-3 pl-4 border-l border-white/20 ml-2">
            {item.children.map((subItem: any, subIdx: number) => (
              <li key={subIdx}>
                <Link
                  href={subItem.href}
                  className="block text-sm text-gray-300 hover:text-white"
                >
                  {subItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }
  return (
    <li className="py-5">
      <Link href={item.href} className="block text-base font-medium">
        {item.label}
      </Link>
    </li>
  );
};
