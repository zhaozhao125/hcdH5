module.exports = {
  baseUrl: '',
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/sass/global.scss";'
      }
    }
  },
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined
}
