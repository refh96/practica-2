/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '159.223.114.118',
        port: '3333',
        pathname: '/fotografias/**',
      },
    ],
  },

  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
