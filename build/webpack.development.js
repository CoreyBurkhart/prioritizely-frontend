const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const path = require('path')

const dev = {
  mode: "development",

  devServer: {
    contentBase: './',
    hot: true,
    historyApiFallback: true,
    inline: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(common, dev)