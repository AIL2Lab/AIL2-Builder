"use client";
import { addEmail } from "@/actions/add-email";
import { TwitterIcon } from "./icons/Twitter";
import { TelegramIcon } from "./icons/Telegram";
import { MediumIcon } from "./icons/Medium";
import { useTranslations } from "next-intl";
export default function Footer() {
  const t = useTranslations("Footer")
  const getEmail = async (formData: FormData) => {
    const email = formData.get("email");
    console.log(email);
    // 数据库操作
    addEmail(email as string);
  };
  return (
    <footer className="footer w-full mx-auto lg:max-w-7xl my-8  md:my-24 lg:my-32">
      <div className="grid grid-cols-6 p-5 lg:p-10 xl:p-20">
        <div className="col-span-6  md:col-span-3 px-0 lg:px-10">
          <div className="footer-email p-5 lg:p-10 space-y-2.5">
            <div className="text-2xl font-normal">
              {t.rich('emailTip', {
                br: () => <br />
              })}
            </div>
            <form action={getEmail} className="email-form border border-theme flex justify-between pl-2.5">
              <input
                type="text"
                placeholder={t('emailPlaceholder')}
                name="email"
                maxLength={256}
                className="w-20 md:w-40"
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
            <div>AIL2 Core</div>
            <div>AIL2 Builder</div>
            <div>AIL2 Creator</div>
          </div>
          <div className="col-span-1">
            <div className="text-theme font-bold text-base sm:text-lg">{t("blog")}</div>
            <div>Docs</div>
            <div>Blog</div>
            <div>Research</div>
          </div>
          <div className="col-span-1">
            <div className="text-theme font-bold text-base sm:text-lg">{t("ecosystem")}</div>
            <div>Incubator</div>
            <div>Contact Us</div>
            <div className="whitespace-nowrap">Ecosystem Fund</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center border-t border-theme">
        <div className="w-fit sm:w-full grid grid-cols-2 px-10 py-15  space-y-5 sm:space-y-0">
          <div className="col-span-2 sm:col-span-1 text-center sm:text-left whitespace-nowrap">
            {t('copyright')}
          </div>
          <div className="col-span-2 sm:col-span-1 flex justify-between  sm:justify-end ">
            <div className="text-theme text-base font-normal mr-25">
              {t('socials')}
            </div>
            <div className="flex gap-2.5">
              <TwitterIcon fill="var(--color-theme)" />
              <TelegramIcon fill="var(--color-theme)" />
              <MediumIcon fill="var(--color-theme)" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
