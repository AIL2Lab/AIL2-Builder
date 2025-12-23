"use client";
import { useTranslations } from "next-intl";
import React from "react";

export const Sidebar: React.FC = () => {
  const t = useTranslations("Docs");
  const navigation = [
    {
      title: t("sidebar.gettingStarted"),
      items: [
        { title: t("sidebar.introduction"), href: "#introduction" },
        { title: t("sidebar.setup"), href: "#sdk-installation" },
        { title: t("sidebar.quickStart"), href: "#quick-start" },
      ],
    },
    {
      title: t("sidebar.coreConcepts"),
      items: [
        { title: t("sidebar.pol"), href: "#proof-of-inference" },
        { title: t("sidebar.stateChannels"), href: "#state-channels" },
        { title: t("sidebar.tokenEconomics"), href: "#token-economics" },
      ],
    },
    {
      title:  t("sidebar.apiReference"),
      items: [
        { title: t("sidebar.inferenceAPI"), href: "#api-infer" },
        { title: t("sidebar.modelRegistry"), href: "#api-models" },
      ],
    },
    {
      title: t("sidebar.management"),
      items: [{ title: t("sidebar.billing"), href: "#billing" }],
    },
  ];

  return (
    <nav className="hidden lg:block fixed z-20 inset-0 top-48 left-[max(0px,calc(50%-45rem))] right-auto w-[18rem] pb-10 px-8 overflow-y-auto border-r border-white/5">
      <div className="relative pt-4">
        <ul className="space-y-12">
          {navigation.map((group) => (
            <li key={group.title}>
              <h5 className="text-theme text-base font-bold mb-6">
                {group.title}
              </h5>
              <ul className="space-y-5">
                {group.items.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      className="block text-[14px] font-medium transition-all duration-200 text-slate-400 hover:text-white hover:translate-x-1"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
