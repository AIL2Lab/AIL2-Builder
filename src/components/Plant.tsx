'use client'
import useBreakpoint, { Breakpoint } from "@/hooks/useBreakpoint";

type Props = {
  rotate?: number
}

export default function Plant({ rotate = 0 }: Props) {
  const breakpoint = useBreakpoint() as Breakpoint;
  const thickness = (breakpoint === 'xs' || breakpoint === 'sm') ? 4 : 8; 
  return (
    <div className="w-full relative h-40 sm:h-60 md:h-80 lg:h-100 overflow-hidden">
      <div className="circle bg-background w-[800px] h-[800px] sm:w-[1600px] sm:h-[1600px] lg:w-[3200px] lg:h-[3200px]"></div>
      <div
        className="absolute top-[50px] left-1/2 -translate-x-1/2 rounded-full w-[800px] h-[800px] sm:w-[1600px] sm:h-[1600px] lg:w-[3200px] lg:h-[3200px]"
        style={{ rotate: `${rotate}deg` }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, rgba(252, 241, 192, 1) 0deg, rgba(255, 255, 255, 0) 11.63deg, rgba(255, 255, 255, 0) 348.37deg, rgba(252, 241, 192, 1) 360deg)`,
            /* 
               修改说明：
               1. 内圈：从 calc(100% - 12px) 突变到 +0.5px，消除内侧模糊。
               2. 外圈：从 calc(100% - 1px) 突变到 100%，消除原本 99.5% 带来的 8px 模糊。
            */
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
      </div>
    </div>
  );
}