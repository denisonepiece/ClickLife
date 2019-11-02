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
const autoprefixer = require('autoprefixer');


const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const common = merge(
  {
    entry: {
      'ui-kit': PATHS.src + '/templates/pages/ui-kit/ui-kit.js',
      'index': PATHS.src + '/templates/pages/index/index.js',
      'profile': PATHS.src + '/templates/pages/profile/profile.js',
      'profile-edit': PATHS.src + '/templates/pages/profile-edit/profile-edit.js',
      'profile-edit-company': PATHS.src + '/templates/pages/profile-edit-company/profile-edit-company.js',
      'profile-another': PATHS.src + '/templates/pages/profile-another/profile-another.js',
      'profile-another-accept': PATHS.src + '/templates/pages/profile-another-accept/profile-another-accept.js',
    },
    output: {
      path: PATHS.build,
      filename: "js/[name].js",
    },
    devtool: 'source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "ui-kit.html",
        chunks: ['ui-kit', 'common'],
        template: PATHS.src + '/templates/pages/ui-kit/ui-kit.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        chunks: ['index', 'common'],
        template: PATHS.src + '/templates/pages/index/index.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "profile.html",
        chunks: ['profile', 'common'],
        template: PATHS.src + '/templates/pages/profile/profile.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "profile-edit.html",
        chunks: ['profile-edit', 'common'],
        template: PATHS.src + '/templates/pages/profile-edit/profile-edit.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "profile-edit-company.html",
        chunks: ['profile-edit-company', 'common'],
        template: PATHS.src + '/templates/pages/profile-edit-company/profile-edit-company.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "profile-another.html",
        chunks: ['profile-another', 'common'],
        template: PATHS.src + '/templates/pages/profile-another/profile-another.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "profile-another-accept.html",
        chunks: ['profile-another-accept', 'common'],
        template: PATHS.src + '/templates/pages/profile-another-accept/profile-another-accept.pug'
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