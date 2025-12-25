import PageLayout from "@/components/PageLayout";
import QuestionSelector from "@/components/faq/QuestionSelector";
import { Metadata } from "next";
import { Locale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: `${t("faq.title")} | ${t("subtitle")}`,
    description: `${t("faq.description")}`,
  };
}

export function generateStaticParams() {
  const { locales } = routing;
  return locales.map((locale) => ({ locale }));
}

export default function FAQPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale as Locale);

  const t = useTranslations("Faq");
  const questions = [
    {
      text: t("q1.question"),
      answerText: t("q1.answer"),
    },
    {
      text: t("q2.question"),
      answerText: t.rich("q2.answer", {
        br: () => <br />
      }),
    },
    {
      text: t("q3.question"),
      answerText: t.rich("q3.answer", {
        br: () => <br />,
        strong: (chunk) => <strong>{chunk}</strong>
      }),
    },
    {
      text: t("q4.question"),
      answerText: t.rich("q4.answer", {
        br: () => <br />,
        strong: (chunk) => <strong>{chunk}</strong>
      }),
    },
    {
      text: t("q5.question"),
      answerText: t.rich("q5.answer", {
        br: () => <br />,
        strong: (chunk) => <strong>{chunk}</strong>
      }),
    },
    {
      text: t("q6.question"),
      answerText: t.rich("q6.answer", {
        strong: (chunk) => <strong>{chunk}</strong>
      }),
    },
    {
      text: t("q7.question"),
      answerText: t.rich("q7.answer", {
        br: () => <br />,
        strong: (chunk) => <strong>{chunk}</strong>
      }),
    },
    {
      text: t("q8.question"),
      answerText: t.rich("q8.answer", {
        strong: (chunk) => <strong>{chunk}</strong>
      }),
    },
    {
      text: t("q9.question"),
      answerText: t.rich("q9.answer", {
        br: () => <br />,
        strong: (chunk) => <strong>{chunk}</strong>
      }),
    },
    {
      text: t("q10.question"),
      answerText: t.rich("q10.answer", {
        br: () => <br />,
        strong: (chunk) => <strong>{chunk}</strong>
      }),
    },
    {
      text: t("q11.question"),
      answerText: t("q11.answer"),
    },
    {
      text: t("q12.question"),
      answerText: t("q12.answer"),
    },
    {
      text: t("q13.question"),
      answerText: t("q13.answer"),
    },
  ];
  return (
    <PageLayout isShowFooter>
      <section className="w-full mx-auto lg:max-w-6xl my-5 sm:my-8 md:my-12 lg:my-16 px-5">
        <div className="mb-12 mt-20 lg:mt-30 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            FAQ
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl">{t("description")}</p>
        </div>
        <QuestionSelector questions={questions} />
      </section>
    </PageLayout>
  );
}
