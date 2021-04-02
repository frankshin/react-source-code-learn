const path = require('path')
const webpack = require('webpack')
const codeRootFolder = path.resolve(__dirname, '../self-router')
const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')

module.exports = function () {
  const devConfig = {
    entry: {
      index: `${codeRootFolder}/index.js`,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, `${codeRootFolder}`),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
    ],
  }
  return merge(baseConfig, devConfig)
}
