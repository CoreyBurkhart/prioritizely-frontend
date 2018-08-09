const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path")

const htmlPlugin = new HtmlWebPackPlugin({
  template: "src/client/index.html",
  filename: "index.html"
});

module.exports = {
  entry: "./src/client/index.js",
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "./dist")
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
        test: /\.css$/,
        use: [
          "style-loader", 
          "css-loader"
        ]
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [htmlPlugin],

  devServer: {
    noInfo: true
  }
};