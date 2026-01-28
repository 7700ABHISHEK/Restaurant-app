/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.toiimg.com',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains (use cautiously)
      },
    ],
  },
};

export default nextConfig;
