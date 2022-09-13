/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.igdb.com", "media.istockphoto.com"],
  },
};

module.exports = nextConfig;
