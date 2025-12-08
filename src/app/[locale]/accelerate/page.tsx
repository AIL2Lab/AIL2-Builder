import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import { TwitterIcon } from "@/components/icons/Twitter";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { Locale, useTranslations } from "next-intl";

export default function AcceleratePage({
  params,
}: PageProps<"/[locale]/accelerate">) {
  const t = useTranslations("Accelerate");
  const t_common = useTranslations("Common");
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale as Locale);

  const Features = [
    {
      icon: "/images/accelerate-icon-1.png",
      title: t("section3.item1.title"),
      desc: t("section3.item1.description"),
    },
    {
      icon: "/images/accelerate-icon-2.png",
      title: t("section3.item2.title"),
      desc: t("section3.item2.description"),
    },
    {
      icon: "/images/accelerate-icon-3.png",
      title: t("section3.item3.title"),
      desc: t("section3.item3.description"),
    },
    {
      icon: "/images/accelerate-icon-6.png",
      title: t("section3.item4.title"),
      desc: t("section3.item4.description"),
    },
    {
      icon: "/images/accelerate-icon-5.png",
      title: t("section3.item5.title"),
      desc: t("section3.item5.description"),
    },
  ];

  const Supports = [
    t("section4.item1"),
    t("section4.item2"),
    t("section4.item3"),
  ];
  return (
    <PageLayout isShowFooter>
      <section className="relative w-full max-w-6xl mx-auto px-5 pb-20 flex flex-col md:flex-row items-center overflow-hidden">
        <div className="w-full md:w-[50%] space-y-6 z-10 text-center md:text-left mt-20 lg:mt-30">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {t.rich("section1.title", {
              br: () => <br />,
              theme: (chunks) => (
                <span className="accelerate-ail2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <p className="text-gray-300 text-lg max-w-lg mx-auto md:mx-0">
            {t("section1.content")}
          </p>

          <div className="flex gap-4 pt-4 justify-center md:justify-start">
            <div className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base cursor-pointer">
              {t_common("applyBtn")}
            </div>
            <button className="px-7 py-3 btn2 w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base">
              {t_common("learnMore")}
            </button>
          </div>
        </div>
        <div className="w-full md:w-[55%] mt-10 md:mt-0 flex justify-center md:justify-end relative">
          <Image
            src="/images/accelerate-rocket.png"
            alt="Rocket"
            width={1227}
            height={1315}
            className="w-full h-auto object-contain md:scale-150 md:translate-x-6 origin-center md:translate-y-40 lg:translate-y-50"
          />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1512px] -z-10">
          <Image
            src="/images/accelerate-grid.png"
            alt="Grid Background"
            width={1512}
            height={255}
            className="w-full h-auto opacity-60"
          />
        </div>
      </section>
      <section className="py-12 md:py-24 px-5 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <Image
            src="/images/accelerate-ail2.png"
            alt="ail2"
            width={558}
            height={550}
          />
        </div>

        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center px-7 rounded-3xl border border-theme/40 bg-theme/10 text-lg">
            <Image
              src="/images/accelerate-s-ail2.png"
              alt="ail2"
              width={59}
              height={64}
            />
            <span className="pr-4">{t("section2.btn")}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-4xl font-bold leading-snug">
            {t.rich("section2.content", {
              theme: (chunks) => <span className="text-theme">{chunks}</span>,
            })}
          </h2>
        </div>
      </section>
      <section className="py-12 md:py-24 px-5 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Features.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-2xl bg-white/3 transition duration-300 group"
            >
              <Image src={item.icon} width={60} height={60} alt="" />
              <h3 className="text-xl font-bold mb-3 mt-6">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
          <div className="p-8 rounded-2xl flex flex-col justify-center h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-transparent to-white/5 pointer-events-none" />
            <h2 className="text-5xl font-bold mb-4">
              {t("section3.item6.title")}
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              {t("section3.item6.description")}
            </p>
            <button className="flex items-center justify-between w-full bg-theme/10 border border-theme/50 px-4 py-3 rounded-xl">
              <span className="text-theme">
                {t("section3.item6.followBtn")}
              </span>
              <TwitterIcon size={24} fill="white" />
            </button>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 px-5 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <Image
            src="/images/accelerate-man.png"
            alt="man"
            width={570}
            height={647}
          />
        </div>
        <div className="space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            {t("section4.title")}
          </h2>
          <p className="text-gray-400">{t("section4.content")}</p>
          <ul className="space-y-6">
            {Supports.map((text, i) => (
              <li key={i} className="flex gap-3 text-gray-300 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                {text}
              </li>
            ))}
          </ul>
          <div className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base">
            {t_common("applyBtn")}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
