'use client'
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react"; // 1. 导入 useRef

const floats = [
  {
    name: "waterdrip",
    src: "/images/waterdrip.png",
    width: 132,
    height: 60,
  },
  {
    name: "jdi",
    src: "/images/jdi.png",
    width: 95,
    height: 70,
  },
  {
    name: "dbc",
    src: "/images/dbc.png",
    width: 78,
    height: 70,
  },
  {
    name: "meezan",
    src: "/images/meezan.png",
    width: 84,
    height: 50,
  },
  {
    name: "primelink",
    src: "/images/primelink.png",
    width: 170,
    height: 60,
  },
];

export default function HomeSeventhScreen() {
  const t = useTranslations("Home");
  
  // 2. 创建一个 ref 来引用 div#abc
  const containerRef = useRef<HTMLDivElement>(null);

  // 3. 使用 state 来存储动态计算的轨道半径
  const [orbitRadius, setOrbitRadius] = useState(0); // 初始值为 0，会在 effect 中更新

  // 4. 使用 useEffect 来监听容器尺寸变化
  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    // 创建一个 ResizeObserver 实例
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // 获取元素的宽度并计算半径
        const { width } = entry.contentRect;
        setOrbitRadius(width / 2);
      }
    });

    // 开始观察容器元素
    resizeObserver.observe(containerElement);

    // 组件卸载时，停止观察以防止内存泄漏
    return () => {
      resizeObserver.disconnect();
    };
  }, []); // 空依赖数组表示这个 effect 只在组件挂载时运行一次

  // 动画配置常量
  const ANIMATION_SPEED = 0.1; // 动画速度
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setAngle((prevAngle) => (prevAngle + ANIMATION_SPEED) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    // 定义动画总时长：进入动画(0.5s) + 停留(3s) + 离开动画(0.5s) = 4s
    const totalAnimationTime = 500 + 3000; // 只需要计算进入+停留，因为离开是下一个元素进入时触发的

    const timer = setTimeout(() => {
      // 时间到后，更新 activeIndex 到下一个元素
      setActiveIndex((prevIndex) => (prevIndex + 1) % floats.length);
    }, totalAnimationTime);

    // 清理函数：在组件卸载或 activeIndex 变化时，清除上一个计时器
    return () => clearTimeout(timer);
  }, [activeIndex]); // 依赖项是 activeIndex，这样每次它变化时都会设置一个新的计时器

  return (
    <section className="container mx-auto lg:max-w-7xl my-6 sm:my-12 md:my-24 lg:my-32 px-5">
      {/* ... 上面的标题部分保持不变 ... */}
      <div className="justify-center flex flex-col items-center mb-10 sm:mb-20 md:mb-20 lg:mb-40">
        <div className="ai-l2-btn w-fit text-lg lg:text-xl border border-theme/30 py-2.5 px-8 rounded-2xl">
          {t('seventhScreen.partners')}
        </div>
        <div className="mt-5 font-bold text-xl md:text-2xl lg:text-3xl text-center">
          {t.rich('seventhScreen.community', {
            theme: (chunks) => <span className="text-theme">{chunks}</span>
          })}
        </div>
        <div className="mt-5 text-theme text-xl md:text-2xl font-normal text-center">
          {t('seventhScreen.ecosystem')}
        </div>
      </div>
      
      <div className="flex justify-center items-center">
        {/* 5. 将 ref 添加到 div 上 */}
        <div ref={containerRef} id="abc" className="w-fit relative m-10 lg:m-0">
          {/* 中心背景图片 */}
          <Image 
            src="/images/bg-seven.png" 
            alt="" 
            width={772} 
            height={772}
          />
          
          {/* 围绕中心运动的 float 项目 */}
          {floats.map((item, index) => {
            // 计算每个项目的初始角度偏移，让它们均匀分布
            const initialAngleOffset = (360 / floats.length) * index;
            const currentAngle = angle + initialAngleOffset;
            const angleInRadians = (currentAngle * Math.PI) / 180;
            
            // 6. 使用动态的 orbitRadius
            const x = orbitRadius * Math.cos(angleInRadians);
            const y = orbitRadius * Math.sin(angleInRadians);
            
            // 为不同的项目添加不同的 z-index 和缩放效果
            const zIndex = Math.sin(angleInRadians) > 0 ? 10 : 1;
            const scale = 0.8 + Math.sin(angleInRadians) * 0.2; // 根据位置调整大小
            
            return (
              <motion.div
                key={item.name}
                className="border-white/10 border-5 bg-white/5 w-40 h-20 p-2.5 absolute flex justify-center items-center rounded-xl backdrop-blur-lg"
                style={{
                  // 将容器中心定位到圆心
                  top: '50%',
                  left: '50%',
                  // 根据计算的位置平移
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  zIndex: zIndex,
                }}
                animate={{
                  // 如果当前元素是活动元素，则移动到中心 (0, 0)
                  // 否则，移动到它计算出的初始位置
                  x: activeIndex === index ? 0 : x,
                  y: activeIndex === index ? 0 : y,
                }}
                transition={{
                  duration: 2, // 动画持续时间为 0.5 秒
                  ease: "easeInOut", // 使用平滑的缓动函数
                }}
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  width={item.width}
                  height={item.height}
                  className="object-contain"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
