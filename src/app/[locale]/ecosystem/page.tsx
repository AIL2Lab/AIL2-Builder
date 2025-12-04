"use client";

import React, { useState } from "react";
import { Github, FileText, Menu, Globe, Twitter, Send, X } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Plant from "@/components/Plant";
import { TwitterIcon } from "@/components/icons/Twitter";

// --- Mock Data ---

const filterTags = [
  "All",
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

// Generate mock cards (12 items)
const ecosystemItems = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: "Depin X",
  // Make the second item (index 1) the "highlighted" one based on the image
  isHighlighted: i === 1,
  description:
    "Powered by a GPU miner network, AIL2 eliminates developer burdens in AI model deployment and maintenance.",
}));

export default function EcosystemPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <PageLayout isShowFooter>
      <div className="flex flex-col">
        <section className="mt-30 sm:mt-60">
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8">
              Explore <br />
              the AIL2 Ecosystem
            </h1>

            <div className="bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-2xl p-4 md:p-6 max-w-2xl backdrop-blur-sm">
              <p className="text-[#FFD700] text-sm md:text-base leading-relaxed">
                • A consolidated platform for the latest advancements in AI L2
                technology. <br />• A comprehensive repository of cutting-edge
                AI L2 initiatives.
              </p>
            </div>
          </div>
        </section>
        <div className="relative">
          <Plant rotate={-20} />
        </div>
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
        <section className="relative z-10 px-4 max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystemItems.map((item) => (
              <div
                key={item.id}
                className={`
                group p-6 rounded-2xl border transition-all duration-300 bg-[#0A0A0A]
                ${
                  item.isHighlighted
                    ? "border-[#FFD700]/80 shadow-[0_0_20px_rgba(255,215,0,0.05)]"
                    : "border-white/5 hover:border-white/10"
                }
              `}
              >
                {/* Card Header: Logo & Icons */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    {/* Simulated Logo Icon */}
                    <div
                      className={`w-8 h-8 rounded border flex items-center justify-center 
                    ${
                      item.isHighlighted
                        ? "border-[#FFD700] text-[#FFD700]"
                        : "border-white/20 text-white"
                    }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-5 h-5"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <span className="font-bold text-lg text-white">
                      DePIN <span className="font-light">X</span>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-md bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors">
                      <Globe size={14} />
                    </button>
                    <button className="p-1.5 rounded-md bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors">
                      <TwitterIcon size={14} fill="white" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <h3
                  className={`text-xl font-bold mb-3 ${
                    item.isHighlighted ? "text-[#FFD700]" : "text-white"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
