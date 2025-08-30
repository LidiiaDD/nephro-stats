/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // якщо використовуєш /app:
  experimental: { appDir: true },

  // невеликі фоли для браузерного оточення
  webpack: (config) => {
    if (!config.resolve) config.resolve = {};
    config.resolve.fallback = {
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      util: false,
    };
    return config;
  },

  // опціонально: компактніший деплой
  output: 'standalone',
};

module.exports = nextConfig;


