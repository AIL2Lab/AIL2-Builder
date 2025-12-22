import { useTranslations } from "next-intl";
import Image from "next/image";
import Img from '@/assets/images/platform_interoperability.svg'
export default function ChainAccelerate() {
  const t = useTranslations("Platform");
  return (
    <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="order-2 lg:order-1">
        <h3 className="sm:text-right text-xl sm:text-2xl  md:text-3xl font-bold text-white mb-2">
          {t.rich("section1.title", { br: () => <br /> })}
        </h3>
        <p className="sm:text-right text-gray-400 leading-relaxed mb-8">
          {t("section1.content")}
        </p>
      </div>
      <div className="order-1 lg:order-2 flex justify-center">
        <Image
          src={Img}
          alt="Interoperability"
        />
      </div>
    </section>
  );
}
