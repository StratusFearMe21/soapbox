import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: "build/dist",
  basePath: process.env.PAGES_BASE_PATH,
};

export default nextConfig;
