import clsx from "clsx";
import Image from "next/image";
type Props = {
  size?: string;
  className?: string;
};

export default function Logo({size, className}: Props) {
  const isSmall = size === 'small'
  return (
    <div className={clsx("bg-[#121212] rounded-full", isSmall?"nav-circle-small" :"nav-circle", className)}>
      <Image src="/svg/logo.svg" alt="logo" width={isSmall ? 33 : 50} height={isSmall ? 33 : 50} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>
    </div>
  );
}
