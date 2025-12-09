import { useTranslations } from "next-intl";
import Image from "next/image";
export default function ChainAccelerate() {
  const t = useTranslations("Platform");
  const t_common = useTranslations("Common");
  return (
    <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="order-2 lg:order-1">
        <h3 className="sm:text-right text-xl sm:text-2xl  md:text-3xl font-bold text-white mb-2">
          {t.rich("section1.title", { br: () => <br /> })}
        </h3>
        <p className="sm:text-right text-gray-400 leading-relaxed mb-8">
          {t("section1.content")}
        </p>
        {/* <div className="sm:text-right">
          <button className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base cursor-pointer">
            {t_common("comparisonImages")}
          </button>
        </div> */}
      </div>
      <div className="order-1 lg:order-2 flex justify-center">
        <Image
          src="/images/platform-compare-1.png"
          alt="gpu"
          width={696}
          height={432}
        />
      </div>
    </section>
  );
}
