import type { NextConfig } from 'next';
import { legacyGonePatterns, legacyRedirects } from './lib/redirects';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  async redirects() {
    return legacyRedirects;
  },
  async headers() {
    return legacyGonePatterns.map((source) => ({
      source,
      headers: [
        {
          key: 'X-Robots-Tag',
          value: 'noindex, nofollow',
        },
      ],
    }));
  },
};

export default nextConfig;
