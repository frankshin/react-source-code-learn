const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const localReactFolder = `react-local/${process.env.LEARN_VERSION}`
const praticesCodeFolder = path.resolve(__dirname, `react-pratices/${process.env.LEARN_VERSION}`)

module.exports = {
  mode: 'development',
  cache: false,
  entry: {
    index: `${praticesCodeFolder}/index.js`,
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 9001
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|react-local)/, // ps: 
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, `${localReactFolder}/react`),
      'react-dom': path.resolve(__dirname, `${localReactFolder}/react-dom`),
      'react-router-dom': path.resolve(__dirname, `${localReactFolder}/react-router-dom`),
      'fbjs': path.resolve(__dirname, `${localReactFolder}/fbjs`),
      '@': path.resolve(__dirname, `${praticesCodeFolder}`)
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
  ]
};