const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const path = require("path")

const htmlPlugin = new HtmlWebPackPlugin({
  template: "src/index.html",
  filename: "index.html"
});

const swPlugin = new WorkboxPlugin.InjectManifest({
  swSrc: "./src/service-worker.js",
  exclude: [
    /hot-update/,
    /\.map/
  ],
})

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "./../dist"),
  },

  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },

  module: {
    rules: [
      {
        test: /\.(js)|(jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },

  /**
   * Implicitly resolve .js & .jsx extensions (No need to include file extension in import statements)
   */
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    htmlPlugin,
    swPlugin
  ]
};