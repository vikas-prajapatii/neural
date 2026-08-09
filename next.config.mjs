/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/ai-cinematic-video-production',
        destination: '/services/ai-cinematic-video-production',
      },
    ];
  },
};

export default nextConfig;
