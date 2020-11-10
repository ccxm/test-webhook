const configureWebpack = require('./webpack.config')
module.exports = {
    configureWebpack,
    publicPath: './',    // 公共路径
    devServer: {
        port: 3006,
        proxy: {
            // proxy all requests starting with /api to jsonplaceholder
            '/api': {
                target: 'https://blog.cxmmao.com/',   //代理接口
                changeOrigin: true,
            },
            '/md': {
                target: 'https://blog.cxmmao.com/',   //代理接口
                changeOrigin: true,
            },
            '/blog-images': {
                target: 'https://blog.cxmmao.com/',   //代理接口
                changeOrigin: true,
            }
        }
    },
    //配置全局样式变量
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "./src/style/index.scss";`
            }
        }
    }
}
