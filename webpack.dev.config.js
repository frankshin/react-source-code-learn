const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const localReactFolder = `local-react/${process.env.LEARN_VERSION}`

module.exports = {
  mode: 'development',
  cache: false,
  entry: {
    index: `./${process.env.LEARN_VERSION}/index.js`,
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
        exclude: /(node_modules|local-react)/, // ps: 
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
      '@': path.resolve(__dirname, `${process.env.LEARN_VERSION}`)
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