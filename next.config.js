/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    DB_HOST: process.env.DB_HOST,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['constel-hr-frontend.s3.eu-central-1.amazonaws.com'],
  },
}

module.exports = nextConfig;
