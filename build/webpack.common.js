const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const path = require("path")

const htmlPlugin = new HtmlWebPackPlugin({
  template: "src/index.html",
  filename: "index.html"
});

const swPlugin = new WorkboxPlugin.InjectManifest({
  swSrc: "./src/service-worker.js"
})

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "./../dist")
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

  plugins: [
    htmlPlugin,
    swPlugin
  ]
};