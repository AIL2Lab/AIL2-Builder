"use client";

import { useTranslations } from "next-intl";
import { FAQItem } from "@/components/core/FAQItem";

export default function HomeFAQSection() {
  const t = useTranslations("Home.faqSection");

  const faqs = [
    {
      question: t("q1.question"),
      answer: t("q1.answer"),
    },
    {
      question: t("q2.question"),
      answer: t("q2.answer"),
    },
    {
      question: t("q3.question"),
      answer: t("q3.answer"),
    },
    {
      question: t("q4.question"),
      answer: t("q4.answer"),
    },
    {
      question: t("q5.question"),
      answer: t("q5.answer"),
    },
  ];

  return (
    <section className="container mx-auto lg:max-w-5xl my-5 sm:my-8 md:my-12 lg:my-16 px-5">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          {t("title")}
        </h2>
        <p className="text-gray-400 text-lg">{t("subtitle")}</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}
