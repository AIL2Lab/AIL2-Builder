// hooks/useBreakpoint.ts
'use client';

import { useState, useEffect } from 'react';

// 定义断点类型，方便类型提示
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export default function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);

  useEffect(() => {
    // 确保在客户端运行
    if (typeof window === 'undefined') return;

    // 从根元素获取计算后的样式
    const rootStyles = getComputedStyle(document.documentElement);

    // 读取断点值并转换为数字
    const breakpoints: Record<string, number> = {
      sm: parseInt(rootStyles.getPropertyValue('--breakpoint-sm'), 10),
      md: parseInt(rootStyles.getPropertyValue('--breakpoint-md'), 10),
      lg: parseInt(rootStyles.getPropertyValue('--breakpoint-lg'), 10),
      xl: parseInt(rootStyles.getPropertyValue('--breakpoint-xl'), 10),
      '2xl': parseInt(rootStyles.getPropertyValue('--breakpoint-2xl'), 10),
    };

    const getCurrentBreakpoint = (width: number): Breakpoint => {
      // 从大到小遍历断点
      const sortedBreakpoints = Object.entries(breakpoints).sort(
        (a, b) => b[1] - a[1]
      );

      for (const [name, size] of sortedBreakpoints) {
        if (width >= size) {
          return name as Breakpoint;
        }
      }
      return 'xs'; // 如果宽度小于所有断点，则为 'xs'
    };

    const handleResize = () => {
      setBreakpoint(getCurrentBreakpoint(window.innerWidth));
    };

    // 初始设置
    handleResize();

    // 添加 resize 事件监听器
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}
