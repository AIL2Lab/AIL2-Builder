'use client'

import { useState } from "react";
import { MenuIcon } from "./icons/MenuIcon";
import SideBar from "./SideBar";
import { CloseIcon } from "./icons/CloseIcon";
export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const setMenuOpen = () => {
    setIsOpen((prev) => !prev);
    const body = document.body;
    body.classList.toggle("fixed");
    body.classList.toggle("overflow-hidden");
  };
  return (
    <>
      {
        isOpen ? (
            <CloseIcon className="cursor-pointer" onClick={setMenuOpen} />
        ) : (
            <MenuIcon className="cursor-pointer" onClick={setMenuOpen} />
        )
      }
      {isOpen && <div className="absolute top-0 left-0 z-40"><SideBar /></div>}
    </>
  );
}
