const path = require('path')
const praticesCodeFolder = path.resolve(__dirname, `../react-pratices/${process.env.LEARN_VERSION}`)
const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')

module.exports = function () {
  const configs = {
    entry: {
      index: `${praticesCodeFolder}/index.js`,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, `${praticesCodeFolder}`),
      },
    },
  }
  return merge(baseConfig, configs)
}
