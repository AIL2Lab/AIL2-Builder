import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ViewTransition } from "react";
import ContextProvider from "@/context/providers";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner"
import "../globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
})

export async function generateMetadata({params}: { params: Promise<{ locale: string }> }) : Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({locale, namespace: 'site'})
  return {
    title: t('name'),
    description: t('description'),
    authors: [
      {
        name: 'AIL2Lab',
        url: 'https://github.com/AIL2Lab'
      }
    ],
    creator: "AIL2Lab",
  }
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: LayoutProps<'/[locale]'>) {
  const {locale} = await params;
  if(!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale);
  const headersList = await headers()
  const cookies = headersList.get('cookie');
  return (
    <html lang={locale} className="dark">
      <body
        className={`${sora.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          <ContextProvider cookies={cookies}>
            <ViewTransition>
              {children}
            </ViewTransition>
            <Toaster />
          </ContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
