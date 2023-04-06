const path = require('path')
const UnoCSS = require('@unocss/webpack').default
const { remarkPlugins } = require('./plugins/markdownToHtml')

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  distDir: 'build',
  pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'mdx', 'md'],
  experimental: {
    plugins: true,
    scrollRestoration: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
  },

  webpack: (config, { ...options }) => {
    if (options.buildId !== 'development') {
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

    const { IgnorePlugin } = require('webpack')
    config.plugins.push(
      new IgnorePlugin({
        checkResource(resource, context) {
          if (
            /\/eslint\/lib\/rules$/.test(context)
            && /\.\/[\w-]+(\.js)?$/.test(resource)
          ) {
            // Skips imports of built-in rules that ESLint
            // tries to carry into the bundle by default.
            // We only want the engine and the React rules.
            return true
          }
          return false
        },
      }),
    )

    // Add our custom markdown loader in order to support frontmatter
    // and layout
    config.module.rules.push({
      test: /.mdx?$/, // load both .md and .mdx files
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins,
          },
        },
        path.join(__dirname, './plugins/md-layout-loader'),
      ],
    })

    return config
  },
}

module.exports = nextConfig
