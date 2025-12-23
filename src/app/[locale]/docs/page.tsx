import { CodeBlock } from "@/components/docs/CodeBlock";
import { Sidebar } from "@/components/docs/Sidebar";
import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";
import { Locale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: `${t("docs.title")} | ${t("subtitle")}`,
    description: `${t("docs.description")}`,
  };
}

export default function DocsPage({
  params,
}: PageProps<"/[locale]/docs">) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale as Locale);
  const t = useTranslations("Docs");

  return (
    <PageLayout isShowFooter={false}>
      <div className="max-w-[1440px] mx-auto flex">
        <Sidebar />
        <main className="flex-1 lg:pl-72 pt-32">
          <div className="max-w-4xl mx-auto px-8 lg:px-12 py-10">
            <section id="introduction" className="mb-24 scroll-mt-40">
              <h1 className="text-7xl font-extrabold text-white tracking-tight mb-4">
                {t("title")}
              </h1>
              <p className="text-xl text-slate-400 mb-16 max-w-2xl leading-relaxed font-medium">
                {t("description")}
              </p>

              <h2 className="text-3xl font-bold text-white mb-8">
                {t("introduction.title")}
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-10">
                {t("introduction.description")}
              </p>

              <div className="bg-yellow-500/3 border-l-[3px] border-l-yellow-500 p-6 rounded-xl flex items-start space-x-4 mb-12">
                <div className="mt-1">
                  <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t.rich("introduction.note", {
                    text: (chunk) => (
                      <span className="font-bold text-white">{chunk}</span>
                    ),
                  })}
                </p>
              </div>
            </section>
            <section id="sdk-installation" className="mb-24 scroll-mt-40">
              <h2 className="text-3xl font-bold text-white mb-8 underline decoration-brand-accent/30 underline-offset-8">
                {t("sdk.title")}
              </h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                {t("sdk.text1")}
              </p>
              <CodeBlock
                language="bash"
                code={`npm install @ail2/sdk ethers`}
              />
              <p className="text-slate-400 my-8">{t("sdk.text2")}</p>
              <CodeBlock
                language="javascript"
                code={`import { AIL2Client } from '@ail2/sdk';

const client = new AIL2Client({
  projectId: 'your_project_id_here', // 从开发者控制台获取
  apiKey: 'your_api_key_here' // 妥善保管你的密钥
});`}
              />
            </section>
            <section id="quick-start" className="mb-24 scroll-mt-40">
              <h2 className="text-3xl font-bold text-white mb-8 underline decoration-brand-accent/30 underline-offset-8">
                {t("quickstart.title")}
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {t("quickstart.text")}
              </p>
              <CodeBlock
                language="bash"
                code={`curl -X POST "https://api.ail2.network/v1/infer" \\
  -H "Authorization: Bearer $AIL2_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "p_12345",
    "model_id": "nebula-ai",
    "input": {"prompt": "Explain decentralized AI in simple terms"}
  }'`}
              />
              <p className="text-white font-bold mt-10 mb-4">
                {t("quickstart.example")}
              </p>
              <CodeBlock
                language="json"
                code={`{
  "task_id": "task_abc678def",
  "status": "processing",
  "results": "Decentralized AI distributes computation across a network..."
}`}
              />
            </section>
            <section id="core-concepts" className="mb-24 scroll-mt-40">
              <h2 className="text-3xl font-bold text-white mb-12 underline decoration-brand-accent/30 underline-offset-8">
                {t("coreConcepts.title")}
              </h2>
              <div className="grid grid-cols-1 gap-10">
                <div
                  id="proof-of-inference"
                  className="p-10 rounded-2xl bg-[#080808] border border-white/5 hover:border-brand-accent/30 transition-all group shadow-xl"
                >
                  <h3 className="text-2xl font-bold text-brand-accent mb-6 flex items-center">
                    {t("coreConcepts.inference.title")}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-lg">
                    {t("coreConcepts.inference.description")}
                  </p>
                </div>
                <div
                  id="state-channels"
                  className="p-10 rounded-2xl bg-[#080808] border border-white/5 hover:border-brand-accent/30 transition-all group shadow-xl"
                >
                  <h3 className="text-2xl font-bold text-brand-accent mb-6 flex items-center">
                    {t("coreConcepts.stateChannels.title")}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-lg">
                    {t("coreConcepts.stateChannels.description")}
                  </p>
                </div>
                <div
                  id="token-economics"
                  className="p-10 rounded-2xl bg-[#080808] border border-white/5 hover:border-brand-accent/30 transition-all group shadow-xl"
                >
                  <h3 className="text-2xl font-bold text-brand-accent mb-6 flex items-center">
                    {t("coreConcepts.token.title")}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-lg">
                    {t("coreConcepts.token.description")}
                  </p>
                </div>
              </div>
            </section>
            <section id="api-reference" className="mb-24 scroll-mt-40">
              <h2 className="text-3xl font-bold text-white mb-12 underline decoration-brand-accent/30 underline-offset-8">
                {t("api.title")}
              </h2>
              <div id="api-infer" className="mb-20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  {t("api.inference")}
                  <span className="ml-4 px-3 py-1 bg-slate-800 text-white text-[11px] font-black rounded tracking-widest">
                    POST
                  </span>
                  <code className="ml-4 text-brand-accent/80 font-mono text-base">
                    /v1/infer
                  </code>
                </h3>
                <p className="text-slate-400 mb-8 text-lg">{t("api.text1")}</p>

                <div className="bg-[#050505] rounded-xl p-8 border border-white/5 mb-10">
                  <h4 className="font-black text-slate-500 mb-6 text-xs uppercase tracking-widest">
                    Request Body Parameters
                  </h4>
                  <ul className="space-y-6">
                    <li className="flex flex-col md:flex-row md:items-start border-b border-white/5 pb-6 last:border-0 last:pb-0">
                      <div className="md:w-1/3 mb-2 md:mb-0">
                        <code className="text-theme font-bold text-base">
                          project_id
                        </code>
                        <div className="text-[10px] text-slate-500 font-bold mt-1">
                          STRING / REQUIRED
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm flex-1 leading-relaxed">
                        {t("api.col1")}
                      </p>
                    </li>
                    <li className="flex flex-col md:flex-row md:items-start border-b border-white/5 pb-6 last:border-0 last:pb-0">
                      <div className="md:w-1/3 mb-2 md:mb-0">
                        <code className="text-theme font-bold text-base">
                          model_id
                        </code>
                        <div className="text-[10px] text-slate-500 font-bold mt-1">
                          STRING / REQUIRED
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm flex-1 leading-relaxed">
                        {t("api.col2")}
                      </p>
                    </li>
                    <li className="flex flex-col md:flex-row md:items-start border-b border-white/5 pb-6 last:border-0 last:pb-0">
                      <div className="md:w-1/3 mb-2 md:mb-0">
                        <code className="text-theme font-bold text-base">
                          input
                        </code>
                        <div className="text-[10px] text-slate-500 font-bold mt-1">
                          OBJECT / REQUIRED
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm flex-1 leading-relaxed">
                        {t("api.col3")}
                      </p>
                    </li>
                    <li className="flex flex-col md:flex-row md:items-start">
                      <div className="md:w-1/3 mb-2 md:mb-0">
                        <code className="text-theme font-bold text-base">
                          parameters
                        </code>
                        <div className="text-[10px] text-slate-500 font-bold mt-1">
                          OBJECT / OPTIONAL
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm flex-1 leading-relaxed">
                        {t("api.col4")}
                      </p>
                    </li>
                  </ul>
                </div>
                <p className="text-slate-500 text-sm italic">
                  {t("api.text2")}
                </p>
              </div>
              <div id="api-models">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  {t("api.modelRegistry")}
                  <span className="ml-4 px-3 py-1 bg-slate-800 text-white text-[11px] font-black rounded tracking-widest">
                    GET
                  </span>
                  <code className="ml-4 text-brand-accent/80 font-mono text-base">
                    /v1/models
                  </code>
                </h3>
                <p className="text-slate-400 mb-8 text-lg">{t("api.text3")}</p>

                <div className="bg-[#050505] rounded-xl p-8 border border-white/5">
                  <h4 className="font-black text-slate-500 mb-6 text-xs uppercase tracking-widest">
                    Query Parameters
                  </h4>
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="md:w-1/3 mb-2 md:mb-0">
                      <code className="text-theme font-bold text-base">id</code>
                      <div className="text-[10px] text-slate-500 font-bold mt-1">
                        STRING / OPTIONAL
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm flex-1 leading-relaxed">
                      {t("api.col5")}
                    </p>
                  </div>
                </div>
                <p className="text-slate-500 text-sm mt-6 italic">
                  {t("api.text4")}
                </p>
              </div>
            </section>
            <section id="billing" className="mb-24 scroll-mt-40">
              <h2 className="text-3xl font-bold text-white mb-10 underline decoration-brand-accent/30 underline-offset-8">
                {t("bill.title")}
              </h2>
              <div className="bg-[#0A0A0A] rounded-2xl p-10 border border-white/5 shadow-2xl">
                <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                  {t("bill.description")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-accent/20 transition-all">
                    <h4 className="font-bold text-white mb-4 text-lg">
                      {t("bill.item1.title")}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {t("bill.item1.description")}
                    </p>
                  </div>
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-accent/20 transition-all">
                    <h4 className="font-bold text-white mb-4 text-lg">
                      {t("bill.item2.title")}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {t("bill.item2.description")}
                    </p>
                  </div>
                </div>

                <div className="p-10 rounded-2xl bg-brand-accent/5 border border-brand-accent/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
                  <h4 className="text-xl font-bold text-white mb-6 relative z-10">
                    {t("bill.pay")}
                  </h4>
                  <p className="text-slate-400 text-sm mb-8 relative z-10">
                    {t("bill.text")}
                  </p>
                  <div className="flex flex-wrap gap-4 relative z-10">
                    {["ETH", "BSC", "GIWA", "XLayer", "Base", "Mantle"].map(
                      (chain) => (
                        <span
                          key={chain}
                          className="px-5 py-2 bg-black border border-white/10 rounded-xl text-xs font-black text-theme tracking-widest shadow-lg"
                        >
                          {chain}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </PageLayout>
  );
}
