"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const items = [
  {
    id: 1,
    title: "Endless scalability",
    description:
      "Scalability without limits, enabling Al and Web3 applications to achieve unrestricted growth.",
    image: "https://picsum.photos/seed/design/800/600.jpg",
  },
  {
    id: 2,
    title: "GPU Driver",
    description:
      "GPU miners deploy Al models,developers don't need to manage or maintain them.",
    image: "https://picsum.photos/seed/tech/800/600.jpg",
  },
  {
    id: 3,
    title: "Fluid Composability",
    description:
      "Developers can integrate effortlessly to build, link, and scale Al-powered Web3 applications with ease.",
    image: "https://picsum.photos/seed/ux/800/600.jpg",
  },
];

export default function Shower() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 自动轮播
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // 计算游标位置
  const cursorPosition = activeIndex * 33;
  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div
          className="relative order-2 lg:order-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10">
            <div
              style={{ top: `${cursorPosition}%` }}
              className="c-cursor w-0.5 h-24 bg-theme transition-all duration-700 ease-in-out absolute left-1/2 -translate-x-1/2"
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full w-6 h-6 flex justify-center items-center">
                <div className="w-3 h-3 bg-theme rounded-full  shadow-lg"></div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`cursor-pointer transition-all duration-500 transform ${
                  activeIndex === index
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-80"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="">
                  <h3
                    className={`pl-10 text-2xl font-bold transition-colors duration-700 ${
                      activeIndex === index ? "text-theme" : "text-white/50"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <div
                    className={`my-2.5 h-px bg-white/10 transition-all duration-500 ${
                      activeIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                  <p
                    className={`pl-10 leading-relaxed transition-all duration-500 text-base ${
                      activeIndex === index ? "text-white/60" : "text-white/30"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] order-1 lg:order-2">
          <div className="relative h-full">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  activeIndex === index
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-110"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="flex gap-2 mt-8 ml-8">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-8 bg-blue-500"
                : "bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}
