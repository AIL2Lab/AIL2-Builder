import PageLayout from "@/components/PageLayout";
import Plant from "@/components/Plant";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EthereumIcon } from "@/components/icons/Ethereum";
import { BnbIcon } from "@/components/icons/Bnb";
import { OkxIcon } from "@/components/icons/Okx";
import { MantleIcon } from "@/components/icons/Mantle";
import { GiwaIcon } from "@/components/icons/Giwa";
import Image from "next/image";
import { use } from "react";
import { Locale, useTranslations } from "next-intl";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: `platform | ${t("subtitle")}`,
    description: `Decentralized AI Acceleration Platform`,
  };
}

export default function PlatformPage({
  params,
}: PageProps<"/[locale]/platform">) {
  const t = useTranslations("Platform");
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale as Locale);

  const items = [
    t("section2.item1"),
    t("section2.item2"),
    t("section2.item3"),
    t("section2.item4"),
  ];
  const web3Items = [
    t("section2.item1"),
    t("section2.item2"),
    t("section2.item3"),
    t("section2.item4"),
  ];
  return (
    <PageLayout isShowFooter>
      <div className="flex flex-col">
        <section className="mt-30 sm:mt-60">
          <div className="text-center z-10 relative px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
              {t.rich("title", { br: () => <br /> })}
            </h1>
            <div className="inline-block border border-theme/30 bg-theme/5 px-6 py-3 rounded-xl text-xl mb-12">
              {t("subtitle")}
            </div>
          </div>
        </section>
        <div className="relative">
          <Plant rotate={-20} />
          <div className="absolute w-full  text-center top-2/3 sm:top-1/2 lg:-translate-y-1/2 z-10 px-5">
            <div className="w-15 md:w-20 h-1 bg-theme mx-auto mb-6"></div>
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-white max-w-2xl mx-auto">
              {t.rich("powered", { br: () => <br /> })}
            </h2>
          </div>
        </div>
        <div className="space-y-12 mt-20 sm:mt-0">
          <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="sm:text-right text-xl sm:text-2xl  md:text-3xl font-bold text-white mb-2">
                {t.rich("section1.title", { br: () => <br /> })}
              </h3>
              <p className="sm:text-right text-gray-400 leading-relaxed mb-8">
                {t("section1.content")}
              </p>
              <div className="sm:text-right">
                <button className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base cursor-pointer">
                  对比图片1
                </button>
              </div>
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-3 gap-6 place-content-center justify-items-center mx-auto">
              <div
                className="w-24 h-24 rounded-lg flex items-center justify-center
            backdrop-blur-md transition-all duration-500 border border-theme/35"
                style={{
                  boxShadow: "0px 0px 9.9px 0px rgba(255, 223, 98, 0.63) inset",
                }}
              >
                <div className={`w-10 h-10 rounded-xs bg-theme`}></div>
              </div>
              {[EthereumIcon, BnbIcon, MantleIcon, OkxIcon, GiwaIcon].map(
                (Icon, idx) => (
                  <div
                    key={idx}
                    className="w-24 h-24 rounded-lg flex items-center justify-center
            backdrop-blur-md transition-all duration-500 bg-theme/10 border border-theme/35"
                    style={{
                      boxShadow:
                        "0px 0px 9.9px 0px rgba(255, 223, 98, 0.63) inset",
                    }}
                  >
                    <Icon className="w-[60%] h-[60%] fill-[var(--color-theme)]" />
                  </div>
                )
              )}
            </div>
          </section>
          <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <Image
                src="/images/platform-gpu.png"
                alt="gpu"
                width={756}
                height={521}
              />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl  md:text-3xl font-bold text-white mb-2">
                {t.rich("section2.title", { br: () => <br /> })}
              </h3>
              <ul className="space-y-4 text-gray-400 mb-8 list-disc pl-5">
                {items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <button className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base cursor-pointer">
                对比图片1
              </button>
            </div>
          </section>
          <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="sm:text-right text-xl sm:text-2xl  md:text-3xl font-bold text-white mb-2">
                {t.rich("section3.title", { br: () => <br /> })}
              </h3>
              <p className="sm:text-right text-gray-400 leading-relaxed mb-8">
                {t("section3.content")}
              </p>
              <div className="sm:text-right">
                <button className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base cursor-pointer">
                  对比图片1
                </button>
              </div>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              <Image
                src="/images/platform-storage.png"
                alt="gpu"
                width={756}
                height={521}
              />
            </div>
          </section>
          <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <Image
                src="/images/platform-data.png"
                alt="gpu"
                width={756}
                height={521}
              />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl  md:text-3xl font-bold text-white mb-6">
                {t("section4.title")}
              </h3>
              <ul className="space-y-4 text-gray-400 mb-8 list-disc pl-5">
                {web3Items.map((item, idx) => (
                  <li>{item}</li>
                ))}
              </ul>
              <button className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base cursor-pointer">
                对比图片1
              </button>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
