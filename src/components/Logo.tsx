import clsx from "clsx";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
type Props = {
  size?: string;
  className?: string;
};

export default function Logo({ size, className }: Props) {
  const isSmall = size === "small";
  return (
    <div className={clsx("bg-[#121212] rounded-full flex items-center justify-center relative", isSmall?"w-[33px] h-[33px]" :"w-[50px] h-[50px]", className)}>
      <Link href="/">
        <Image src="/svg/logo.svg" alt="logo" width={isSmall ? 33 : 50} height={isSmall ? 33 : 50} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>
      </Link>
    </div>
  );
}
