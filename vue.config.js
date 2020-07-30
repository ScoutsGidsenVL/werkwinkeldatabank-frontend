module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      filename: 'scouts-wwdb.js'
    }
  },
  filenameHashing: false,
  css: {
    extract: false
  }
}
