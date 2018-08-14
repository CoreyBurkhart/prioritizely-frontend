const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

const prod = {
  mode: "production",
  devtool: 'source-map'
}

module.exports = merge(common, prod)