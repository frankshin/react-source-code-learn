const path = require('path')
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
  }
  return merge(baseConfig, devConfig)
}
