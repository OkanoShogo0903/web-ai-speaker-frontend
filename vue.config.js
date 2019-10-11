module.exports = {
  devServer: {
      port: 1145,
      disableHostCheck: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  }
}
