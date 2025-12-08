'use client'
import { useTranslations } from "next-intl";
import { useState } from "react";



export default function TagFilter() {
  const t = useTranslations("Common")
  const [activeFilter, setActiveFilter] = useState("All");
  const filterTags = [
    t("all"),
    "AI - Compute & Execution",
    "AI - Agents",
    "AI - Apps",
    "AI - Inference & Models",
    "DeFi",
    "AI - Training",
    "AI - Data & Dataset",
    "L1/L2",
    "Interoperability",
    "Gaming",
    "Community",
    "Depin",
    "Launchpad",
  ];
  return (
    <section className="relative z-10 px-4 max-w-6xl mx-auto mb-16 sm:-top-10 mt-10 sm:mt-0">
      <div className="flex flex-wrap justify-center gap-3">
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`
                px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 border
                ${
                  activeFilter === tag
                    ? "bg-[#FFD700]/10 border-[#FFD700] text-[#FFD700]"
                    : "bg-white/5 border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10"
                }
              `}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}
