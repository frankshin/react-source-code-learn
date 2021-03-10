const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  cache: false,
  entry: {
    index: `./${process.env.LEARN_VERSION}/index.js`,
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'dist/[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9001
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, `react/${process.env.LEARN_VERSION}/react`),
      'react-dom': path.resolve(__dirname, `react/${process.env.LEARN_VERSION}/react-dom`),
      'fbjs': path.resolve(__dirname, `react/${process.env.LEARN_VERSION}/fbjs`)
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