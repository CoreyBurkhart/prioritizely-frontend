const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const dev = {
  mode: "development",

  devServer: {
    noInfo: true,
    contentBase: './dist'
  }
}

module.exports = merge(common, dev)