// // vue.config.js
// // 固定名称，用于个性化配置项目包
// module.exports = {
//   devServer: {
//     proxy: {
//       // 自定义的值
//       // /dy 开头的请求，代理到 target 的域名
//       '/api': {
//         target: 'http://127.0.0.1:3000/',
//         changeOrigin: true,   //代表域名有变更，即跨域
//         logLevel: 'debug',    //命令行输出调试日志
//         // 路径重写
//         pathRewrite: {
//           // ^：正则的字符串开头
//           // 代表：把开头的 /api 在实际使用时删除掉
//           '^/api':'',
//         }
//       },
//     }
//   }
// }