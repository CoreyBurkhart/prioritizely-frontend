const path = require('path');
const plugins = require('./plugins');

module.exports = {
  entry: {
    main: ['babel-polyfill', 'whatwg-fetch', './src/index.js'],
  },

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './../dist/frontend'),
  },

  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false,
  },

  module: {
    rules: [
      {
        test: /\.(js)|(jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },

  /**
   * Implicitly resolve .js & .jsx extensions (No need to include file
   * extension in import statements)
   */
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
    extensions: ['.js', '.jsx'],
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [plugins.copy, plugins.html, plugins.sw],
};
