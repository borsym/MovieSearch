/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_KEY: process.env.API_KEY, // TODO check, .env
  },
};

module.exports = nextConfig;
