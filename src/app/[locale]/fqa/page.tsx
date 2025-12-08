import PageLayout from "@/components/PageLayout";
import QuestionSelector from "@/components/fqa/QuestionSelector";
import { Metadata } from "next";
import { Locale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
const questions = [
  {
    id: 1,
    text: "How to achieve 100x speedup",
    answerTitle: `Multi-Chain 
Acceleration & Seamless Interoperability`,
    answerText: `AIL2 provides 100x faster decentralized AI development across ETH, BSC, GIWA, XLayer, Base, and Mantle.
It overcomes single-chain limitations for seamless multi-chain operations.
Enables effortless cross-chain AI application deployment without technical barriers.
Innovatively streamlines workflows, ensuring efficient and scalable cross-chain AI integration.`,
  }
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: `FQA | ${t("subtitle")}`,
    description: "Frequently asked questions",
  };
}

export default function FAQPage({ params }: PageProps<"/[locale]/fqa">) {
  const t = useTranslations("Fqa")
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale as Locale);
  return (
    <PageLayout isShowFooter>
      <section className="w-full mx-auto lg:max-w-6xl my-5 sm:my-8 md:my-12 lg:my-16 px-5">
        <div className="mb-12 mt-20 lg:mt-30 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">FAQ</h1>
          <p className="text-lg md:text-xl lg:text-2xl">{t("description")}</p>
        </div>
        <QuestionSelector questions={questions} />
      </section>
    </PageLayout>
  );
}
