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
        },
        {
          label: t("accelerate"),
          href: "/accelerate",
        },
        {
          label: t("faq"),
          href: "/faq",
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
