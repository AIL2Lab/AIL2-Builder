import { useTranslations } from "next-intl";
import Image from "next/image";
export default function GPU() {
  const t = useTranslations("Platform");
  const t_common = useTranslations("Common");
  const items = [
    t("section2.item1"),
    t("section2.item2"),
    t("section2.item3"),
    t("section2.item4"),
  ];
  return (
    <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="flex justify-center">
        <Image
          src="/images/platform-compare-2.jpg"
          alt="gpu"
          width={2730}
          height={1535}
        />
      </div>
      <div>
        <h3 className="text-xl sm:text-2xl  md:text-3xl font-bold text-white mb-2">
          {t.rich("section2.title", { br: () => <br /> })}
        </h3>
        <ul className="space-y-4 text-gray-400 mb-8 list-disc pl-5">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        {/* <button className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base cursor-pointer">
          {t_common("comparisonImages")}
        </button> */}
      </div>
    </section>
  );
}
