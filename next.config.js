/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  images: {
    domains: ['pbs.twimg.com'], // Allow Twitter profile images
  },
  async rewrites() {
    return [
      {
        source: '/api/twitter/:path*',
        destination: 'https://api.twitter.com/2/:path*',
      },
    ];
  },
}

module.exports = nextConfig 