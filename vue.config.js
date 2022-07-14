module.exports = {
  publicPath: './',
  devServer: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_BASE_URL, // 要跨域的域名
        changeOrigin: true, // 是否开启跨域
        pathRewrite: {
          '^/api': '', // 代理的路径
        },
      },
    },
  },
}
