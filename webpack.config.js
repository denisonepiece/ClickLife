const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devServer = require('./webpack/devserver');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const pug = require('./webpack/pug');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const terserJS = require('./webpack/terser');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};


const common = merge(
  {
    entry: {
      'index': PATHS.src + '/templates/pages/index/index.js',
      'ui-kit': PATHS.src + '/templates/pages/ui-kit/ui-kit.js'
    },
    output: {
      path: PATHS.build,
      filename: "js/[name].js",
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        chunks: ['index', 'common'],
        template: PATHS.src + '/templates/pages/index/index.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "ui-kit.html",
        chunks: ['ui-kit', 'common'],
        template: PATHS.src + '/templates/pages/ui-kit/ui-kit.pug'
      }),
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        }
      )
    ],
  },
  pug(),
  images(),
  fonts()
);


module.exports = function (env) {
  if (env === 'production') {
    return merge([
      common,
      extractCSS(),
      terserJS()
    ]);
  }

  if (env === 'development') {
    return merge([
      common,
      devServer(),
      sass(),
      css(),
    ])
  }
};