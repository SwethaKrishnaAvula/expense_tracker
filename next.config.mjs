/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

// Since we are not importing an external config, we call mergeConfig with an empty object
mergeConfig(nextConfig, {});

export default nextConfig;

function mergeConfig(nextConfig, _userConfig) {
  if (!_userConfig) {
    return;
  }

  for (const key in _userConfig) {
    if (typeof nextConfig[key] === 'object' && !Array.isArray(nextConfig[key])) {
      nextConfig[key] = {
        ...nextConfig[key],
        ..._userConfig[key],
      };
    } else {
      nextConfig[key] = _userConfig[key];
    }
  }
}