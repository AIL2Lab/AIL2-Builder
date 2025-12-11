import { useTranslations } from "next-intl";
import Image from "next/image";
export default function Web3() {
  const t = useTranslations("Platform");
  const web3Items = [
    t("section2.item1"),
    t("section2.item2"),
    t("section2.item3"),
    t("section2.item4"),
  ];
  return (
    <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="flex justify-center">
        <Image
          src="/images/platform-compare-4.jpg"
          alt="gpu"
          width={2730}
          height={1535}
        />
      </div>
      <div>
        <h3 className="text-xl sm:text-2xl  md:text-3xl font-bold text-white mb-6">
          {t("section4.title")}
        </h3>
        <ul className="space-y-4 text-gray-400 mb-8 list-disc pl-5">
          {web3Items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
