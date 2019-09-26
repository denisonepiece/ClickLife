module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(jpg|png|svg)$/,
          exclude: /(fonts)/,
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]'
          }
        }
      ]
    }
  }
};