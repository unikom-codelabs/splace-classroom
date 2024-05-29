/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "aicstorage.blob.core.windows.net",
      },
    ],
  },
};

module.exports = nextConfig;
