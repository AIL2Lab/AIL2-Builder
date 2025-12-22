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
} from "lucide-react";
import { ProcessStep } from "@/components/incubator/ProcessStep";
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
}: PageProps<"/[locale]/incubator">) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale as Locale);
  const t = useTranslations("Incubator");
  return (
    <PageLayout isShowFooter>
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="py-20 text-center px-4">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              {t.rich("title", {
                theme: (chunk) => <span className="text-theme">{chunk}</span>,
              })}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-16 leading-relaxed">
              {t("description")}
            </p>

            {/* Glass Panel */}
            <div className="relative overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-b from-neutral-900 to-black p-10 md:p-20 text-center">
              <div className="relative z-10 mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {t.rich("subtitle", {
                    theme: (chunk) => (
                      <span className="text-theme">{chunk}</span>
                    ),
                  })}
                </h2>
                <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
                  {t("subDescription")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                <button className="bg-white text-black hover:bg-yellow-400 hover:text-black font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 transform hover:-translate-y-1">
                  {t("applyBtn")}
                </button>
                <button className="bg-transparent border border-white/20 text-white hover:border-yellow-400 hover:text-yellow-400 font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300">
                  {t("viewBtn")}
                </button>
              </div>

              {/* Decorative Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-yellow-400/5 blur-[100px] pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16 pb-6 border-b border-white/10">
              {t("PortfolioCompanies")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <PortfolioCard
                icon={<Zap size={32} />}
                title={t("card1.title")}
                desc={t("card1.description")}
              />
              <PortfolioCard
                icon={<Cpu size={32} />}
                title={t("card2.title")}
                desc={t("card2.description")}
              />
              <PortfolioCard
                icon={<Database size={32} />}
                title={t("card3.title")}
                desc={t("card3.description")}
              />
              <PortfolioCard
                icon={<Activity size={32} />}
                title={t("card4.title")}
                desc={t("card4.description")}
              />
            </div>
          </div>
        </section>
        <section className="py-24 bg-neutral-900/30 border-y border-white/5 px-4">
          <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-10">
                {t.rich("IncubationProcess", {
                    theme: (chunk) => (
                      <span className="text-theme">{chunk}</span>
                    ),
                  })}
              </h2>
              <div className="space-y-10">
                <ProcessStep
                  number="01"
                  title={t("process1.title")}
                  desc={t("process1.description")}
                />
                <ProcessStep
                  number="02"
                  title={t("process2.title")}
                  desc={t("process2.description")}
                />
                <ProcessStep
                  number="03"
                  title={t("process3.title")}
                  desc={t("process3.description")}
                />
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden border border-yellow-400/30 group">
              {/* Using a standard img tag for simplicity, replace with next/image in production */}
              <img
                src="https://picsum.photos/800/800?random=15"
                alt="Incubation Process"
                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
