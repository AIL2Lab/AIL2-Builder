"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TwitterIcon } from "@/components/icons/Twitter";
import { Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AizelNetwork_logo from "@/assets/images/Partners_AizelNetwork_logo.png";
import AltLayer_logo from "@/assets/images/Partners_AltLayer_logo.svg";
import Alchemy_logo from "@/assets/images/Partners_Alchemy_logo.svg";
export default function TagFilter() {
  const t = useTranslations("Common");
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
    "Others",
    "Depin",
    "Launchpad",
  ];
  const ecosystemItems = [
    {
      title: "Aizel Network",
      logo: (
        <Image
          src={AizelNetwork_logo}
          alt="AizelNetwork_logo"
          className="w-1/2"
        />
      ),
      url: "https://aizelnetwork.com",
      twitter: "https://x.com/aizel_network",
      description:
        "Aizel Network is the fastest and most scalable modular network dedicated to verifiable and private intelligence.",
      types: [t("all"), "AI - Compute & Execution", "AI - Agents", "AI - Inference & Models", ],
    },
    {
      title: "AltLayer",
      logo: <Image src={AltLayer_logo} alt="AltLayer_logo" />,
      url: "https://altlayer.io",
      twitter: "https://x.com/alt_layer",
      description:
        "AltLayer is a Rollups as a Service provider for Web3. They offer Restaked Rollups and Rollups as a Service to accelerate scaling for Web3 applications. AltLayer is backed by prominent investors and has collaborated with various projects in the blockcha...",
      types: [t("all"), "Others"],
    },
    {
      title: "Alchemy",
      logo: <Image src={Alchemy_logo} alt="Alchemy_logo" className="w-1/2" />,
      url: "https://www.alchemy.com",
      twitter: "https://x.com/Alchemy",
      description:
        "Alchemy is a web3 development platform that provides a powerful set of web3 APIs for building and scaling decentralized applications. It offers services such as NFT APIs, webhooks, blockchain connections, subgraphs, and token APIs, making it faster, more reliable, and scalable than other solutions. Alchemy empowers companies to build decentralized applications without managing blockchain infrastructure in-house, with top projects like Augur, Cryptokitties, and OpenSea relying on its services.",
      types: [t("all"), "Others"],
    },
  ];
  const filterItems = ecosystemItems.filter((item) =>
    item.types?.includes(activeFilter)
  );
  return (
    <>
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
          {filterItems.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col p-6 rounded-2xl border transition-all duration-300 bg-[#0A0A0A] border-white/5 hover:border-theme/80 "
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">{item.logo}</div>
                <div className="flex gap-2">
                  <Link
                    href={item.url}
                    className="p-1.5 rounded-md bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors"
                  >
                    <Globe size={14} />
                  </Link>
                  <Link
                    href={item.twitter}
                    className="p-1.5 rounded-md bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors"
                  >
                    <TwitterIcon size={14} fill="white" />
                  </Link>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 overflow-hidden grow">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
