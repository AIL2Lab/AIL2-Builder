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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleDotClick = (index:number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const getSlidePosition = (index:number) => {
    const diff = index - currentIndex;
    const totalSlides = images.length;

    let normalizedDiff = diff;
    if (Math.abs(diff) > totalSlides / 2) {
      normalizedDiff = diff > 0 ? diff - totalSlides : diff + totalSlides;
    }

    return normalizedDiff;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12">
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel3D;
