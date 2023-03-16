/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    protocol: 'http',
    domains: ['127.0.0.1'],
  },
}

module.exports = nextConfig
