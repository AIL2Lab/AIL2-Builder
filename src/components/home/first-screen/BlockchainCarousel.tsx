"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { TelegramIcon } from "@/components/icons/Telegram";

export const BlockchainCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const blockchains = [
    { name: "Ethereum", icon: "/ethereum-icon.svg", color: "#627EEA", offsetY: 40, },
    { name: "BSC", icon: "/bsc-icon.svg", color: "#F0B90B", offsetY: 20, },
    { name: "GIWA", icon: "/giwa-icon.svg", color: "#00D4FF", offsetY: 0,},
    { name: "XLayer", icon: "/xlayer-icon.svg", color: "#FF6B6B", offsetY: 0 },
    { name: "Base", icon: "/base-icon.svg", color: "#0052FF", offsetY: 20 },
    { name: "Mantle", icon: "/mantle-icon.svg", color: "#7B3FF2", offsetY: 40 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % blockchains.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, [blockchains.length]);
  return (
    <div className="w-full flex items-center justify-center my-10">
      <div className="w-full lg:w-[800px] flex justify-between px-5 sm:px-10">
        {blockchains.map((blockchain, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={blockchain.name}
              className="relative transition-all duration-500 ease-in-out flex flex-col items-center justify-center"
              style={{
                opacity: isActive ? 1 : 0.3,
                scale: isActive ? 1.3 : 1,
                top: isActive ? blockchain.offsetY - 10 : blockchain.offsetY 
              }}
            >
                { isActive && <div className="text-xs sm:text-sm md:text-base">{blockchain.name}</div>}
              <div
                  className={`
                  relative w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center
                  backdrop-blur-md transition-all duration-500
                  ${
                    isActive
                      ? "bg-theme/20 border border-theme/30"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }
                `}
                >
                  <TelegramIcon fill={isActive ? "var(--color-theme)" : ''} />
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
