import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const cspHeader = [
  "default-src 'self';",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.tiny.cloud;",
  "style-src 'self' 'unsafe-inline' https://cdn.tiny.cloud;",
  "img-src 'self' blob: data: https://picsum.photos https://www.decentralgpt.org https://images.unsplash.com https://cdn.tiny.cloud;",
  "connect-src 'self' https://cdn.tiny.cloud;",
  "media-src 'self' https://cdn.tiny.cloud;",
  "font-src 'self' data: https://cdn.tiny.cloud;"
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
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.decentralgpt.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
