import { useTranslations } from "next-intl";
import Image from "next/image";

const floats = [
  {
    name: "waterdrip",
    src: "/images/waterdrip.png",
    with: 132,
    height: 60,
    styles: {
      left: "-5%",
      top: "100px",
    },
  },
  {
    name: "jdi",
    src: "/images/jdi.png",
    with: 95,
    height: 70,
    styles: {
      right: "-5%",
      bottom: "100px",
    },
  },
  {
    name: "dbc",
    src: "/images/dbc.png",
    with: 78,
    height: 70,
    styles: {
      left: "50%",
      top: "40%",
    },
  },
  {
    name: "meezan",
    src: "/images/meezan.png",
    with: 84,
    height: 50,
    styles: {
      left: "5%",
      bottom: "20px",
      zIndex: -1
    },
  },
  {
    name: "primelink",
    src: "/images/primelink.png",
    with: 170,
    height: 60,
    styles: {
      right: "-5%",
      top: "80px",
      zIndex: -1
    },
  },
];
export default function HomeSeventhScreen() {
  const t = useTranslations("Home")
  return (
    <section className="container mx-auto lg:max-w-7xl my-6 sm:my-12 md:my-24 lg:my-32 px-5">
      <div className="justify-center flex flex-col items-center mb-10 sm:mb-20 md:mb-20 lg:mb-40">
        <div className="ai-l2-btn w-fit text-lg lg:text-xl border border-theme/30 py-2.5 px-5 rounded-2x">
          {t('seventhScreen.partners')}
        </div>
        <div className="mt-5 font-bold text-2xl lg:text-3xl">
          {t.rich('seventhScreen.community', {
            theme: (chunks) => <span className="text-theme">{chunks}</span>
          })}
        </div>
        <div className="mt-5 text-theme text-2xl lg:text-3xl font-normal">
          {t('seventhScreen.ecosystem')}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-fit relative m-10 lg:m-0">
          <Image src="/images/bg-seven.png" alt="" width={772} height={772} />
          {floats.map((item, idx) => (
            <div
              key={idx}
              className="border-white/10 border-5 bg-white/5 w-40 h-20 p-2.5 absolute flex justify-center items-center rounded-xl backdrop-blur-lg"
              style={item.styles}
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
      </div>
    </section>
  );
}
