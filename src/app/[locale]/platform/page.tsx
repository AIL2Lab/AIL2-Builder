import PageLayout from "@/components/PageLayout";
import Plant from "@/components/Plant";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  Github,
  FileText,
  Menu,
  Box,
  Layers,
  Cpu,
  Database,
  Globe,
  ShieldCheck,
  Zap,
  HardDrive,
  Twitter,
  Send,
} from "lucide-react";
import { EthereumIcon } from "@/components/icons/Ethereum";
import { BnbIcon } from "@/components/icons/Bnb";
import { OkxIcon } from "@/components/icons/Okx";
import { MantleIcon } from "@/components/icons/Mantle";
import { GiwaIcon } from "@/components/icons/Giwa";
import Image from "next/image";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: `platform | ${t("subtitle")}`,
    description: `Decentralized AI Acceleration Platform`,
  };
}

const MultiChainFeature = () => {
  return (
    <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="order-2 lg:order-1">
        <h3 className="text-right text-3xl font-bold text-white mb-2">
          Multi-Chain
        </h3>
        <h3 className="text-right text-3xl font-bold text-white mb-6">
          Acceleration & Seamless Interoperability
        </h3>
        <p className="text-right text-gray-400 leading-relaxed mb-8">
          AIL2 provides 100x faster decentralized AI development across ETH,
          BSC, GIWA, XLayer, Base, and Mantle. It overcomes single-chain
          limitations for seamless multi-chain operations. Enables effortless
          cross-chain AI application deployment without technical barriers.
          Innovatively streamlines workflows, ensuring efficient and scalable
          cross-chain AI integration.
        </p>
        <div className="flex justify-end">
          <button className="bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold py-3 px-8 rounded-lg transition-colors">
            对比图片1
          </button>
        </div>
      </div>
      
      <div className="order-1 lg:order-2 grid grid-cols-3 gap-6 place-content-center justify-items-center mx-auto">
  {/* 第一个手动创建的方块 */}
  <div
    className="w-24 h-24 rounded-lg flex items-center justify-center
            backdrop-blur-md transition-all duration-500 border border-theme/35"
    style={{ boxShadow: "0px 0px 9.9px 0px rgba(255, 223, 98, 0.63) inset" }}
  >
    <div className={`w-10 h-10 rounded-xs bg-theme`}></div>
  </div>

  {/* 循环生成的方块 */}
  {[EthereumIcon, BnbIcon, MantleIcon, OkxIcon, GiwaIcon].map((Icon, idx) => (
    <div
      key={idx}
      className="w-24 h-24 rounded-lg flex items-center justify-center
            backdrop-blur-md transition-all duration-500 bg-theme/10 border border-theme/35"
      style={{ boxShadow: "0px 0px 9.9px 0px rgba(255, 223, 98, 0.63) inset" }}
    >
      {/* 
         修正: 去掉固定的 size={80}，改为相对宽度 w-[60%] 或 w-3/5。
         这样图标在手机端(40px容器)和PC端(96px容器)都能完美居中且不溢出。
      */}
      <Icon className="w-[60%] h-[60%] fill-[var(--color-theme)]" />
    </div>
  ))}
</div>
    </section>
  );
};

// 4. Feature: GPU-Driven (Image Left, Text Right)
const GPUFeature = () => {
  return (
    <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <Image src="/images/platform-gpu.png" alt="gpu" width={756} height={521}/>

      <div>
        <h3 className="text-3xl font-bold text-white mb-2">GPU-Driven</h3>
        <h3 className="text-3xl font-bold text-white mb-6">
          Decentralized Computing Power
        </h3>
        <ul className="space-y-4 text-gray-400 mb-8 list-disc pl-5">
          <li>
            Powered by a GPU miner network, AIL2 eliminates developer burdens in
            AI model deployment and maintenance.
          </li>
          <li>
            The decentralized GPU infrastructure offers on-demand, scalable
            computing resources for AI operations.
          </li>
          <li>
            It innovatively repurposes crypto mining resources for AI tasks.
          </li>
          <li>
            This creates a cost-effective and high-performance computing
            solution.
          </li>
        </ul>
        <button className="bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold py-3 px-8 rounded-lg transition-colors w-32 h-12"></button>
      </div>
    </section>
  );
};

// 5. Feature: Decentralized Storage (Text Left, Image Right)
const StorageFeature = () => {
  return (
    <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div>
        <h3 className="text-right text-3xl font-bold text-white mb-2">
          Decentralized
        </h3>
        <h3 className="text-right text-3xl font-bold text-white mb-6">
          Storage with Infinite Scalability
        </h3>
        <p className="text-right text-gray-400 leading-relaxed mb-8">
          The integrated AI Compute & Storage Network provides decentralized,
          infinitely scalable data storage. Data is distributed across the
          network for enhanced security and availability. It supports massive AI
          datasets with robust infrastructure. This design aligns with Web3
          native principles, enabling unconstrained growth of AI applications.
        </p>
        <div className="flex justify-end">
          <button className="bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold py-3 px-8 rounded-lg transition-colors">
            对比图片1
          </button>
        </div>
      </div>

      <Image src="/images/platform-storage.png" alt="gpu" width={756} height={521}/>
    </section>
  );
};

// 6. Feature: Web3 Data (Image Left, Text Right)
const Web3Feature = () => {
  return (
    <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <Image src="/images/platform-data.png" alt="gpu" width={756} height={521}/>

      <div>
        <h3 className="text-3xl font-bold text-white mb-6">
          Web3 Data Synergy & Composability
        </h3>
        <ul className="space-y-4 text-gray-400 mb-8 list-disc pl-5">
          <li>
            AIL2 enables seamless integration of Web3 data (on-chain, DAO, etc.)
            into AI models via its unified architecture.
          </li>
          <li>This synergy empowers innovative AI-driven Web3 use cases.</li>
          <li>
            Examples range from on-chain analysis to autonomous agent
            operations.
          </li>
          <li>
            It bridges AI capabilities with Web3 data ecosystems, expanding
            application boundaries.
          </li>
        </ul>
        <button className="bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold py-3 px-8 rounded-lg transition-colors">
          对比图片1
        </button>
      </div>
    </section>
  );
};
export default function PlatformPage() {
  return (
    <PageLayout isShowFooter>
      <div className="flex flex-col">
        <section className="mt-30 sm:mt-60">
          <div className="text-center z-10 relative px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
              Decentralized <br />
              AI Acceleration Platform
            </h1>
            <div className="inline-block border border-theme/30 bg-theme/5 px-8 py-4 rounded-xl text-xl mb-12">
              6 blockchains and the fastest acceleration
            </div>
          </div>
        </section>
        <div className="relative">
          <Plant rotate={-20} />
          <div className="absolute w-full  text-center top-2/3 sm:top-1/2 lg:-translate-y-1/2 z-10 px-5">
            <div className="w-15 md:w-20 h-1 bg-theme mx-auto mb-6"></div>
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-white max-w-2xl mx-auto">
              Multi-Chain Acceleration & GPU-Powered <br />
              Innovation for Decentralized AI
            </h2>
          </div>
        </div>
        <div className="space-y-12 mt-20 sm:mt-0">
          <MultiChainFeature />
          <GPUFeature />
          <StorageFeature />
          <Web3Feature />
        </div>
      </div>
    </PageLayout>
  );
}
