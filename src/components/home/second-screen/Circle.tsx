import Image from "next/image";
import { ArrowIcon } from "@/components/icons/Arrow";
import { ValidatorIcon } from "@/components/icons/Validator";
import { PersonIcon } from "@/components/icons/Person";
import { AppIcon } from "@/components/icons/App";
import Tag from "./Tag";

export default function Circle() {
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
        subtext="Transactions on Testnet"
        className="absolute left-20 top-20"
      >
        <ArrowIcon />
      </Tag>
      <Tag
        isRightBorder
        text="10K+"
        subtext="Testnet Validators"
        className="absolute left-50 top-80"
      >
        <ValidatorIcon />
      </Tag>
      <Tag
        isRightBorder={false}
        text="20M+"
        subtext="Active accounts"
        className="absolute right-20 top-20"
      >
        <PersonIcon />
      </Tag>
      <Tag
        isRightBorder={false}
        text="1000+"
        subtext="DeAI  APP"
        className="absolute right-50 top-80"
      >
        <AppIcon />
      </Tag>
    </div>
  );
}
