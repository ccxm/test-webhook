// webpack打包配置，添加了路径映射
const path = require('path')
const webpack = require('webpack')
// 将js加入html模板中
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const utils = {
    assetsPath: function (_path) {
        const assetsSubDirectory = process.env.NODE_ENV === 'production'
          // 生产环境下的 static 路径
          ? 'public'
          // 开发环境下的 static 路径
          : 'public'
        return path.posix.join(assetsSubDirectory, _path)
    },
    resolve: function(dir) {
        return path.join(__dirname, '..', dir)
    }
}

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    context: path.resolve(__dirname, './'),
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            '@pages': resolve('src/pages'),
            '@public': resolve('public'),
            '@components': resolve('src/components'),
            '@api': resolve('src/api'),
            '@utils': resolve('src/utils')
        }
    },
    plugins: [
        /** 非ie使用，ie则注释掉 */
        // 引入dll.js
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require('./public/vendor/vendor-manifest.json')
        }),
        // 将 dll 注入到 生成的 html 模板中
        new AddAssetHtmlPlugin({
            // dll文件位置
            filepath: path.resolve(__dirname, './public/vendor/*.js'),
            // dll 引用路径
            publicPath: '/vendor',
            // dll最终输出的目录
            outputPath: '/vendor'
        }),
        /** 非ie使用，ie则注释掉结束 */
        // 显示时间滚动条
        new ProgressBarPlugin({
            format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        })
    ],
    // module: {
    //     rules: [
    //         {
    //             test: /\.scss$/,
    //             use: [
    //                 'style-loader',
    //                 'css-loader',
    //                 'postcss-loader',
    //                 'sass-loader',
    //                 {
    //                     loader: 'sass-resources-loader',
    //                     options: {
    //                         // Provide path to the file with resources
    //                         resources: [
    //                             './src/style/index.scss',
    //                         ],
    //                     },
    //                 },
    //             ],
    //         },
    //     ]
    // }
    
}
