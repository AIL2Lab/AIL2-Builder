'use client'

import { useEffect, useState } from "react";
import { MenuIcon } from "./icons/MenuIcon";
import SideBar from "./SideBar";
import { CloseIcon } from "./icons/CloseIcon";
import { usePathname } from "next/navigation"; 

export default function Menu({data}: {data:any}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      body.classList.add("fixed");
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("fixed");
      body.classList.remove("overflow-hidden");
    }
    return () => {
      body.classList.remove("fixed");
      body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <>
      {
        isOpen ? (
            <CloseIcon className="cursor-pointer" onClick={toggleMenu} />
        ) : (
            <MenuIcon className="cursor-pointer" onClick={toggleMenu} />
        )
      }
      {isOpen && <div className="absolute top-0 left-0 z-40"><SideBar items={data} /></div>}
    </>
  );
}
