"use client";

import React, { useMemo } from "react";
import { motion, useTime, useTransform, MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- 工具函数 ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 1. 模拟 Logo 图标 (使用 SVG 还原图中 Logo 样式) ---

const Logos = {
  DeepBrain: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white/90">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor" />
    </svg>
  ),
  JDI: () => (
    <div className="flex flex-col items-center justify-center">
      <span className="text-3xl font-bold tracking-tighter text-white leading-none">JDI</span>
      <div className="w-8 h-1 mt-1 border-b-2 border-white rounded-full"></div>
    </div>
  ),
  Waterdrip: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/90">
       <path d="M12 2L8.5 8C7 10.5 6 12 6 14c0 3.31 2.69 6 6 6s6-2.69 6-6c0-2-1-3.5-2.5-6L12 2z" />
       <circle cx="9" cy="15" r="1" className="text-black" />
       <circle cx="14" cy="16" r="1" className="text-black" />
    </svg>
  ),
  Meezan: () => (
    <div className="flex flex-col items-center">
       <span className="text-xl font-serif font-bold text-white tracking-widest">|M|</span>
       <span className="text-[0.5rem] font-bold text-gray-400 uppercase tracking-widest">Meezan</span>
    </div>
  ),
  PrimeLink: () => (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      <span className="font-serif text-white text-lg">PrimeLink</span>
    </div>
  )
};

// --- 2. 轨道卡片组件 ---

interface OrbitItemProps {
  name: string;
  icon: React.ReactNode;
  radiusX: number; // 椭圆 X 轴半径 (宽度)
  radiusY: number; // 椭圆 Y 轴半径 (高度/倾斜度)
  speed: number;   // 旋转速度，负数反向
  initialPhase: number; // 初始角度 (0 - 2PI)
  offsetY?: number; // 垂直偏移 (有些卡片比球体中心高，有些低)
}

const OrbitItem = ({ name, icon, radiusX, radiusY, speed, initialPhase, offsetY = 0 }: OrbitItemProps) => {
  const time = useTime();

  // 将时间转换为角度
  // time.get() 是毫秒，除以大数值减慢速度
  const rotate = useTransform(time, (t) => (t / 5000) * speed + initialPhase);

  // 3D 投影逻辑
  // x: 简单的 cos 运动
  const x = useTransform(rotate, (r) => radiusX * Math.cos(r));
  
  // y: sin 运动，但加上 offsetY 偏移
  const y = useTransform(rotate, (r) => radiusY * Math.sin(r) + offsetY);
  
  // z: 模拟深度，用于计算缩放和层级。我们用 sin(r) 来表示物体是在球体前面还是后面
  // 当 sin(r) > 0 时在前方（底部），< 0 时在后方（顶部）。
  // 注意：通常 3D 投影 y 是高度，z 是深度。这里我们把轨迹看作一个斜着的圆环。
  // 为了简化，我们假设 y 的变化同时也代表了 z 的变化（因为是倾斜的轨道）。
  const zScale = useTransform(rotate, (r) => {
     // 简单的透视模拟：在圆环最下方(前)时最大，最上方(后)时最小
     const depth = Math.sin(r); 
     return 1 + depth * 0.15; // 缩放范围 0.85 ~ 1.15
  });

  const zOpacity = useTransform(rotate, (r) => {
    const depth = Math.sin(r);
    // 在后面时稍微变暗一点
    return 0.6 + (depth + 1) / 2 * 0.4; // 0.6 ~ 1.0
  });

  const zIndex = useTransform(rotate, (r) => {
    return Math.sin(r) > 0 ? 10 : 0; // 在前面时 z-index 高
  });

  return (
    <motion.div
      style={{
        x,
        y,
        scale: zScale,
        opacity: zOpacity,
        zIndex,
        position: 'absolute',
        top: '50%',
        left: '50%',
      }}
      className="will-change-transform"
    >
      {/* 玻璃态卡片容器 */}
      <div className={cn(
        "relative flex items-center justify-center gap-3",
        "px-6 py-3 rounded-xl",
        "bg-white/5 backdrop-blur-md border border-white/10",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]",
        "transform -translate-x-1/2 -translate-y-1/2", // 居中自身的锚点
        "min-w-[160px] h-[64px]",
        "group cursor-pointer hover:border-white/20 transition-colors duration-300"
      )}>
        {/* 顶部高光条 (模仿图中玻璃质感) */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* 内容 */}
        <div className="flex items-center gap-3">
            <div className="shrink-0">{icon}</div>
            <div className="flex flex-col">
                 {/* 特殊处理 DeepBrain 样式，模仿截图 */}
                 {name === "DeepBrain Chain" ? (
                     <div className="flex flex-col leading-tight">
                         <span className="text-[10px] text-gray-400 font-bold uppercase">DeepBrain</span>
                         <span className="text-[8px] text-gray-500">Chain</span>
                     </div>
                 ) : name === "Waterdrip Capital" ? (
                     <div className="flex flex-col leading-tight">
                         <span className="text-[10px] font-bold text-white uppercase tracking-wider">Waterdrip</span>
                         <span className="text-[8px] text-gray-400 tracking-[0.2em] uppercase">Capital</span>
                     </div>
                 ) : (
                    <span className={cn(
                        "text-sm font-medium text-white",
                        name === "JDI" && "hidden" // JDI logo 已经包含了文字
                    )}>{name}</span>
                 )}
            </div>
        </div>
      </div>
    </motion.div>
  );
};


// --- 3. 主场景组件 ---

export default function OrbitAnimation() {
  // 定义卡片数据和各自的轨道参数
  // 根据截图观察：
  // JDI 和 Waterdrip 似乎在比较大的轨道上。
  // DeepBrain 稍微靠近中心一点。
  // 所有的 initialPhase 是为了让它们初始分布在截图 1 的位置。
  
  const items = useMemo(() => [
    {
      id: 1,
      name: "DeepBrain Chain",
      icon: <Logos.DeepBrain />,
      radiusX: 220, 
      radiusY: 100, // 较扁的椭圆
      offsetY: -60, // 整体轨道偏上
      speed: 1.2,
      initialPhase: Math.PI * 1.5, // 顶部开始 (截图左上位置模拟)
    },
    {
      id: 2,
      name: "JDI",
      icon: <Logos.JDI />,
      radiusX: 350,
      radiusY: 80,
      offsetY: 20,
      speed: 1.0,
      initialPhase: 0, // 右侧开始
    },
    {
      id: 3,
      name: "Waterdrip Capital",
      icon: <Logos.Waterdrip />,
      radiusX: 300,
      radiusY: 140,
      offsetY: 60, // 轨道偏下
      speed: 1.1,
      initialPhase: Math.PI * 0.8, // 左下开始
    },
    {
      id: 4,
      name: "Meezan Ventures",
      icon: <Logos.Meezan />,
      radiusX: 200,
      radiusY: 180, // 比较圆的轨道
      offsetY: 120, // 最底部
      speed: 0.9,
      initialPhase: Math.PI * 0.4, // 底部偏右
    },
    {
      id: 5,
      name: "PrimeLink",
      icon: <Logos.PrimeLink />,
      radiusX: 280,
      radiusY: 120,
      offsetY: -100, // 最顶部
      speed: 1.3,
      initialPhase: Math.PI * 1.8, // 右上角进入
    },
  ], []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* 背景噪点 (可选，增加质感) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 核心球体 */}
      <div className="relative z-0">
        {/* 球体本体 */}
        <div 
            className="w-[400px] h-[400px] rounded-full"
            style={{
                background: 'radial-gradient(circle at 35% 35%, #2a2a2a 0%, #000000 80%)',
                boxShadow: 'inset -20px -20px 60px rgba(0,0,0,0.8), 0 0 50px rgba(20,20,20, 0.3)'
            }}
        >
            {/* 给球体加一点表面噪点纹理，让它看起来像星球 */}
            <div className="absolute inset-0 rounded-full opacity-30 mix-blend-overlay"
                style={{
                    filter: 'contrast(120%) brightness(80%)',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`
                }}
            />
        </div>
      </div>

      {/* 轨道层 */}
      <div className="absolute inset-0 z-10 pointer-events-none">
          {items.map((item) => (
            <OrbitItem 
                key={item.id}
                name={item.name}
                icon={item.icon}
                radiusX={item.radiusX}
                radiusY={item.radiusY}
                speed={item.speed}
                initialPhase={item.initialPhase}
                offsetY={item.offsetY}
            />
          ))}
      </div>
    </div>
  );
}