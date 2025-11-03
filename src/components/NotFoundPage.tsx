import { useTranslations } from "next-intl";
import PageLayout from "./PageLayout";
import Image from "next/image";
import { LeftArrowIcon } from "./icons/LeftArrow";
import { RadIcon } from "./icons/Rad";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <PageLayout title={t("title")} isShowFooter={false}>
      <div className="page-not-found flex-1 relative flex">
        <div className="star-sky flex-1 container mx-auto lg:max-w-7xl pt-20">
          <div className="grid grid-cols-2">
            <div className="col-span-1 flex flex-col justify-center ml-40">
              <Image
                src="/images/404.png"
                alt="404"
                width={315}
                height={127}
                className=""
              />
              <div className="text-white font-semibold text-5xl ">
                Page Not Found
              </div>
              <div className="text-white/50 text-2xl font-normal whitespace-nowrap">
                Sorry, we couldn’t find the page you ‘re looking for{" "}
              </div>
              <div className="text-theme flex items-center bg-theme/10 w-fit px-10 py-2.5 rounded-lg">
                <LeftArrowIcon
                  fill="var(--color-theme)"
                  width={32}
                  height={24}
                />
                <span className="text-xl ml-10">Back to home</span>
              </div>
            </div>
            <div className="col-span-1">
              <Image
                src="/images/astronaut.png"
                alt="astronaut"
                width={472}
                height={478}
                className="ml-25"
              />
            </div>
          </div>
        </div>
        <div className="earth absolute bottom-0">
          <div className="circle">12345</div>
          <RadIcon />
        </div>
      </div>
    </PageLayout>
  );
}
