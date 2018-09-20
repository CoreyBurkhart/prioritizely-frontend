const HtmlWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const html = new HtmlWebPackPlugin({
  template: 'src/index.html',
  filename: 'index.html',
});

const sw = new WorkboxPlugin.InjectManifest({
  swSrc: './src/service-worker.js',
  exclude: [/hot-update/, /\.map/],
});

const copy = new CopyWebpackPlugin([
  {
    from: 'static',
    to: 'static',
  },
]);

module.exports = {
  copy,
  sw,
  html,
};
