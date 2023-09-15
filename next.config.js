/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    DB_HOST: process.env.DB_HOST,
  },
}

module.exports = nextConfig;
