"use client";
import { addEmail } from "@/actions/add-email";
import { TwitterIcon } from "./icons/Twitter";
import { TelegramIcon } from "./icons/Telegram";
import { MediumIcon } from "./icons/Medium";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import CopyButton from "./CopyButton";
export default function Footer() {
  const [state, submitAction, isPending] = useActionState(addEmail, null);
  const t = useTranslations("Footer");
  const t_common = useTranslations("Common");
  const popupContent = (
    <div className="flex flex-col justify-center items-center">
      <div>
        {t_common("ourEmail")}: {siteConfig.email}
      </div>
      <CopyButton textToCopy={siteConfig.email} />
    </div>
  );
  const popupLabel = <div>Contact Us</div>;
  return (
    <footer className="footer w-full mx-auto lg:max-w-7xl my-5 sm:my-8 md:my-12 lg:my-16">
      <div className="grid grid-cols-6 p-5 lg:p-5 xl:p-5 gap-5 items-center">
        <div className="col-span-6  md:col-span-3 px-0 lg:px-10 my-5">
          <div className="flex items-center ">
            <div className="footer-email p-5 lg:p-10 space-y-2.5 flex-1">
              <div className="text-2xl font-normal">
                {t.rich("emailTip", {
                  br: () => <br />,
                })}
              </div>
              <form
                action={submitAction}
                className="email-form border border-theme flex justify-between pl-2.5"
              >
                <input
                  type="text"
                  placeholder={
                    state?.success ? t("emailReceived") : t("emailPlaceholder")
                  }
                  name="email"
                  maxLength={256}
                  className="flex-1 min-w-[100px] sm:min-w-auto"
                />
                <button
                  type="submit"
                  className="email-btn bg-theme px-5 py-2.5"
                >
                  {t("emailBtnText")}
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h5 className="text-brand-gold text-xs uppercase tracking-[0.2em] my-2.5 text-theme">
              {t("network")}
            </h5>
            <div className="flex gap-2.5">
              <div className="flex items-center gap-3 mb-3 text-sm text-text-muted">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full shadow-[0_0_8px_#00FF00]"></div>
                <span>Routing: Operational</span>
              </div>
              <div className="flex items-center gap-3 mb-3 text-sm text-text-muted">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full shadow-[0_0_8px_#00FF00]"></div>
                <span>Nodes: 12,999 Online</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm sm:text-base col-span-6 md:col-span-3 grid grid-cols-3 my-10 gap-2.5">
          <div className="col-span-1 space-y-5">
            <div className="text-theme font-bold text-base sm:text-lg">
              {t("product")}
            </div>
            <div>
              <div className="flex justify-between">
                <Link href="/core">AIL2 Core</Link>
                <span className="border border-theme text-theme   rounded-sm text-[10px] px-1 leading-none hidden sm:flex md:hidden lg:flex justify-center items-center">
                  SDK
                </span>
              </div>
              <p className="text-sm text-white/30">Execution layer & SDK</p>
            </div>
            <div>
              <div className="flex justify-between">
                <Link href="/ecosystem">AIL2 Builder</Link>
                <span className="border border-theme text-theme   rounded-sm text-[10px] px-1 leading-none hidden sm:flex md:hidden lg:flex justify-center items-center">
                  IMO
                </span>
              </div>
              <p className="text-sm text-white/30">IMO Model Launchpad</p>
            </div>
            <div>
              <div className="flex justify-between">
                <Link href="/models">AIL2 Creator</Link>
                <span className="border border-theme text-theme   rounded-sm text-[10px] px-1 leading-none hidden sm:flex md:hidden lg:flex justify-center items-center">
                  IAO
                </span>
              </div>
              <p className="text-sm text-white/30">IAO Agent Composition</p>
            </div>
          </div>
          <div className="col-span-1 space-y-5">
            <div className="text-theme font-bold text-base sm:text-lg">
              {t("blog")}
            </div>
            <div>
              <div className="flex justify-between">
                <Link href="/docs">Docs</Link>
                <span className="border border-theme text-theme   rounded-sm text-[10px] px-1 leading-none hidden sm:flex md:hidden lg:flex justify-center items-center">
                  NEW
                </span>
              </div>
              <p className="text-sm text-white/30">SDK.Contracts -API</p>
            </div>
            <div>
              <div className="flex justify-between">
                <Link href="/blog">Blog</Link>
                <span className="border border-theme text-theme   rounded-sm text-[10px] px-1 leading-none hidden sm:flex md:hidden lg:flex justify-center items-center">
                  UPDATE
                </span>
              </div>
              <p className="text-sm text-white/30">Updates .Announcements</p>
            </div>
            <div>
              <div className="flex justify-between">
                <Link href="/research">Research</Link>
                <span className="border border-theme text-theme   rounded-sm text-[10px] px-1 leading-none hidden sm:flex md:hidden lg:flex justify-center items-center">
                  PAPER
                </span>
              </div>
              <p className="text-sm text-white/30">Papers.Architecture</p>
            </div>
          </div>
          <div className="col-span-1 space-y-5">
            <div className="text-theme font-bold text-base sm:text-lg">
              {t("ecosystem")}
            </div>
            <div>
              <div className="flex justify-between">
                <Link className="whitespace-nowrap" href="/incubator">
                  Incubator
                </Link>
                <span className="border border-theme text-theme   rounded-sm text-[10px] px-1 leading-none hidden sm:flex md:hidden lg:flex justify-center items-center">
                  APPLY
                </span>
              </div>
              <p className="text-sm text-white/30">
                Launch support for creators
              </p>
            </div>

            <div>
              <div className="flex justify-between">
                <Link className="whitespace-nowrap" href="/contact">
                  Contact Us
                </Link>
                <span className="border border-theme text-theme px-0.5 py-0.5 rounded-sm text-[10px] px-1 leading-none hidden sm:flex md:hidden lg:flex justify-center items-center">
                  BD
                </span>
              </div>
              <p className="text-sm text-white/30">BD.Support .Media</p>
            </div>
            <div>
              <div className="flex justify-between">
                <Link className="whitespace-nowrap" href="/foud">
                  Ecosystem Fund
                </Link>
                <span className="border border-theme text-theme   rounded-sm text-[10px] px-1 leading-none hidden sm:flex md:hidden lg:flex justify-center items-center">
                  GRANT
                </span>
              </div>
              <p className="text-sm text-white/30">Grants.Growth programs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center border-t border-white/6">
        <div className="w-fit sm:w-full grid grid-cols-2 px-10 py-10  space-y-5 sm:space-y-0">
          <div className="col-span-2 sm:col-span-1 text-center sm:text-left whitespace-nowrap">
            {t("copyright")}
          </div>
          <div className="col-span-2 sm:col-span-1 flex justify-center  sm:justify-end ">
            {/* <div className="text-theme text-base font-normal mr-20">
              {t("socials")}
            </div> */}
            <div className="flex gap-2.5">
              <Link href={siteConfig.xUrl} target="_blank">
                <TwitterIcon fill="var(--color-theme)" />
              </Link>
              <TelegramIcon fill="var(--color-theme)" />
              <MediumIcon fill="var(--color-theme)" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
