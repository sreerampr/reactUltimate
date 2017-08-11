const webpack = require('webpack');
const path = require('path');
const CommonConfig = require('./webpack.common.js');
const Merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const variables = require('./variables');

module.exports = Merge(CommonConfig, {
  devtool: 'inline-source-map',
  entry: {
    app: ['react-hot-loader/patch', variables.entry],
  },
  output: {
    path: path.resolve(__dirname, variables.dist),
    filename: '[name].bundle.js',
    publicPath: variables.devPublicPath,
    sourceMapFilename: '[name].map'
  },

  devServer: {
    hot: true, // Tell the dev-server we're using HMR
    contentBase: path.resolve(__dirname, variables.dist),
    port: variables.devPort,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: '/',
    proxy: {
      "**": "http://localhost:5000"
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.ejs'
    }),
    new ManifestPlugin({
      fileName: '.manifest.json',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
});
