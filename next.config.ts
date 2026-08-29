import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true" || process.env.DEPLOY_TARGET === "gh-pages";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGhPages ? "/India-eVisa" : "",
  assetPrefix: isGhPages ? "/India-eVisa/" : "",
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
