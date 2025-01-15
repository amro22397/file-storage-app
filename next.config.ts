import type { NextConfig } from "next";

module.exports = {
  reactStrictMode: true,
  output: 'standalone',
};

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      }
    ]
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  }
};


export default nextConfig;
