import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const cspHeader = [
  "default-src 'self';",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
  "style-src 'self' 'unsafe-inline';",
  "img-src 'self' https://picsum.photos https://www.decentralgpt.org;"
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
      {
        source: '/((?!_next|api).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
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
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "www.decentralgpt.org",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
