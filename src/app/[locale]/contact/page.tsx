import PageLayout from "@/components/PageLayout";
import Plant from "@/components/Plant";
import TagFilter from "@/components/ecosystem/TagFilter";
import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Locale, useTranslations } from "next-intl";
import { Metadata } from "next";
import ContactForm from "@/components/contact-us/ContactForm";
import { Linkedin, MessageCircle, Twitter } from "lucide-react";

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


export default function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale as Locale);
  const t = useTranslations("Ecosystem")
  return (
    <PageLayout isShowFooter>
      <main className="pt-36">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact <span className="text-yellow-500">Us</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-16">
              Get in touch with the team building the future of decentralized intelligence.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <ContactForm />
              {/* Office and Social Info */}
              <div className="space-y-8">
                <div className="bg-[#111111] rounded-xl p-8 border border-white/8 hover:border-theme/80 hover:-translate-y-2 transition-all duration-300">
                  <h4 className="text-yellow-500 text-xl font-semibold mb-4">Global Offices</h4>
                  <div className="space-y-3 text-gray-400">
                    <p>San Francisco, CA</p>
                    <p>Singapore</p>
                    <p>Zug, Switzerland</p>
                  </div>
                </div>
                <div className="bg-[#111111] rounded-xl p-8 border border-white/8 hover:border-theme/80 hover:-translate-y-2 transition-all duration-300">
                  <h4 className="text-yellow-500 text-xl font-semibold mb-4">Social Channels</h4>
                  <div className="flex space-x-6">
                    <a
                      href="#"
                      className="border border-gray-700 rounded-lg p-3 hover:border-yellow-500 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="border border-gray-700 rounded-lg p-3 hover:border-yellow-500 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="border border-gray-700 rounded-lg p-3 hover:border-yellow-500 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

    </PageLayout>
  );
}
