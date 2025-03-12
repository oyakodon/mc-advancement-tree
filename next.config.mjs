import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: '',
  basePath: '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crafatar.com',
      },
      {
        protocol: 'https',
        hostname: 'dendro-assets.oykdn.work',
      },
    ],
  },
}

// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

export default nextConfig
