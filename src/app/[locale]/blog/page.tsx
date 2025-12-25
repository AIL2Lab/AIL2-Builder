import PageLayout from "@/components/PageLayout";
import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Locale } from "next-intl";
import { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: `${t("blog.title")} | ${t("subtitle")}`,
    description: `${t("blog.description")}`,
  };
}

export default function BlogPage({
  params,
}: PageProps<"/[locale]/blog">) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale as Locale);
  return (
    <PageLayout isShowFooter>
      <BlogList />
    </PageLayout>
  );
}
