import { Globe } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Plant from "@/components/Plant";
import { TwitterIcon } from "@/components/icons/Twitter";
import TagFilter from "@/components/ecosystem/TagFilter";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { Locale, useTranslations } from "next-intl";

const ecosystemItems = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: "Depin X",
  isHighlighted: i === 1,
  description:
    "Powered by a GPU miner network, AIL2 eliminates developer burdens in AI model deployment and maintenance.",
}));

export default function EcosystemPage({
  params,
}: PageProps<"/[locale]/ecosystem">) {
  const t = useTranslations("Ecosystem")
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale as Locale);
  return (
    <PageLayout isShowFooter>
      <div className="flex flex-col">
        <section className="mt-30 sm:mt-60">
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8">
              {t.rich('title', {br: () => <br />})}
            </h1>

            <div className="border border-theme/20 rounded-2xl p-4 md:p-6 max-w-2xl backdrop-blur-sm">
              <p className="text-theme text-sm md:text-base leading-relaxed">
                {t.rich('subtitle', {br: () => <br />})}
              </p>
            </div>
          </div>
        </section>
        <div className="relative">
          <Plant rotate={-20} />
        </div>
        <TagFilter />
        <section className="relative z-10 px-4 max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystemItems.map((item) => (
              <div
                key={item.id}
                className={`
                group p-6 rounded-2xl border transition-all duration-300 bg-[#0A0A0A]
                ${
                  item.isHighlighted
                    ? "border-[#FFD700]/80 shadow-[0_0_20px_rgba(255,215,0,0.05)]"
                    : "border-white/5 hover:border-white/10"
                }
              `}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded border flex items-center justify-center 
                    ${
                      item.isHighlighted
                        ? "border-[#FFD700] text-[#FFD700]"
                        : "border-white/20 text-white"
                    }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-5 h-5"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <span className="font-bold text-lg text-white">
                      DePIN <span className="font-light">X</span>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-md bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors">
                      <Globe size={14} />
                    </button>
                    <button className="p-1.5 rounded-md bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors">
                      <TwitterIcon size={14} fill="white" />
                    </button>
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    item.isHighlighted ? "text-[#FFD700]" : "text-white"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
