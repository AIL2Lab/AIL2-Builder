import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const cspHeader = [
  "default-src 'self';",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
  "style-src 'self' 'unsafe-inline';",
].join(' ');

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/seed/**",
        search: "",
      },
    ],
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
