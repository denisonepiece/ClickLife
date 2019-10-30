const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (paths) {
  return {
    module: {
      rules: [
        {
          test: /\.sass$/,
          include: paths,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({
                    'overrideBrowserslist' : ['defaults', 'last 4 version']
                  })
                ],
                sourceMap: true
              }
            },
            'sass-loader',
          ],

        },
        {
          test: /\.css$/,
          include: paths,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
            },
            'css-loader',
          ],
        },
      ],
    },

    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'common',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      }
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: './css/[name].css',
        chunkFilename: './css/[name].css'
      }),
    ],
  };
};
