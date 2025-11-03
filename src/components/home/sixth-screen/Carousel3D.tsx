'use client'
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ImageObj {
  src: string;
  alt: string;
  title: string;
  description: string;
}

type Props = {
  images: ImageObj[];
  autoPlay: boolean;
  interval: number;
};
const Carousel3D = ({ images, autoPlay = true, interval = 3000 }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);

  // 自动播放
  useEffect(() => {
    if (autoPlay && !isTransitioning) {
      timeoutRef.current = setTimeout(() => {
        handleNext();
      }, interval);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, autoPlay, interval, isTransitioning]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleDotClick = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const getSlidePosition = (index) => {
    const diff = index - currentIndex;
    const totalSlides = images.length;

    // 处理循环逻辑
    let normalizedDiff = diff;
    if (Math.abs(diff) > totalSlides / 2) {
      normalizedDiff = diff > 0 ? diff - totalSlides : diff + totalSlides;
    }

    return normalizedDiff;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12">
      {/* 轮播容器 */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        {/* 图片容器 */}
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((image, index) => {
            const position = getSlidePosition(index);
            const isActive = position === 0;

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-in-out cursor-pointer
                  ${isActive ? "z-20" : "z-10"}
                  ${position === 1 || position === -1 ? "z-15" : "z-5"}
                `}
                style={{
                  transform: `
                    translateX(${position * 60}%) 
                    scale(${isActive ? 1 : 0.7})
                    translateZ(${isActive ? 0 : -100}px)
                  `,
                  opacity: Math.abs(position) > 2 ? 0 : 1,
                  filter: isActive ? "none" : "brightness(0.7)",
                }}
                onClick={() => handleDotClick(index)}
              >
                <div
                  className={`relative ${
                    isActive ? "w-80 h-80" : "w-64 h-64"
                  } rounded-xl overflow-hidden shadow-2xl`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-white text-xl font-bold">
                        {image.title}
                      </h3>
                      <p className="text-white/80 text-sm mt-1">
                        {image.description}
                      </p>
                    </div>
                  )} */}
                </div>
              </div>
            );
          })}
        </div>

        {/* 左右导航按钮 */}
        {/* <button
          onClick={handlePrev}
          className="absolute left-4 z-30 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 z-30 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button> */}
      </div>

      {/* 指示器 */}
      {/* <div className="flex justify-center mt-8 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full
              ${
                currentIndex === index
                  ? "w-8 h-2 bg-blue-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Carousel3D;
