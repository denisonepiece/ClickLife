const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = function () {
  return {
    optimization: {
      minimizer: [new TerserJSPlugin]
    }
  }
};