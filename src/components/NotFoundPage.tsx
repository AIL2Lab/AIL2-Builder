import { useTranslations } from "next-intl";
import PageLayout from "./PageLayout";
import Image from "next/image";
import { LeftArrowIcon } from "./icons/LeftArrow";
import { RadIcon } from "./icons/Rad";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <PageLayout isShowFooter={false} className="pt-6 md:pt-12">
      <div className="relative flex flex-1 flex-col bg-[url(/images/bg-star-sky.png)] bg-no-repeat bg-cover">
        <div className="mx-auto flex-1 flex items-center">
          <div className="w-full grid grid-cols-2 pt-10 sm:pt-20">
            <div className="col-span-2 lg:col-span-1 flex flex-col justify-center lg:ml-10 mx-5">
              <div className="w-3/4 sm:w-full">
                <Image
                src="/images/404.png"
                alt="404"
                width={315}
                height={127}
                className="mb-5"
              />
              </div>
              <div className="text-left text-white font-semibold text-lg sm:text-xl md:text-3xl lg:text-4xl my-2.5 sm:my-5">
                {t('title')}
              </div>
              <div className="text-white/50 text-base sm:text-lg md:text-2xl lg:text-2xl font-normal my-2.5 sm:my-5 sm:whitespace-nowrap text-justify">
                {t('description')}
              </div>
              <div className="text-theme flex items-center bg-theme/10 w-fit px-6 py-3 rounded-lg">
                <LeftArrowIcon
                  fill="var(--color-theme)"
                  width={32}
                  height={24}
                  size={18}
                />
                <span className="text-sm sm:text-base lg:text-xl ml-10">{t('backHome')}</span>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1 flex justify-end">
              <Image
                src="/images/astronaut.png"
                alt="astronaut"
                width={472}
                height={478}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[280px] relative overflow-hidden">
          <div className="circle bg-black w-[800px] h-[800px] sm:w-[1600px] sm:h-[1600px] lg:w-[3200px] lg:h-[3200px]"></div>
          {/* <RadIcon /> */}
        </div>
      </div>
    </PageLayout>
  );
}
