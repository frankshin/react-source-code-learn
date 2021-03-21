
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const localReactFolder = `../react-local/${process.env.LEARN_VERSION}`

const baseConfigs = {
  mode: 'development',
  cache: false,
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 9001,
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|react-local)/, // ps:
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, `${localReactFolder}/react`),
      'react-dom': path.resolve(__dirname, `${localReactFolder}/react-dom`),
      'react-router-dom': path.resolve(__dirname, `${localReactFolder}/react-router-dom`),
      fbjs: path.resolve(__dirname, `${localReactFolder}/fbjs`),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
  ],
}

module.exports = baseConfigs
