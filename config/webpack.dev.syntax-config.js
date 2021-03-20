const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const praticesCodeFolder = path.resolve(__dirname, `../syntax-pratices`)

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
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  resolve: {
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
  ]
};