/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ranchomarket.site',
        port: '',
        pathname: '/fotografias/**',
      },
    ],
  },

  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
