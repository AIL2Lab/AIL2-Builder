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
  const t = useTranslations("Platform");
  return (
    <PageLayout isShowFooter>
      <main className="pt-32 pb-20">
        <section className="py-20 text-center px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              $50M Ecosystem <span className="text-yellow-400">Fund</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-20 leading-relaxed">
              A strategic commitment to bootstrap the next generation of
              decentralized AI infrastructure, models, and consumer
              applications.
            </p>

            {/* Investment Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
              <CategoryCard
                icon={<Database size={24} />}
                title="Infrastructure"
                desc="Decentralized storage, compute networks, and DA layers for AI."
              />
              <CategoryCard
                icon={<Cpu size={24} />}
                title="Base Models"
                desc="Open-source fine-tuned models optimized for AIL2 nodes."
              />
              <CategoryCard
                icon={<Bot size={24} />}
                title="Agentic Apps"
                desc="Autonomous agents solving real-world problems on-chain."
              />
              <CategoryCard
                icon={<Hammer size={24} />}
                title="Dev Tools"
                desc="SDKs, debuggers, and monitoring stacks for AI builders."
              />
            </div>

            {/* Glass Panel / Feature Section */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900 to-black p-8 md:p-16 text-left">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* Left: Text Content */}
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8">
                    What we offer
                  </h2>
                  <div className="space-y-8">
                    <BenefitItem
                      title="Strategic Grants"
                      desc="Milestone-based funding from $10k to $100k."
                    />
                    <BenefitItem
                      title="Compute Credits"
                      desc="Free access to AIL2's H100 GPU clusters for training."
                    />
                    <BenefitItem
                      title="VC Introduction"
                      desc="Direct pipeline to leading Tier-1 crypto and AI venture capital."
                    />
                  </div>

                  <div className="mt-10">
                    <button className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2">
                      Apply for Grant <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Right: Video Placeholder */}
                <div className="flex-1 w-full">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black group cursor-pointer">
                    {/* Placeholder Image */}
                    <img
                      src="https://picsum.photos/800/600?random=11"
                      alt="Fund Intro Video"
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                    />

                    {/* Play Button */}
                    {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.4)] group-hover:scale-110 transition-transform duration-300">
                      <Play
                        fill="black"
                        className="ml-1 text-black"
                        size={32}
                      />
                    </div> */}
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
