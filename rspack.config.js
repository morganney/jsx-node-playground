import { defineConfig } from '@rspack/cli'
import { rspack } from '@rspack/core'

const makeRules = jsxMode => [
  {
    test: /\.ts$/,
    use: [
      {
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        },
      },
      {
        loader: '@knighted/jsx/loader',
        options: {
          tags: ['reactJsx'],
          mode: jsxMode,
          sourceMap: true,
        },
      },
      {
        resourceQuery: /knighted-css/,
        loader: '@knighted/css/loader',
        options: {
          lightningcss: { minify: true },
        },
      },
    ],
  },
]

const resolve = {
  extensions: ['.ts', '.js'],
  extensionAlias: {
    '.js': ['.ts', '.js'],
  },
}

const plugins = [
  new rspack.ProvidePlugin({
    React: ['react'],
  }),
]

const serverConfig = defineConfig({
  target: 'node',
  mode: 'production',
  entry: {
    server: './src/server.ts',
  },
  experiments: {
    css: true,
    outputModule: true,
  },
  output: {
    module: true,
    chunkFormat: 'module',
    filename: '[name].js',
  },
  module: { rules: makeRules('react') },
  plugins,
  resolve,
})

const clientConfig = defineConfig({
  target: 'web',
  mode: 'production',
  entry: {
    client: './src/client.ts',
  },
  experiments: {
    css: true,
    outputModule: true,
  },
  output: {
    module: true,
    chunkFormat: 'module',
    filename: '[name].js',
  },
  module: { rules: makeRules('react') },
  plugins,
  resolve,
})

export default [serverConfig, clientConfig]
