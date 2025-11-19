"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";



export default function Shower() {
  const t = useTranslations("Home.thirdScreen.items")
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const items = [
    {
      id: 1,
      title: t("item1.title"),
      description: t("item1.description"),
      image: "/images/endless-scalability.jpg",
    },
    {
      id: 2,
      title: t("item2.title"),
      description: t("item2.description"),
      image: "/images/gpu-driver.jpg",
    },
    {
      id: 3,
      title: t("item3.title"),
      description: t("item3.description"),
      image: "/images/fluid-composability.jpg",
    },
  ];
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);
  
  const cursorPosition = activeIndex * 33.33;
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
              className="c-cursor w-0.5 h-1/3 bg-theme transition-all duration-700 ease-in-out absolute left-1/2 -translate-x-1/2"
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
                className={`h-1/3 cursor-pointer transition-all duration-500 transform ${
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
                  {/* <div
                    className={`my-2.5 h-px bg-white/10 transition-all duration-500 ${
                      activeIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  ></div> */}
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
    </div>
  );
}
