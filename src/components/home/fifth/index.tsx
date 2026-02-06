import Image from "next/image";
import ChunkItem from "./Chunk";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { siteConfig } from "@/config/site";
const chunks = [
    {
        title: "DApps & Developers",
        tags: [
            'Tooling (SDKs, CLI)',
            'AI Agents',
            'DeFi + AI',
            'GameFI + AI',
            'Data DAOs',
            'L2 RPC Gateways',
        ],
        bg: {
            src: '/images/chunk-1.png',
            with: 239,
            height: 284,
            alt: 'AIL2 DApps and Developer Tools - SDK CLI AI Agents DeFi GameFi'
        }
    },
    {
        title: 'Unified Gateway & APIs',
        bg: {
            src: '/images/chunk-2.png',
            with: 279,
            height: 255,
            alt: 'AIL2 Unified Gateway and API Layer'
        }
    },
    {
        title: 'AIL2 Core (AIL2 Rollup)',
        bg: {
            src: '/images/chunk-3.png',
            with: 293,
            height: 300,
            alt: 'AIL2 Core Rollup Infrastructure Layer'
        }
    },
    {
        title: 'AI Compute & Storage Network',
        bg: {
            src: '/images/chunk-4.png',
            with: 214,
            height: 264,
            alt: 'AIL2 AI Compute and Decentralized Storage Network'
        }
    },
    {
        title: 'settlement,  Bridges & DA',
        bg: {
            src: '/images/chunk-5.png',
            with: 214,
            height: 264,
            alt: 'AIL2 Settlement Bridges and Data Availability Layer'
        }
    },
]
export default function HomeFifthScreen() {
    const t = useTranslations("Home")
  return (
    <div className="container mx-auto lg:max-w-7xl my-5 sm:my-8 md:my-12 lg:my-16 px-5">
      <div className="font-bold text-xl lg:text-2xl md:w-3/5 lg:w-1/2 ">
        {t.rich('fifthScreen.acceleration', {
            theme: (chunks) => <span className="text-theme">{chunks}</span>
        })}
      </div>
      <div className="px-7 py-3 support-btn w-fit rounded-xl font-bold my-10">
        <Link href={siteConfig.xUrl} target="_blank">{t("supportBtn")}</Link>
      </div>
      <div className="grid grid-cols-6 gap-5">
            {
                chunks.map((item, idx) => (
                    <div className="col-span-6 sm:col-span-3 md:col-span-2" key={idx}>
                        <ChunkItem className="border border-white/20 p-5 rounded-2xl flex flex-col bg-black min-h-96 md:min-h-80 lg:min-h-105 " title={item.title} tags={item.tags}>
                            <div className="flex justify-center items-center flex-1 ">
                                <Image src={item.bg.src} alt={item.bg.alt || ''} width={item.bg.with} height={item.bg.height} />
                            </div>
                        </ChunkItem>
                    </div>
                ))
            }
             
      </div>
    </div>
  );
}
