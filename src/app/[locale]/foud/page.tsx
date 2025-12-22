import PageLayout from "@/components/PageLayout";
import Plant from "@/components/Plant";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Locale, useTranslations } from "next-intl";
import { PortfolioCard } from "@/components/incubator/PortfolioCard";
import {
  Zap,
  Cpu,
  Database,
  Activity,
  Menu,
  Twitter,
  Github,
  ArrowRight,
  Bot,
  Hammer,
} from "lucide-react";
import { ProcessStep } from "@/components/incubator/ProcessStep";
import { BenefitItem } from "@/components/foud/BenefitItem";
import { CategoryCard } from "@/components/foud/CategoryCard";
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

export default function EcosystemFundPage({
  params,
}: PageProps<"/[locale]/foud">) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale as Locale);
  const t = useTranslations("EcosystemFond");
  return (
    <PageLayout isShowFooter>
      <main className="pt-32 pb-20">
        <section className="py-20 text-center px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              {t.rich('title', {
                theme: (chunk) => <span className="text-theme">{chunk}</span>
              })}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-20 leading-relaxed">
              {t('description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
              <CategoryCard
                icon={<Database size={24} />}
                title={t('card1.title')}
                desc={t('card1.description')}
              />
              <CategoryCard
                icon={<Cpu size={24} />}
                title={t('card2.title')}
                desc={t('card2.description')}
              />
              <CategoryCard
                icon={<Bot size={24} />}
                title={t('card3.title')}
                desc={t('card3.description')}
              />
              <CategoryCard
                icon={<Hammer size={24} />}
                title={t('card4.title')}
                desc={t('card4.description')}
              />
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900 to-black p-8 md:p-16 text-left">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8">
                    {t("weOffer")}
                  </h2>
                  <div className="space-y-8">
                    <BenefitItem
                      title={t('offer1.title')}
                      desc={t('offer1.description')}
                    />
                    <BenefitItem
                      title={t('offer2.title')}
                      desc={t('offer2.description')}
                    />
                    <BenefitItem
                      title={t('offer3.title')}
                      desc={t('offer3.description')}
                    />
                  </div>

                  {/* <div className="mt-10">
                    <button className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2">
                      Apply for Grant <ArrowRight size={18} />
                    </button>
                  </div> */}
                </div>
                <div className="flex-1 w-full">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black group cursor-pointer">
                    <img
                      src="https://picsum.photos/800/600?random=11"
                      alt="Fund Intro Video"
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
