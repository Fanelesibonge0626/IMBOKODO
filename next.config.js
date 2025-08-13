/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig; 