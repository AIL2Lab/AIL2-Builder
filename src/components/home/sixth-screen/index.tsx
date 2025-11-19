import Image from "next/image";
import Carousel3D from "./Carousel3D";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import Link from "next/link";

const supports = [
  {
    name: "gobi pariners",
    src: "/images/gobi.png",
    with: 128,
    height: 38,
  },
  {
    name: "waterdrip",
    src: "/images/waterdrip.png",
    with: 132,
    height: 60,
  },
  {
    name: "depin",
    src: "/images/depin.png",
    with: 169,
    height: 35,
  },
  {
    name: "jdi",
    src: "/images/jdi.png",
    with: 95,
    height: 70,
  },
  {
    name: "dbc",
    src: "/images/dbc.png",
    with: 78,
    height: 70,
  },
  {
    name: "meezan",
    src: "/images/meezan.png",
    with: 84,
    height: 50,
  },
  {
    name: "neoventures",
    src: "/images/neov.png",
    with: 215,
    height: 30,
  },
  {
    name: "primelink",
    src: "/images/primelink.png",
    with: 170,
    height: 60,
  },
];
const images = [
    {
      src: '/images/lorem.png',
      alt: 'Slide 1',
      title: '美丽的风景',
      description: '探索大自然的奇妙世界'
    },
    {
      src: '/images/lorem.png',
      alt: 'Slide 2',
      title: '城市夜景',
      description: '现代都市的璀璨灯火'
    },
    {
      src: '/images/lorem.png',
      alt: 'Slide 3',
      title: '艺术创作',
      description: '创意与灵感的完美结合'
    },
    
  ]
export default function HomeSixthScreen() {
  const t = useTranslations("Home")
  return (
    <section className="w-full mx-auto lg:max-w-7xl my-5 sm:my-8 md:my-12 lg:my-16 px-5">
      {/* <div className="text-center font-bold text-xl md:text-2xl lg:text-3xl mb-10 sm:mb-20 px-20">
        {t.rich('sixthScreen.expert', {
          theme: (chunks) => <span className="text-theme">{chunks}</span>
        })}
      </div> */}
      {/* <div className="grid grid-cols-2 py-5 relative bg-[#121212] rounded-4xl border-5 border-white/4">
        <div className="sm:col-span-1 col-span-2 flex flex-col items-center p-5 lg:p-0">
          <Image src="/images/lorem.png" alt="" width={449} height={565} />
        </div>
        <div className="six-border hidden sm:flex"></div>
        <div className="px-5 md:px-10 sm:col-span-1 col-span-2 flex flex-col justify-center items-center">
          <div className="font-semibold text-2xl text-theme mb-5 md:mb-10">
            Lorem ipsum dolor sit amet{" "}
          </div>
          <div className="text-lg">
            consectetur. Eget purus eget lacus eu duis lacus in duis. Nisl vel
            velit lacinia fringilla laoreet bibendum mattis sagittis. Nunc neque
            imperdiet sed posuere egestas accumsan ut enim. Turpis nec at
            placerat amet adipiscing turpis magna. Malesuada sed vffjfj fdd
            eweiuw
          </div>
        </div>
      </div> */}
      {/* <div className="bg-white/5 p-5 sm:p-10 lg:p-20 rounded-4xl">
          <Image className="mb-5" src="/images/neo-ventures.png" width={233} height={33} alt="neo-ventures" />
          <div className="mb-5 text-theme font-semibold text-lg md:text-2xl">Lorem ipsum dolor sit amet</div>
          <div className="mb-5 text-sm sm:text-base md:text-lg text-[#B4B2B2]">consectetur. Eget purus eget lacus eu duis lacus in duis. Nisl vel velit lacinia fringilla laoreet bibendum mattis sagittis. Nunc neque imperdiet sed posuere egestas accumsan ut enim. Turpis nec at placerat amet adipiscing turpis magna. Malesuada sed vffjfj fdd eweiuw</div>
          <div className="flex">
            <Image src="/images/expert-avatar.png" width={90} height={88} alt="expert-avatar" />
            <div className="flex flex-col justify-center ml-5">
              <span className="text-white text-base sm:text-lg md:text-xl font-semibold">Hyn</span>
              <span className="text-white/60 text-sm sm:text-base md:text-lg">{t('sixthScreen.founder')}</span>
            </div>
          </div>
      </div> */}
      <div className="grid grid-cols-2 mt-20 mx-auto lg:max-w-5xl">
        <div className="col-span-2 lg:col-span-2 flex flex-col justify-center">
          <div className="text-xl lg:text-2xl font-bold mb-10">
            {t.rich('sixthScreen.joinBuilders', {
              theme: (chunks) => <span className="text-theme">{chunks}</span>
            })}
          </div>
          <div className="flex space-x-2.5 text-sm sm:text-base items-center justify-center">
            <div className="px-6 py-3 support-btn w-fit rounded-xl font-bold">
              <Link href={siteConfig.xUrl} target="_blank">{t("supportBtn")}</Link>
            </div>
            {/* <div className="px-6 py-3 bg-theme/20 border-theme/30 border-2 text-theme w-fit rounded-xl font-bold">
              Join our TG
            </div> */}
          </div>
        </div>
        {/* <div className="col-span-2 lg:col-span-1">
         <Carousel3D images={images} autoPlay={true} interval={4000} />
        </div> */}
      </div>
      {/* <div>
        <div className="text-center font-bold text-xl md:text-2xl lg:text-3xl mb-5 sm:mb-10 md:mb-20">
          {t('sixthScreen.supported')}
        </div>
        <div className="grid grid-cols-12">
          {supports.map((item, idx) => (
            <div
              key={idx}
              className="m-2 rounded-4xl p-5 col-span-6 sm:col-span-4 md:col-span-3 flex justify-center items-center border-white/10 border-5 h-24"
            >
              <Image
                src={item.src}
                alt={item.name}
                width={item.with}
                height={item.height}
              />
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}
