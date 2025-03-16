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

  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-10px)' },
          '40%': { transform: 'translateX(10px)' },
          '60%': { transform: 'translateX(-5px)' },
          '80%': { transform: 'translateX(5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatDelay: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'floatDelay 5s ease-in-out 1s infinite',
      },
    },
  },
  plugins: [],
}

module.exports = nextConfig