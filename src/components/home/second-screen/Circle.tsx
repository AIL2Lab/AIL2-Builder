import Image from "next/image";
import { ArrowIcon } from "@/components/icons/Arrow";
import { ValidatorIcon } from "@/components/icons/Validator";
import { PersonIcon } from "@/components/icons/Person";
import { AppIcon } from "@/components/icons/App";
import Tag from "./Tag";
import { useTranslations } from "next-intl";

export default function Circle() {
  const t = useTranslations("Home.secondScreen.tags")
  return (
    <div className="w-full flex items-center justify-center relative">
      <Image
        width={560}
        height={560}
        src="/images/second-circle-bg.png"
        alt=""
      />
      <Image
        src="/svg/logo.svg"
        width={100}
        height={100}
        alt="logo"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Tag
        isRightBorder
        text="800M+"
        subtext={t("tag1")}
        className="absolute top-12 sm:left-1/10 sm:top-1/10 lg:left-1/10 lg:top-1/10"
      >
        <ArrowIcon />
      </Tag>
      <Tag
        isRightBorder
        text="10K+"
        subtext={t("tag2")}
        className="absolute -bottom-8 sm:left-1/8 sm:-bottom-1/10 lg:left-1/6 lg:bottom-1/8"
      >
        <ValidatorIcon />
      </Tag>
      <Tag
        isRightBorder={false}
        text="20M+"
        subtext={t("tag3")}
        className="absolute -top-10 sm:right-1/6 sm:top-0 lg:right-1/6 lg:top-1/6"
      >
        <PersonIcon />
      </Tag>
      <Tag
        isRightBorder={false}
        text="1000+"
        subtext={t("tag4")}
        className="absolute bottom-15 sm:right-1/10 sm:bottom-1/5 lg:right-3/10 lg:bottom-1/5"
      >
        <AppIcon />
      </Tag>
    </div>
  );
}
