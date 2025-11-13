import Logo from "@/components/Logo";
import Image from "next/image";
import Circle from "./Circle";
import BlockchainCarousel from "./BlockchainCarousel";
import { useTranslations } from "next-intl";
export default function HomeSecondScreen() {
  const t = useTranslations("Home")
  return (
    <div className="w-full mx-auto lg:max-w-7xl my-4 sm:my-8 md:my-12 lg:my-16 px-5 sm:px-10 md:px-20">
      <div className="sm:h-100 lg:h-140 sm:bg-[url(/images/Subtract-md.png)] lg:bg-[url(/images/Subtract.png)] bg-no-repeat bg-size-[100%_100%]">
        <div className="w-full sm:flex justify-between h-full">
          <div className="sm:flex sm:w-1/2 h-fit sm:mt-10 lg:mt-20 md:pl-10 lg:pl-20">
            <Image
              src="/svg/logo.svg"
              width={50}
              height={50}
              alt="logo"
              className="mr-4"
            />
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              {t("secondScreen.title")}
            </h3>
          </div>
          <div className="sm:w-1/2 flex justify-center items-center sm:p-10">
            <BlockchainCarousel autoPlay={true} interval={1000} />
          </div>
        </div>
        <div className="sm:w-1/2  md:px-12 sm:relative sm:-top-50 lg:-top-60">
          <div className="text-sm lg:text-base">
            {t("secondScreen.text")}
          </div>
          <div className="px-7 py-3 support-btn w-fit rounded-xl font-bold mt-2.5 text-sm md:text-base">
            {t("supportBtn")}
          </div>
        </div>
      </div>
      <div className="mt-20 mb-20 lg:mb-0">
        <Circle />
      </div>
    </div>
  );
}
