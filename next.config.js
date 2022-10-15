/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.igdb.com", "media.istockphoto.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder(nextConfig);
