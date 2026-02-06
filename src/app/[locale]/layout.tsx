import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ViewTransition } from "react";
import "../globals.css";
import Script from "next/script";

// JSON-LD Structured Data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AIL2",
  "alternateName": "AIL2 - Decentralized AI Superlayer",
  "url": "https://ail2.org",
  "logo": "https://ail2.org/svg/logo.svg",
  "description": "AIL2 is a decentralized AI infrastructure and DeAI ecosystem powered by GPU mining for AI. Deploy AI models on-chain with our Web3 AI SDK across ETH, BSC, XLayer, Base, Mantle, and GIWA.",
  "sameAs": [
    "https://twitter.com/AIL2Official",
    "https://github.com/AIL2Lab",
    "https://discord.gg/ail2"
  ],
  "foundingDate": "2024",
  "areaServed": "Global",
  "knowsAbout": [
    "Decentralized AI",
    "Web3 Infrastructure",
    "GPU Mining for AI",
    "Blockchain Technology",
    "Machine Learning",
    "Multi-Chain Scaling"
  ]
};

// JSON-LD Structured Data for WebSite
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AIL2",
  "url": "https://ail2.org",
  "description": "The Decentralized AI Superlayer for ETH, BSC & Multi-Chain Scaling",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://ail2.org/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};


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
// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s | ${siteConfig.name}`
//   },
//   description: "AI models run fully decentralized, with infinite scalability,empowering developers to accelerate decentralized AI application development by 100x across six blockchains: ETH, BSC, GIWA, XLayer,Base, and Mantle",
//   authors: [
//     {
//       name: 'AIL2Lab',
//       url: 'https://github.com/AIL2Lab'
//     }
//   ],
//   creator: "AIL2Lab",
// };

export async function generateMetadata({params}: { params: Promise<{ locale: string }> }) : Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({locale, namespace: 'site'})
  return {
    title: t('name'),
    description: t('description'),
    keywords: ["decentralized AI", "DeAI", "Web3 AI", "GPU mining for AI", "AI infrastructure", "ETH", "BSC", "multi-chain AI", "decentralized GPU network", "AI SDK", "blockchain AI", "ZK-ML", "AI Layer 2"],
    authors: [{ name: 'AIL2Lab', url: 'https://github.com/AIL2Lab' }],
    creator: 'AIL2Lab',
    publisher: 'AIL2',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `https://ail2.org/${locale}`,
      siteName: 'AIL2',
      title: t('name'),
      description: t('description'),
      images: [
        {
          url: 'https://ail2.org/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'AIL2 - Decentralized AI Superlayer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('name'),
      description: t('description'),
      images: ['https://ail2.org/images/og-image.jpg'],
      creator: '@AIL2Official',
    },
    alternates: {
      canonical: `https://ail2.org/${locale}`,
      languages: {
        'en': 'https://ail2.org/en',
        'es': 'https://ail2.org/es',
        'ja': 'https://ail2.org/ja',
        'ko': 'https://ail2.org/ko',
        'pt': 'https://ail2.org/pt',
        'ru': 'https://ail2.org/ru',
        'tr': 'https://ail2.org/tr',
        'zh': 'https://ail2.org/zh',
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
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

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${sora.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          <ViewTransition>
            {children}
          </ViewTransition>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
