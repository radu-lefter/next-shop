/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    protocol: 'http',
    domains: ['localhost'],
  },
}

module.exports = nextConfig
