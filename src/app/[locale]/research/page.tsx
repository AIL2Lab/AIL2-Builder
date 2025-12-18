import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Locale, useTranslations } from "next-intl";
import Plant from "@/components/Plant";
import Image from "next/image";
import section3Img from '@/assets/images/research-section3.jpg'
import { Link } from "@/i18n/navigation";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: `${t("research.title")} | ${t("subtitle")}`,
    description: `${t("research.description")}`,
  };
}

export default function ResearchPage({
  params,
}: PageProps<"/[locale]/research">) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale as Locale);
  const t = useTranslations("Research");
  const section1Items = [
    {
      title: t("section1.item1.title"),
      description: t.rich("section1.item1.description", {
        theme: (chunks) => <span className="text-theme">{chunks}</span>,
      }),
    },
    {
      title: t("section1.item2.title"),
      description: t.rich("section1.item2.description", {
        theme: (chunks) => <span className="text-theme">{chunks}</span>,
      }),
    },
    {
      title: t("section1.item3.title"),
      description: t.rich("section1.item3.description", {
        theme: (chunks) => <span className="text-theme">{chunks}</span>,
      }),
    },
  ];
  const section3Items = [
    {
      title: t("section3.item1.title"),
      description: t.rich("section1.item1.description", {
        theme: (chunks) => <span className="text-theme">{chunks}</span>,
      }),
    },
    {
      title: t("section3.item2.title"),
      description: t.rich("section1.item2.description", {
        theme: (chunks) => <span className="text-theme">{chunks}</span>,
      }),
    },
  ]
  return (
    <PageLayout isShowFooter>
      <div className="flex flex-col">
        <section className="mt-30 sm:mt-60">
          <div className="text-center z-10 relative px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
              {t.rich("title", {
                br: () => <br />,
                theme: (chunks) => <span className="text-theme">{chunks}</span>,
              })}
            </h1>
            <div className="text-xl mb-12  text-center">
              <span className="inline-flex md:w-1/2 lg:w-1/4">
                {t("subtitle")}
              </span>
            </div>
            <div className="flex gap-4 justify-center items-center ">
              <div className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base cursor-pointer">
                <Link href="/ecosystem">{t("buildBtn")}</Link>
              </div>
              <button className="px-7 py-3 btn2 w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base">
                <a href="/doc/HPVIDEO_WhitePaperv3.pdf" target="_blank" rel="noopener noreferrer">
                  {t("readBtn")}
                </a>
              </button>
            </div>
          </div>
        </section>
        <div className="relative">
          <Plant rotate={-20} />
        </div>
        <section className="px-4 max-w-7xl mx-auto mb-20">
          <h2 className="border-l-5 border-theme pl-6 text-3xl font-bold mb-10">
            {t("section1.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section1Items.map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col p-12 rounded-2xl border transition-all duration-300 bg-[#0A0A0A] border-white/5 hover:border-theme/80 hover:-translate-y-2"
              >
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed grow">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="px-4 max-w-7xl mx-auto mb-30">
          <h2 className="border-l-5 border-theme pl-6 text-3xl font-bold mb-10">
            {t("section2.title")}
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 bg-[#0A0A0A] border-white/5 border transition-all duration-300 p-6">
              <div className="flex justify-center items-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-theme)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <div>
                <div className="">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {t("section2.item1.title")}
                  </h3>
                  <div className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed grow">
                    {t.rich("section2.item1.description", {
                      br: () => <br />,
                      theme: (chunks) => (
                        <span className="text-theme">{chunks}</span>
                      ),
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 bg-[#0A0A0A] border-white/5 border transition-all duration-300 p-6">
              <div className="flex justify-center items-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-theme)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div>
                <div className="">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {t("section2.item2.title")}
                  </h3>
                  <div className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed grow">
                    {t.rich("section2.item2.description", {
                      br: () => <br />,
                      theme: (chunks) => (
                        <span className="text-theme">{chunks}</span>
                      ),
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 bg-[#0A0A0A] border-white/5 border transition-all duration-300 p-6">
              <div className="flex justify-center items-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-theme)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10"
                >
                  <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <div>
                <div className="">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {t("section2.item3.title")}
                  </h3>
                  <div className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed grow">
                    {t.rich("section2.item3.description", {
                      br: () => <br />,
                      theme: (chunks) => (
                        <span className="text-theme">{chunks}</span>
                      ),
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 max-w-7xl mx-auto mb-20">
          <div className="text-center z-10 relative px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
              {t.rich("section3.title", {
                br: () => <br />,
                theme: (chunks) => <span className="text-theme">{chunks}</span>,
              })}
            </h1>
            <div className="text-xl mb-12  text-center">
              <span className="inline-flex w-full p-2 md:w-1/2">
                {t("section3.subtitle")}
              </span>
            </div>
          </div>
          <div className="container mx-auto ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div
                className="relative order-2 lg:order-1"
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10">
                  
                </div>
                <div className="">
                  {section3Items.map((item, index) => (
                    <div
                      key={index}
                      className="h-1/3 cursor-pointer transition-all duration-500 transform"
                    >
                      <div className="p-10">
                        <h3
                        className="text-2xl font-bold transition-colors duration-700 text-theme"
                        >
                          {item.title}
                        </h3>
                        <p
                        className="leading-relaxed transition-all duration-500 text-base text-white/60"
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
                <div className="relative h-full">
                  <Image
                    src={section3Img}
                    alt="Multi-Agent System Architecture"
                    className="w-3/4 filter grayscale sepia hue-rotate-10 saturate-200"
                    priority
                    />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
