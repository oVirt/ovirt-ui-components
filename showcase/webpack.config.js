const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    bundle: './index.js',
  },
  output: {
    path: './dist',
    filename: '[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      // load ovirt-ui-components using css modules
      { test: /\.css$/, loader: 'style!css?modules!postcss', exclude: /node_modules/ },
      // and global css dependencies using traditional loader
      { test: /\.css$/, loader: 'style!css!postcss', include: /node_modules/ },
      // inline base64 URLs for <= 8k images, direct URLs for the rest
      { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url?limit=8192' },
      { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: 'url?mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: 'file?name=[name].[ext]' },
    ],
  },
  resolve: {
    alias: {
      'ovirt-ui-components': path.join('..', 'src'),
    },
    extensions: ['', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: 'index.html' },
    ]),
    new webpack.ProvidePlugin({
      'jQuery': 'jquery',
      '$': 'jquery',
    }),
  ],
}
