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
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

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
      'tariff': PATHS.src + '/templates/pages/tariff/tariff.js',
      'settings': PATHS.src + '/templates/pages/settings/settings.js',
      'task': PATHS.src + '/templates/pages/task/task.js',
      'task-list': PATHS.src + '/templates/pages/task-list/task-list.js',
      'task-create': PATHS.src + '/templates/pages/task-create/task-create.js',
      'select-performer': PATHS.src + '/templates/pages/select-performer/select-performer.js',
      'notifications': PATHS.src + '/templates/pages/notifications/notifications.js',
    },
    output: {
      path: PATHS.build,
      filename: "js/[name].js",
    },
    devtool: 'source-map',
    plugins: [
      new FaviconsWebpackPlugin({
        logo: PATHS.src + '/assets/img/favicon.png',
        publicPath: '.',
      }),
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
      new HtmlWebpackPlugin({
        filename: "tariff.html",
        chunks: ['tariff', 'common'],
        template: PATHS.src + '/templates/pages/tariff/tariff.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "settings.html",
        chunks: ['settings', 'common'],
        template: PATHS.src + '/templates/pages/settings/settings.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "task.html",
        chunks: ['task', 'common'],
        template: PATHS.src + '/templates/pages/task/task.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "task-blocked.html",
        chunks: ['task', 'common'],
        template: PATHS.src + '/templates/pages/task/task-blocked.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "task-created.html",
        chunks: ['task', 'common'],
        template: PATHS.src + '/templates/pages/task/task-created.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "task-list.html",
        chunks: ['task-list', 'common'],
        template: PATHS.src + '/templates/pages/task-list/task-list.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "task-create.html",
        chunks: ['task-create', 'common'],
        template: PATHS.src + '/templates/pages/task-create/task-create.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "select-performer.html",
        chunks: ['select-performer', 'common'],
        template: PATHS.src + '/templates/pages/select-performer/select-performer.pug'
      }),
      new HtmlWebpackPlugin({
        filename: "notifications.html",
        chunks: ['notifications', 'common'],
        template: PATHS.src + '/templates/pages/notifications/notifications.pug'
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