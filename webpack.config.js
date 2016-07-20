'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const args = require('yargs').argv

module.exports = webpackMerge(require(`./webpack/${args.env}`), {
  entry: {
    vendor: './src/vendor.browser',
    main: './src/main.browser'
  },
  output: {
    path: 'dist',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.es6', '.json'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: ['src/index.html']
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        loader: 'file?name=dist/images/[name].[ext]'
      },
      {
        test: /\.woff2?$/,
        loader: 'url?name=dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
       },
      {
        test: /\.(ttf|eot|svg)$/,
        loader: 'file?name=dist/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'src/index.html'),
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'WEBPACK_ENV': `"${args.env}"`
    })
  ]
})
