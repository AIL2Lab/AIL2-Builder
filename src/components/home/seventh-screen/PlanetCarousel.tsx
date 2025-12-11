"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { 
  Box, 
  Component, 
  Cpu, 
  Layers, 
  Aperture, 
  Disc 
} from "lucide-react";

// --- 工具函数 ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 数据 ---
const items = [
  { id: 1, name: "Ethereum", icon: <Box className="w-6 h-6" /> },
  { id: 2, name: "BSC", icon: <Component className="w-6 h-6" /> },
  { id: 3, name: "Polygon", icon: <Cpu className="w-6 h-6" /> },
  { id: 4, name: "Arbitrum", icon: <Layers className="w-6 h-6" /> },
  { id: 5, name: "GIWA", icon: <Aperture className="w-6 h-6" /> },
  { id: 6, name: "Optimism", icon: <Disc className="w-6 h-6" /> },
];

export default function PlanetCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  // 计算旋转角度
  // 假设总圆很大，图标之间的物理距离对应到角度大约是 4度左右
  // 我们以中间为 0度，计算偏移量
  const centerIndex = (items.length - 1) / 2;
  const rotationStep = 4; // 每个图标之间的角度差，取决于圆的大小和图标间距，需微调
  const currentRotation = (activeIndex - centerIndex) * rotationStep;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center font-sans">
      {/* --- 核心动画区域 --- */}
      <div className="relative w-full max-w-5xl h-[300px] flex justify-center">
        
        {/* 1. 图标层 (Static Layout) */}
        <div className="absolute top-0 z-30 flex gap-8 md:gap-14 items-end justify-center px-10">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={item.id} 
                className="relative flex flex-col items-center gap-5 cursor-pointer group w-16"
                onClick={() => setActiveIndex(index)}
              >
                {/* 悬浮文字 */}
                <div className="h-6 absolute -top-10 w-[200px] flex justify-center">
                  <AnimatePresence mode="popLayout">
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-sm text-gray-200 font-medium tracking-wide"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* 图标容器 */}
                <div 
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border",
                    isActive 
                      ? "bg-yellow-500/10 border-yellow-500/60 shadow-[0_0_40px_-10px_rgba(234,179,8,0.6)] scale-110" 
                      : "bg-white/5 border-white/5 text-gray-600 hover:border-white/20 hover:text-gray-400"
                  )}
                >
                  <div className={cn("transition-colors duration-500", isActive ? "text-yellow-400" : "text-current")}>
                    {item.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. 星球轨道系统 */}
        {/* 为了形成超大弧度，我们创建一个极其巨大的圆，并向下偏移 */}
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            
            {/* 2.1 基础灰色轨道 (静止) */}
            <div className="w-[200vw] h-[200vw] rounded-full border border-white/10 opacity-60"></div>

            {/* 2.2 动态旋转层 (包含光点 + 高亮金线) */}
            <motion.div 
                className="absolute inset-0 w-[200vw] h-[200vw] rounded-full flex justify-center"
                animate={{ rotate: currentRotation }}
                transition={{ type: "spring", stiffness: 45, damping: 18, mass: 1.2 }}
            >
                {/* 定位在圆的最顶端 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[100px] -mt-[1px]">
                    
                    {/* A. 补充的高亮圆弧 (Highlighted Arc) */}
                    {/* 
                       原理：一个同样巨大的圆的顶部边框，切成一小段。
                       或者更简单：直接在这个容器画一条横线，利用 flex 和 transform 弯曲?
                       最佳方案：在这个旋转容器内，放一个跟父级一样大的圆，带黄色边框，
                       然后用 mask-image 把两边裁掉，只保留中间一段。
                    */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] h-[200vw] rounded-full border-t-[3px] border-yellow-500/80"
                         style={{
                             maskImage: 'linear-gradient(to right, transparent 40%, black 50%, transparent 60%)',
                             WebkitMaskImage: 'linear-gradient(to right, transparent 40%, black 50%, transparent 60%)'
                         }}
                    />

                    {/* B. 发光光点 (Orb) */}
                    {/* 绝对居中于顶端 */}
                    <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 flex items-center justify-center">
                        {/* 核心亮点 */}
                        <div className="w-3 h-3 bg-[#FFF7D6] rounded-full shadow-[0_0_20px_4px_rgba(234,179,8,1)] z-20" />
                        {/* 外围辉光 */}
                        <div className="absolute w-8 h-8 bg-yellow-500/30 rounded-full blur-md" />
                    </div>
                </div>
            </motion.div>

        </div>

       
      </div>
    </div>
  );
}