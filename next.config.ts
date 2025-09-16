import type { NextConfig } from "next";

// 仅在 GitHub Pages 发布时使用 basePath/assetPrefix
// 在 Vercel 或其他平台应保持为空，否则会导致资源路径 404（样式丢失）
const isGhPages = process.env.DEPLOY_TARGET === 'gh-pages';
const repoBase = isGhPages ? '/yunce-nextjs-portal' : '';

const nextConfig: NextConfig = {
  ...(isGhPages ? { output: 'export' } : {}),
  ...(isGhPages ? { basePath: repoBase, assetPrefix: repoBase + '/' } : {}),
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
