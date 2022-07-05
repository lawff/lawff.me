import path from 'path'
import UnoCSS from '@unocss/webpack'
import Mdx from '@next/mdx'

const withMDX = Mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: '@mdx-js/react',
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  // Append the default value with md extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    plugins: true,
    scrollRestoration: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
  reactStrictMode: true,
  webpack: (config, context) => {
    if (context.buildId !== 'development') {
      // * disable filesystem cache for build
      // * https://github.com/unocss/unocss/issues/419
      // * https://webpack.js.org/configuration/cache/
      config.cache = false
    }
    config.plugins.push(
      UnoCSS(),
    )

    // Don't bundle the shim unnecessarily.
    config.resolve.alias['use-sync-external-store/shim'] = 'react'

    return config
  },
})

export default nextConfig
