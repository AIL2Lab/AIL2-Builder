"use client";
import { addEmail } from "@/actions/add-email";
import { TwitterIcon } from "./icons/Twitter";
import { TelegramIcon } from "./icons/Telegram";
import { MediumIcon } from "./icons/Medium";
export default function Footer() {
  const getEmail = async (formData: FormData) => {
    const email = formData.get("email");
    console.log(email);
    // 数据库操作
    addEmail(email as string);
  };
  return (
    <footer className="footer container mx-auto lg:max-w-7xl md:my-24 lg:my-32 ">
      <div className="grid grid-cols-2 px-15 pt-10 pb-25">
        <div className="footer-email col-span-2 md:col-span-1 p-10 pr-20">
          <div className="text-2xl font-normal">Sign up for our newsletter</div>
          <form
            action={getEmail}
            className="email-form border border-theme w-60 md:w-72 lg:w-96 mt-10 "
          >
            <input type="text" name="email" maxLength={256} className="w-65" />
            <button type="submit" className="email-btn bg-theme w-30 px-5 py-2.5">
              Subscribe
            </button>
          </form>
        </div>
        <div className="landscape col-span-2 md:col-span-1 grid grid-cols-3 gap-4 py-10 px-5 pl-40">
          <div className="col-span-1">
            <div className="text-theme font-bold">Product</div>
            <div>AIL2 Core</div>
            <div>AIL2 Builder</div>
            <div>AIL2 Creator</div>
          </div>
          <div className="col-span-1">
            <div className="text-theme font-bold">Blog</div>
            <div>Docs</div>
            <div>Blog</div>
            <div>Research</div>
          </div>
          <div className="col-span-1">
            <div className="text-theme font-bold">Ecosystem</div>
            <div>Incubator</div>
            <div>Contact Us</div>
            <div>Ecosystem Fund</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 px-10 py-15 border-t border-theme">
        <div className="col-span-2 md:col-span-1 ">
          ©2025 AIL2. All rights reserved.
        </div>
        <div className="col-span-2 md:col-span-1 flex justify-end">
          <div className="text-theme text-base font-normal mr-25">Socials</div>
          <div className="flex gap-2.5">
            <TwitterIcon fill="var(--color-theme)" />
            <TelegramIcon fill="var(--color-theme)" />
            <MediumIcon fill="var(--color-theme)" />
          </div>
        </div>
      </div>
    </footer>
  );
}
