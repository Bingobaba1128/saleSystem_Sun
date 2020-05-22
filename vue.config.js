module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: process.env.VUE_APP_DIR_NAME,
  // webpack-dev-server 相关配置
  // 120.78.186.60:8085
  devServer: {
    open: true,
    host: "127.0.0.1",
    port: 8520,
    https: false,
    hotOnly: false,
    before: () => { },
    proxy: {
      '/apis': {
        target: 'http://120.78.186.60:8085',  // target host 
        // target: 'http://192.168.5.103:8080',
        ws: true,  // proxy websockets 
        changeOrigin: true,  // needed for virtual hosted sites
        pathRewrite: {
          '^/apis': ''  // rewrite path
        }
      },
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: "./src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html"
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 第三方插件配置
  pluginOptions: {}
};