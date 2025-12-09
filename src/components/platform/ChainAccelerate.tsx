"use client";
import { useTranslations } from "next-intl";
import { EthereumIcon } from "@/components/icons/Ethereum";
import { BnbIcon } from "@/components/icons/Bnb";
import { OkxIcon } from "@/components/icons/Okx";
import { MantleIcon } from "@/components/icons/Mantle";
import { GiwaIcon } from "@/components/icons/Giwa";
import { useState } from "react";
import Image from "next/image";
export default function ChainAccelerate() {
  const t = useTranslations("Platform");
  const t_common = useTranslations("Common");
  const [isCompared, setIsCompared] = useState(false);
  return (
    <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="order-2 lg:order-1">
        <h3 className="sm:text-right text-xl sm:text-2xl  md:text-3xl font-bold text-white mb-2">
          {t.rich("section1.title", { br: () => <br /> })}
        </h3>
        <p className="sm:text-right text-gray-400 leading-relaxed mb-8">
          {t("section1.content")}
        </p>
        <div className="sm:text-right">
          <button className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base cursor-pointer" onClick={() => setIsCompared(!isCompared)}>
            {t_common("comparisonImages")}
          </button>
        </div>
      </div>
      {isCompared ? (
        <div className="order-1 lg:order-2 flex justify-center">
          <Image
            src="/images/platform-compare-1.png"
            alt="gpu"
            width={696}
            height={432}
          />
        </div>
      ):(
        <div className="order-1 lg:order-2 grid grid-cols-3 gap-6 place-content-center justify-items-center mx-auto">
          <div
            className="w-24 h-24 rounded-lg flex items-center justify-center
                    backdrop-blur-md transition-all duration-500 border border-theme/35"
            style={{
              boxShadow: "0px 0px 9.9px 0px rgba(255, 223, 98, 0.63) inset",
            }}
          >
            <div className={`w-10 h-10 rounded-xs bg-theme`}></div>
          </div>
          {[EthereumIcon, BnbIcon, MantleIcon, OkxIcon, GiwaIcon].map(
            (Icon, idx) => (
              <div
                key={idx}
                className="w-24 h-24 rounded-lg flex items-center justify-center
                    backdrop-blur-md transition-all duration-500 bg-theme/10 border border-theme/35"
                style={{
                  boxShadow: "0px 0px 9.9px 0px rgba(255, 223, 98, 0.63) inset",
                }}
              >
                <Icon className="w-[60%] h-[60%] fill-[var(--color-theme)]" />
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}
