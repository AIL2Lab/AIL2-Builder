import Image from "next/image";
import ChunkItem from "./Chunk";
const chunks = [
    {
        title: "DApps & Developers",
        tags: [
            'Tooling (SDKs, CLI)',
            'L2 RPC Gateways',
            'AI Agents',
            'DeFi + AI',
            'GameFI + AI',
            'Data DOAs'
        ],
        bg: {
            src: '/images/chunk-1.png',
            with: 239,
            height: 284
        }
    },
    {
        title: 'Unified Gateway & APIs',
        bg: {
            src: '/images/chunk-2.png',
            with: 279,
            height: 255
        }
    },
    {
        title: 'AIL2 Core (AI L2 Rollup)',
        bg: {
            src: '/images/chunk-3.png',
            with: 392,
            height: 401
        }
    },
    {
        title: 'AI Compute & Storage Network',
        bg: {
            src: '/images/chunk-4.png',
            with: 214,
            height: 264
        }
    },
    {
        title: 'settlement,  Bridges & DA',
        bg: {
            src: '/images/chunk-5.png',
            with: 214,
            height: 264
        }
    },
]
export default function HomeFifthScreen() {
  return (
    <div className="container mx-auto lg:max-w-7xl md:my-24 lg:my-32 ">
      <div>
        The of AIL2 enables developers to build decentralized AI on public
        blockchains with 100x acceleration
      </div>
      <div className="px-7 py-3 support-btn w-fit rounded-xl font-bold my-10">
        Support AIL2 on X
      </div>
      <div className="grid grid-cols-6 space-x-5 space-y-5">
            {
                chunks.map((item, idx) => (
                    <div className="col-span-6 sm:col-span-3 md:col-span-2" key={idx}>
                        <ChunkItem className="border border-white/20 p-5 rounded-2xl flex flex-col" title={item.title} tags={item.tags}>
                            <div className="flex justify-center items-center flex-1 min-h-96">
                                <Image src={item.bg.src} alt="" width={item.bg.with} height={item.bg.height} />
                            </div>
                        </ChunkItem>
                    </div>
                ))
            }
             
      </div>
    </div>
  );
}
