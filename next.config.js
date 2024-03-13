const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/pac-man",
  reactStrictMode: false,
};

module.exports = withVanillaExtract(nextConfig);
