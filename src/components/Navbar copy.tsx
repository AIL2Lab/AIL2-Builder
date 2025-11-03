import Link from "next/link";
import Logo from "./Logo";
import { Github } from "./icons/Github";
import { Document } from "./icons/document";
import Menu from "./Menu";

export default function Navbar() {
  return (
    <div className="w-full fixed  flex items-center justify-center top-6 md:top-12 z-10">
      <nav className="w-full items-center hidden md:flex">
        <div className="flex-1 flex justify-end">
          <div className=" nav-left flex items-center bg-white/10 rounded-tl-lg rounded-bl-lg space-x-6 xl:space-x-12">
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
        </div>

        <div className="flex items-center relative overflow-hidden m-auto">
          <div className="logo-circle-left bg-white/10"></div>
          <Logo />
          <div className="logo-circle-right bg-white/10"></div>
        </div>
        <div className="flex-1 flex">
          <div className="nav-right flex items-center bg-white/10  rounded-tr-lg rounded-br-lg space-x-6 xl:space-x-12">
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
              <span className="ml-10 mr-6 lang-select">🇬🇧en</span>
            </div>
          </div>
        </div>
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
