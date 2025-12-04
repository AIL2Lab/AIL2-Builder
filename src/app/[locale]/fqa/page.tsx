import PageLayout from "@/components/PageLayout";
import QuestionSelector from "@/components/fqa/QuestionSelector";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
  },
  {
    id: 2,
    text: "How to achieve 100x speedup",
    answerTitle: `Multi-Chain 
Acceleration & Seamless Interoperability`,
    answerText: `AIL2 provides 100x faster decentralized AI development across ETH, BSC, GIWA, XLayer, Base, and Mantle.
It overcomes single-chain limitations for seamless multi-chain operations.
Enables effortless cross-chain AI application deployment without technical barriers.
Innovatively streamlines workflows, ensuring efficient and scalable cross-chain AI integration.`,
  },
  {
    id: 3,
    text: "How to achieve 100x speedup",
    answerTitle: `Multi-Chain 
Acceleration & Seamless Interoperability`,
    answerText: `AIL2 provides 100x faster decentralized AI development across ETH, BSC, GIWA, XLayer, Base, and Mantle.
It overcomes single-chain limitations for seamless multi-chain operations.
Enables effortless cross-chain AI application deployment without technical barriers.
Innovatively streamlines workflows, ensuring efficient and scalable cross-chain AI integration.`,
  },
];

export async function generateMetadata({params}: { params: Promise<{ locale: string }> }) : Promise<Metadata>  {
    const { locale } = await params
    const t = await getTranslations({locale, namespace: 'site'})
    return {
      title: `FQA | ${t('subtitle')}`,
      description: 'Frequently asked questions'
    }
}

export default function FAQPage() {
  return (
    <PageLayout isShowFooter>
      <section className="w-full mx-auto lg:max-w-6xl my-5 sm:my-8 md:my-12 lg:my-16 px-5">
        <div className="mb-12 mt-30">
          <h1 className="text-6xl font-bold mb-2">FAQ</h1>
          <p className="text-2xl">Frequently asked questions</p>
        </div>
        <QuestionSelector questions={questions} />
      </section>
    </PageLayout>
  );
}
