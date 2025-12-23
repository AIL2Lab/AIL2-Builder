import { Zap, Cpu, Sparkles } from "lucide-react";
import React from "react";

export const siteConfig = {
  xUrl: "https://x.com/AIL2Lab",
  githubUrl: "https://github.com/AIL2Lab",
  telegramUrl: "",
  email: "creator@hpvideo.ai"
};

export function getNavbarConfig(t: (key: string) => string) {
  const navbarLeft = [
    {
      label: t("product"),
      href: "/",
    },
    {
      label: t("research"),
      href: "/research",
    },
    {
      label: t("ecosystem"),
      href: "/ecosystem",
    },
    {
      label: t("learn"),
      href: "",
      children: [
        {
          label: t("platform"),
          href: "/platform",
          description: 'AI Acceleration Platform',
          icon: 'Zap'
        },
        {
          label: t("creator"),
          href: "/creator",
        },
        {
          label: t("accelerate"),
          href: "/accelerate",
          description: 'Accelerating the journey',
          icon: 'Cpu'
        },
        {
          label: t("faq"),
          href: "/faq",
          description: 'Frequently asked questions',
          icon: 'Sparkles'
        },
      ],
    },
  ];

  const navbarRight = [
    {
      label: t("blog"),
      href: "",
    },
  ];

  return {
    navbarLeft,
    navbarRight,
    allNavbar: [...navbarLeft, ...navbarRight],
  };
}
