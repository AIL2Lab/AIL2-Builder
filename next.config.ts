import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const cspHeader = [
  "default-src 'self';",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
  "connect-src 'self' https://api.web3modal.org https://cloud.reown.com https://cca-lite.coinbase.com https://pulse.walletconnect.org https://rpc.walletconnect.org wss://relay.walletconnect.org https://rpc-testnet.dbcwallet.io https://rpc2.dbcwallet.io;" ,
  "font-src 'self' https://fonts.reown.com https://fonts.gstatic.com;",
  "img-src 'self' data: blob: https:;",
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
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "402pay.oss-ap-northeast-2.aliyuncs.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
