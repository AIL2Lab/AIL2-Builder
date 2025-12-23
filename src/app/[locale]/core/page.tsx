import PageLayout from "@/components/PageLayout";
import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Locale, useTranslations } from "next-intl";
import { Metadata } from "next";
import { Badge } from "@/components/core/Badge";
import {
  Activity,
  ArrowRight,
  Box,
  Cpu,
  FileText,
  Globe,
  History,
  Scale,
  Settings,
  ShieldCheck,
  Upload,
  Zap,
  ZapOff,
} from "lucide-react";
import { Card } from "@/components/core/Card";
import { SectionTitle } from "@/components/core/SectionTitle";
import { CodeBlock } from "@/components/core/CodeBlock";
import { FAQItem } from "@/components/core/FAQItem";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: `${t("core.title")} | ${t("subtitle")}`,
    description: `${t("core.description")}`,
  };
}

export default function ContactPage({ params }: PageProps<"/[locale]/core">) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale as Locale);
  const t = useTranslations("Core");
  return (
    <PageLayout isShowFooter>
      <div className="relative w-full max-w-6xl mx-auto px-5">
        <div className="space-y-32 mt-20 lg:mt-30">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                {t.rich("title", {
                    theme: (chunk) => <span className="text-theme">{chunk}</span>
                })}
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                {t("description")}
              </p>
              <div className="flex flex-wrap gap-3 items-center opacity-70">
                {["ETH", "BNB", "XLayer", "Base", "Mantle", "GIWA"].map(
                  (chain) => (
                    <span
                      key={chain}
                      className="px-3 py-1 bg-neutral-900 border border-gray-800 rounded-full text-xs font-bold text-gray-500"
                    >
                      {chain}
                    </span>
                  )
                )}
              </div>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-brand-gold text-black font-bold rounded-xl bg-theme hover:bg-white hover:scale-105 transition-all">
                  {t("openBtn")}
                </button>
                <button className="px-8 py-4 bg-transparent border border-gray-700 text-white font-bold rounded-xl hover:border-theme hover:text-theme transition-all">
                  {t("readBtn")}
                </button>
              </div>
            </div>
            <div className="relative h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-brand-gold/5 blur-[120px] rounded-full"></div>
              <div className="relative w-72 h-72 animate-[spin_12s_linear_infinite]">
                <div className="absolute inset-0 border-2 border-brand-gold/20 rounded-full border-dashed"></div>
                <div className="absolute inset-8 border-2 border-brand-gold/40 rounded-full border-dotted"></div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black border border-brand-gold p-4 rounded-2xl shadow-2xl">
                  <Cpu className="text-brand-gold" size={32} />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-4 bg-black border border-gray-700 p-3 rounded-xl">
                  <span className="text-brand-gold font-bold text-xs uppercase">
                    100x Faster
                  </span>
                </div>
              </div>
              {/* Static floating text */}
              <div className="absolute text-7xl font-black text-white/5 select-none pointer-events-none">
                AIL2
              </div>
            </div>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="text-theme" />,
                title: t("card1.title"),
                desc: t("card1.description"),
              },
              {
                icon: <History className="text-theme" />,
                title: t("card2.title"),
                desc: t("card2.description"),
              },
              {
                icon: <Globe className="text-theme" />,
                title: t("card3.title"),
                desc: t("card3.description"),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 bg-neutral-900/50 border border-gray-800 rounded-2xl"
              >
                <div className="shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </section>
          <section className="text-center space-y-12">
            <h2 className="text-4xl md:text-5xl font-black max-w-4xl mx-auto leading-tight">
              {t("coreStack.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <Card className="bg-black/50">
                <h4 className="text-theme font-bold mb-4 flex items-center gap-2">
                  <Upload size={18} /> {t("coreStack.card1.title")}
                </h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex gap-2">
                    <ArrowRight
                      size={14}
                      className="text-theme shrink-0 mt-0.5"
                    />
                    {t("coreStack.card1.item1")}
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight
                      size={14}
                      className="text-theme shrink-0 mt-0.5"
                    />{" "}
                    {t("coreStack.card1.item2")}
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight
                      size={14}
                      className="text-theme shrink-0 mt-0.5"
                    />{" "}
                    {t("coreStack.card1.item3")}
                  </li>
                </ul>
              </Card>
              <Card className="bg-brand-gold/5 border-brand-gold/20">
                <h4 className="text-theme font-bold mb-4 flex items-center gap-2">
                  <Settings size={18} /> {t("coreStack.card2.title")}
                </h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex gap-2">
                    <ArrowRight
                      size={14}
                      className="text-theme shrink-0 mt-0.5"
                    />
                    {t("coreStack.card2.item1")}
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight
                      size={14}
                      className="text-theme shrink-0 mt-0.5"
                    />
                    {t("coreStack.card2.item2")}
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight
                      size={14}
                      className="text-theme shrink-0 mt-0.5"
                    />
                    {t("coreStack.card2.item3")}
                  </li>
                </ul>
              </Card>
              <Card className="bg-black/50">
                <h4 className="text-theme font-bold mb-4 flex items-center gap-2">
                  <Zap size={18} /> {t("coreStack.card3.title")}
                </h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex gap-2">
                    <ArrowRight
                      size={14}
                      className="text-theme shrink-0 mt-0.5"
                    />
                    {t("coreStack.card3.item1")}
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight
                      size={14}
                      className="text-theme shrink-0 mt-0.5"
                    />
                    {t("coreStack.card3.item2")}
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight
                      size={14}
                      className="text-theme shrink-0 mt-0.5"
                    />
                    {t("coreStack.card3.item3")}
                  </li>
                </ul>
              </Card>
            </div>
          </section>
          <section>
            <SectionTitle
              title={t("CoreProtocol.title")}
              subtitle={t("CoreProtocol.description")}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Activity size={24} className="text-theme"/>,
                  title: t("CoreProtocol.card1.title"),
                  desc: t("CoreProtocol.card1.description"),
                },
                {
                  icon: <Box size={24} className="text-theme" />,
                  title: t("CoreProtocol.card2.title"),
                  desc: t("CoreProtocol.card2.description"),
                },
                {
                  icon: <FileText size={24} className="text-theme"/>,
                  title: t("CoreProtocol.card3.title"),
                  desc: t("CoreProtocol.card3.description"),
                },
                {
                  icon: <Scale size={24} className="text-theme"/>,
                  title: t("CoreProtocol.card4.title"),
                  desc: t("CoreProtocol.card4.description"),
                },
                {
                  icon: <ShieldCheck size={24} className="text-theme"/>,
                  title: t("CoreProtocol.card5.title"),
                  desc: t("CoreProtocol.card5.description"),
                },
                {
                  icon: <ZapOff size={24} className="text-theme"/>,
                  title: t("CoreProtocol.card6.title"),
                  desc: t("CoreProtocol.card6.description"),
                },
              ].map((feat, i) => (
                <div
                  key={i}
                  className="p-8 bg-neutral-900 border border-gray-800 rounded-3xl hover:border-brand-gold group transition-all"
                >
                  <div className="w-12 h-12 bg-black border border-gray-800 rounded-xl flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <h4 className="text-xl font-bold text-brand-gold mb-3">
                    {feat.title}
                  </h4>
                  <p className="text-gray-400 mb-4">{feat.desc}</p>
                  <button className="text-theme text-xs font-bold text-brand-gold flex items-center gap-1 hover:gap-2 transition-all">
                    Learn more <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="max-w-4xl mx-auto">
                
              <SectionTitle
                title={t("Settlement.title")}
                subtitle={t("Settlement.description")}
              />
              <div className="space-y-4">
                {[
                  t("Settlement.item1"),
                  t("Settlement.item2"),
                  t("Settlement.item3"),
                  t("Settlement.item4"),
                  t("Settlement.item5"),
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-6 items-center p-6 bg-neutral-900/30 rounded-2xl border border-gray-800 hover:bg-neutral-900 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full border border-theme text-theme flex items-center justify-center font-bold shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-gray-300 font-medium">{step}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-500 mt-12 text-sm italic">
                {t("Settlement.subDescription")}
              </p>
            </div>
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionTitle
                title={t("start.title")}
                subtitle={t("start.description")}
              />
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0"></div>
                    <div>
                      <p className="text-white font-bold">{t("start.item1.title")}</p>
                      <p className="text-sm text-gray-500">
                        {t("start.item1.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0"></div>
                    <div>
                      <p className="text-white font-bold">{t("start.item2.title")}</p>
                      <p className="text-sm text-gray-500">
                        {t("start.item2.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0"></div>
                    <div>
                      <p className="text-white font-bold">{t("start.item3.title")}</p>
                      <p className="text-sm text-gray-500">
                        {t("start.item3.description")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock
                language="bash (Inference Request)"
                code={`curl -X POST "https://api.ail2.network/v1/infer" \\
  -H "Authorization: Bearer $AIL2_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "p_123",
    "model_id": "nebula-ai",
    "version": "1.2.3",
    "input": {"prompt": "Explain zk-proof in 3 bullets"},
    "options": {"timeout_ms": 12000}
  }'`}
              />
              <CodeBlock
                language="json (Response with Receipt)"
                code={`{
  "output": {"text": "..."},
  "receipt": {
    "receipt_id": "rcpt_9f3a...",
    "tokens": 1240,
    "gpu_sec": 0.84,
    "fee": "0.024",
    "node": "gpu-kr-0281"
  }
}`}
              />
            </div>
          </section>
          <section>
            <SectionTitle title={t("CoreCap.title")} />
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-widest">
                      {t("CoreCap.th1")}
                    </th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-widest">
                      {t("CoreCap.th2")}
                    </th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-widest">
                      {t("CoreCap.th3")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {[
                    [
                      "Inference API",
                      t("CoreCap.tr1"),
                      "HTTP/WS Support",
                    ],
                    [
                      "Streaming",
                      t("CoreCap.tr2"),
                      "p99 < 50ms TTFT",
                    ],
                    [
                      "Model Registry",
                      t("CoreCap.tr3"),
                      "Integrated CI/CD",
                    ],
                    [
                      "Receipts",
                      t("CoreCap.tr4"),
                      "Audit-ready anytime",
                    ],
                    [
                      "Settlement",
                      t("CoreCap.tr5"),
                      "Settles on Mainnet",
                    ],
                    [
                      "Policies",
                      t("CoreCap.tr6"),
                      "Configurable per key",
                    ],
                  ].map(([cap, get, note], i) => (
                    <tr
                      key={i}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-6 px-6 font-bold text-white">{cap}</td>
                      <td className="py-6 px-6 text-gray-400">{get}</td>
                      <td className="py-6 px-6 text-brand-gold text-sm font-medium">
                        {note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="max-w-4xl mx-auto">
            <SectionTitle title={t("FAQ.title")} />
            <div className="bg-brand-panel p-8 rounded-3xl border border-brand-border">
              <FAQItem
                question={t("FAQ.q1.question")}
                answer={t("FAQ.q1.answer")}
              />
              <FAQItem
                question={t("FAQ.q2.question")}
                answer={t("FAQ.q2.answer")}
              />
              <FAQItem
                question={t("FAQ.q3.question")}
                answer={t("FAQ.q3.answer")}
              />
            </div>
          </section>
          <section className="text-center py-20 bg-gradient-to-b from-neutral-900 to-black rounded-[40px] border border-brand-gold/20">
            <h3 className="text-4xl font-black mb-8">
              {t("Integrate.title")}
            </h3>
            <div className="flex justify-center gap-6">
              <button className="px-12 py-4 bg-theme text-black font-bold rounded-xl hover:bg-white hover:scale-105 transition-all">
                {t("Integrate.openBtn")}
              </button>
              <button className="px-12 py-4 bg-transparent border border-gray-700 text-white font-bold rounded-xl hover:border-theme transition-all">
                {t("Integrate.readBtn")}
              </button>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
