export const siteConfig = {
  xUrl: "https://x.com/AIL2Lab",
  githubUrl: "https://github.com/AIL2Lab",
  telegramUrl: "/",
  email: "creator@hpvideo.ai",
  mediumUrl: "/"
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
          label: t("core"),
          href: "/core",
          description: t("description.core"),
          icon: 'Activity'
        },
        {
          label: t("builder"),
          href: "/ecosystem",
          description: t("description.builder"),
          icon: 'Rocket'
        },
        {
          label: t("platform"),
          href: "/platform",
          description: t("description.platform"),
          icon: 'Zap'
        },
        {
          label: t("accelerate"),
          href: "/accelerate",
          description: t("description.accelerate"),
          icon: 'Cpu'
        },
        {
          label: t("faq"),
          href: "/faq",
          description: t("description.faq"),
          icon: 'Sparkles'
        },
      ],
    },
  ];

  const navbarRight = [
    {
      label: t("blog"),
      href: "/",
    },
  ];

  return {
    navbarLeft,
    navbarRight,
    allNavbar: [...navbarLeft, ...navbarRight],
  };
}
