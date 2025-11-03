import Link from "next/link";
import Logo from "./Logo";
import { Github } from "./icons/Github";
import { Document } from "./icons/document";
import Menu from "./Menu";
import LocaleSwitcher from './LocaleSwitcher';

export default function Navbar() {
  return (
    <div className="w-full sticky flex items-center justify-center top-6 md:top-12 z-10">
      <nav className="items-center hidden md:grid grid-cols-2 bg-[color:#121212] relative h-[84px] rounded-2xl">
        <div className="flex col-span-1 items-center pr-20 space-x-6 xl:space-x-12">
            <div className="text-base font-normal ml-10">
              <Link href="/">Research</Link>
            </div>
            <div className="text-base font-normal md:red">
              <Link href="/">Ecosystem</Link>
            </div>
            <div className="text-base font-normal">
              <Link href="/">Learn</Link>
            </div>
        </div>
        <div className="flex col-span-1 items-center pl-20 space-x-6 xl:space-x-12">
          <div className="text-base font-normal">
              <Link href="/">Blog</Link>
            </div>
            <div className="text-base font-normal flex flex-1 justify-end ml-8">
              <Link href="/" className="github-icon">
                <Github />
              </Link>
              <Link href="/" className="document-icon ml-2.5">
                <Document />
              </Link>
              {/* <span className="ml-10 mr-6 lang-select">🇬🇧en</span> */}
              <LocaleSwitcher className="ml-10 mr-6 lang-select" />
            </div>
        </div>
        <Logo className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </nav>
      {/* mobile menu */}
      <nav className="w-full flex items-center justify-between md:hidden px-6">
        <div className="flex-1">
          <Menu />
        </div>
        <Logo size="small" />
        <div className="flex-1 flex justify-end">
          <Link href="/" className="github-icon">
              <Github />
            </Link>
            <Link href="/" className="document-icon ml-2.5">
              <Document />
            </Link>
            <span className="ml-2.5 md:ml-10 lang-select">en</span>
        </div>
      </nav>
    </div>
  );
}
