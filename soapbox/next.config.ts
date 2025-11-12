import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: process.env.PAGES_OUTPUT || "dist",
  basePath: process.env.PAGES_BASE_PATH || "",
};

export default nextConfig;
