import DocsSidebar from "@/components/DocsSidebar";
import PageLayout from "@/components/PageLayout";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Matching the HTML structure provided by user
  const docsItems = [
    {
      label: "Getting Started",
      children: [
        { label: "Introduction", href: "#intro" },
        { label: "SDK Setup", href: "#setup" },
        { label: "Quick Start", href: "#quickstart" },
      ],
    },
    {
      label: "Core Concepts",
      children: [
        { label: "Proof of Inference", href: "#poi" },
        { label: "State Channels", href: "#state-channels" },
        { label: "Token Economics", href: "#tokenomics" },
      ],
    },
    {
      label: "API Reference",
      children: [
        { label: "Inference API", href: "#inference-api" },
        { label: "Model Registry", href: "#model-registry" },
        { label: "Billing & Usage", href: "#billing" },
      ],
    },
  ];

  return (
    <PageLayout isShowFooter>
      <div className="container mx-auto flex gap-12 pt-[120px] pb-20 px-6">
        <DocsSidebar items={docsItems} />
        <main className="docs-content flex-1 max-w-[800px]">{children}</main>
      </div>
    </PageLayout>
  );
}
