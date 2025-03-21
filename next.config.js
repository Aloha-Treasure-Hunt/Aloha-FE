/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wxtjaodmoxrflltjpkew.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    domains: ['storage.googleapis.com'],
  },
};

module.exports = nextConfig;
