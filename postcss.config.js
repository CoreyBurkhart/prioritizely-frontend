module.exports = {
  // parser: 'sugarss'
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default'
    })
    // require('postcss-import')({ ...options }),
    // require('postcss-url')({ url: 'copy', useHash: true })
  ]
}