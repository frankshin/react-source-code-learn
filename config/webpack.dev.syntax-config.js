const path = require('path')
const praticesCodeFolder = path.resolve(__dirname, '../syntax-pratices')
const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')

module.exports = function () {
  const devConfig = {
    entry: {
      index: `${praticesCodeFolder}/index.js`,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, `${praticesCodeFolder}`),
      },
    },
  }
  return merge(baseConfig, devConfig)
}
