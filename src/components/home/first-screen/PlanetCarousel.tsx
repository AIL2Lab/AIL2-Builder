"use client";

import { useState, useEffect } from "react";
import { EthereumIcon } from "@/components/icons/Ethereum";
import { BnbIcon } from "@/components/icons/Bnb";
import { OkxIcon } from "@/components/icons/Okx";
import { MantleIcon } from "@/components/icons/Mantle";
import { GiwaIcon } from "@/components/icons/Giwa";
import useBreakpoint, { Breakpoint } from "@/hooks/useBreakpoint";
import { motion } from "motion/react";
interface DynamicIconProps {
  icon: React.ComponentType<any>;
  size?: number;
  fill?: string;
}
const DynamicIcon = ({ icon, ...props }: DynamicIconProps) => {
  const IconComponent = icon;
  return <IconComponent {...props} />;
};
export default function PlanetCarousel() {
  const breakpoint = useBreakpoint() as Breakpoint;

  const [activeIndex, setActiveIndex] = useState(0);

  const blockchains = [
    { name: "Ethereum", icon: EthereumIcon, offsetY: 50, size: 50 },
    { name: "BSC", icon: BnbIcon, offsetY: 25, size: 50 },
    { name: "GIWA", icon: GiwaIcon, offsetY: 0, size: 50 },
    { name: "XLayer", icon: OkxIcon, offsetY: 0, size: 60 },
    { name: "Base", icon: OkxIcon, offsetY: 25, size: 50 },
    { name: "Mantle", icon: MantleIcon, offsetY: 50, size: 50 },
  ];
  const stepMap: Record<Breakpoint, number> = {
    xs: 9,
    sm: 8,
    md: 10,
    lg: 4.8,
    xl: 6,
    "2xl": 6,
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % blockchains.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [blockchains.length]);
  const centerIndex = (blockchains.length - 1) / 2;
  const rotationStep = stepMap[breakpoint] || 0; // 每个图标之间的角度差，取决于圆的大小和图标间距，需微调
  const currentRotation = (activeIndex - centerIndex) * rotationStep;
  const circleSizeClass =
    "w-[800px] h-[800px] sm:w-[1600px] sm:h-[1600px] lg:w-[3200px] lg:h-[3200px]";
  const thickness = (breakpoint === 'xs' || breakpoint === 'sm') ? 4 : 8; 
  return (
    <div className="mt-20">
      <div className="w-full flex items-center justify-center my-10">
        <div className="w-full sm:w-[800px] xl:w-[1000px] flex justify-between px-5 sm:px-10">
          {blockchains.map((blockchain, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={blockchain.name}
                className="relative transition-all duration-500 ease-in-out flex flex-col items-center justify-center"
                style={{
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1.3 : 1,
                  top: isActive ? blockchain.offsetY - 10 : blockchain.offsetY,
                }}
              >
                {isActive && (
                  <div className="text-xs sm:text-sm md:text-base">
                    {blockchain.name}
                  </div>
                )}
                <div
                  className={`
                  relative w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-lg flex items-center justify-center
                  backdrop-blur-md transition-all duration-500
                  ${
                    isActive
                      ? "bg-theme/20 border border-theme/30"
                      : "bg-white/30 border border-white/50"
                  }
                `}
                >
                  {blockchain.name === "Base" ? (
                    <div
                      className={`w-5 h-5 lg:w-8 lg:h-8  rounded-xs ${
                        isActive ? "bg-theme" : "bg-white/30"
                      }`}
                    ></div>
                  ) : (
                    <DynamicIcon
                      icon={blockchain.icon}
                      size={
                        breakpoint === "xs" || breakpoint === "sm" ? 30 : 50
                      }
                      fill={isActive ? "var(--color-theme)" : ""}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full relative h-40 sm:h-60 md:h-80 lg:h-100 overflow-hidden">
        <div className="circle bg-background  w-[800px] h-[800px] sm:w-[1600px] sm:h-[1600px] lg:w-[3200px] lg:h-[3200px]"></div>
        <motion.div
          className={`absolute top-[50px] left-1/2 -translate-x-1/2 rounded-full ${circleSizeClass}`}
          animate={{ rotate: currentRotation }}
          transition={{ type: "spring", stiffness: 45, damping: 18, mass: 1.2 }}
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, rgba(252, 241, 192, 1) 0deg, rgba(255, 255, 255, 0) 11.63deg, rgba(255, 255, 255, 0) 348.37deg, rgba(252, 241, 192, 1) 360deg)`,
              maskImage: `radial-gradient(closest-side, 
              transparent calc(100% - ${thickness}px), 
              black calc(100% - ${thickness}px + 0.5px), 
              black calc(100% - 1px), 
              transparent 100%
            )`,
            WebkitMaskImage: `radial-gradient(closest-side, 
              transparent calc(100% - ${thickness}px), 
              black calc(100% - ${thickness}px + 0.5px), 
              black calc(100% - 1px), 
              transparent 100%
            )`,
            }}
          />
          <div className="absolute top-0 md:top-1 left-1/2 -translate-x-1/2 w-full h-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-6 h-6 md:w-8 md:h-8 flex justify-center items-center">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-theme rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
