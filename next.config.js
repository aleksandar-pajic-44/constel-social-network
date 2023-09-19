/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_DB_HOST: process.env.NEXT_PUBLIC_DB_HOST,
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
