import PageLayout from "@/components/PageLayout";
import Plant from "@/components/Plant";
import TagFilter from "@/components/ecosystem/TagFilter";
import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Locale, useTranslations } from "next-intl";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: `${t("ecosystem.title")} | ${t("subtitle")}`,
    description: `${t("ecosystem.description")}`,
  };
}


export default function EcosystemPage({
  params,
}: PageProps<"/[locale]/ecosystem">) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale as Locale);
  const t = useTranslations("Ecosystem")
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
      </div>
    </PageLayout>
  );
}
