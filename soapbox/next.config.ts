import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: process.env.PAGES_OUTPUT,
  basePath: process.env.PAGES_BASE_PATH,
};

export default nextConfig;
