import { useTranslations } from "next-intl";
import Image from "next/image";
export default function Storage() {
  const t = useTranslations("Platform");
  return (
    <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="order-2 lg:order-1">
        <h3 className="sm:text-right text-xl sm:text-2xl  md:text-3xl font-bold text-white mb-2">
          {t.rich("section3.title", { br: () => <br /> })}
        </h3>
        <p className="sm:text-right text-gray-400 leading-relaxed mb-8">
          {t("section3.content")}
        </p>
      </div>
      <div className="flex justify-center order-1 lg:order-2">
        <Image
          src="/images/platform-compare-3.jpg"
          alt="gpu"
          width={696}
          height={432}
        />
      </div>
    </section>
  );
}
