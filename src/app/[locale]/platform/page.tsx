import PageLayout from "@/components/PageLayout";
import Plant from "@/components/Plant";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Locale, useTranslations } from "next-intl";
import ChainAccelerate from '@/components/platform/ChainAccelerate'
import GPU from "@/components/platform/GPU";
import Storage from "@/components/platform/Storage";
import Web3 from "@/components/platform/Web3";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: `${t("platform.title")} | ${t("subtitle")}`,
    description: `${t("platform.description")}`,
  };
}

export default function PlatformPage({
  params,
}: PageProps<"/[locale]/platform">) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale as Locale);
  const t = useTranslations("Platform");
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
          <ChainAccelerate />
          <GPU />
          <Storage />
          <Web3 />
        </div>
      </div>
    </PageLayout>
  );
}
