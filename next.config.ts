import type { NextConfig } from "next";

const repoBase = '/yunce-nextjs-portal';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: repoBase,
  assetPrefix: repoBase + '/',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: repoBase,
  },
  images: { unoptimized: true },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
