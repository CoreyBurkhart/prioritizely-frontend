const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

const dev = {
  mode: "development",

  devServer: {
    contentBase: './',
    hot: true,
    historyApiFallback: true,
    inline: true,
    compress: true,
    proxy: {
      '/api': 'http://localhost:8081'
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(common, dev)