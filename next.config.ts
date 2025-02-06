import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images-assets.nasa.gov"],
  },
  reactStrictMode: true,
};

export default nextConfig;
