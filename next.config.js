/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.igdb.com", "media.istockphoto.com"],
  },
};
const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder(nextConfig);
