"use client";
import { addEmail } from "@/actions/add-email";
import { TwitterIcon } from "./icons/Twitter";
import { TelegramIcon } from "./icons/Telegram";
import { MediumIcon } from "./icons/Medium";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { siteConfig } from "@/config/site";
import {Link} from "@/i18n/navigation";

export default function Footer() {
  const [state, submitAction, isPending] = useActionState(addEmail, null);
  const t = useTranslations("Footer")
  return (
    <footer className="footer w-full mx-auto lg:max-w-7xl my-5 sm:my-8 md:my-12 lg:my-16">
      <div className="grid grid-cols-6 p-5 lg:p-10 xl:p-20">
        <div className="col-span-6  md:col-span-3 px-0 lg:px-10">
          <div className="footer-email p-5 lg:p-10 space-y-2.5">
            <div className="text-2xl font-normal">
              {t.rich('emailTip', {
                br: () => <br />
              })}
            </div>
            <form action={submitAction} className="email-form border border-theme flex justify-between pl-2.5">
              <input
                type="text"
                placeholder={ state?.success ? t('emailReceived') :t('emailPlaceholder')}
                name="email"
                maxLength={256}
                className="flex-1 min-w-[100px] sm:min-w-auto"
              />
              <button
                type="submit"
                className="email-btn bg-theme px-5 py-2.5"
              >
                {t('emailBtnText')}
              </button>
            </form>
          </div>
        </div>
        <div className="text-sm sm:text-base col-span-6 md:col-span-3 grid grid-cols-3 pl-0 sm:pl-10  lg:pl-20 xl:pl-40 my-10">
          <div className="col-span-1">
            <div className="text-theme font-bold text-base sm:text-lg">{t('product')}</div>
            <div>
              <Link href="/research">AIL2 Core</Link>
            </div>
            <div><Link href="/ecosystem">AIL2 Builder</Link></div>
            {/* <Link href="/">AIL2 Creator</Link> */}
          </div>
          <div className="col-span-1">
            <div className="text-theme font-bold text-base sm:text-lg">{t("blog")}</div>
            <div>
              <a href="/doc/HPVIDEO_WhitePaperv3.pdf" target="_blank" rel="noopener noreferrer">
                Docs
              </a>
            </div>
            <div>Blog</div>
            <div><Link href="/research">Research</Link></div>
          </div>
          <div className="col-span-1">
            <div className="text-theme font-bold text-base sm:text-lg">{t("ecosystem")}</div>
            <div>Contact Us</div>
            <Link className="whitespace-nowrap" href="/ecosystem">Ecosystem Fund</Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center border-t border-theme">
        <div className="w-fit sm:w-full grid grid-cols-2 px-10 py-15  space-y-5 sm:space-y-0">
          <div className="col-span-2 sm:col-span-1 text-center sm:text-left whitespace-nowrap">
            {t('copyright')}
          </div>
          <div className="col-span-2 sm:col-span-1 flex justify-between  sm:justify-end ">
            <div className="text-theme text-base font-normal mr-20">
              {t('socials')}
            </div>
            <div className="flex gap-2.5">
              <Link href={siteConfig.xUrl} target="_blank">
                <TwitterIcon fill="var(--color-theme)" />
              </Link>
              {/* <TelegramIcon fill="var(--color-theme)" />
              <MediumIcon fill="var(--color-theme)" /> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
