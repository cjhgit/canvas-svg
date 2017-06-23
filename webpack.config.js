var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包

module.exports = {
    devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    entry:  __dirname + "/src/index.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist",//打包后的文件存放的地方
        filename: "fucksvg.js"//打包后输出文件的文件名
    },

    module: {//在配置文件里添加 JSON loader
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'//在 webpack 的 module 部分的 loaders 里进行配置即可
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            //解析.scss文件,对于用 import 或 require 引入的sass文件进行加载，以及<style lang="sass">...</style>声明的内部样式进行加载
            /*{
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
            }*/
            /*,
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules'//跟前面相比就在后面加上了 ?modules
            }*/
        ]
    },
    plugins: {
        //new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js')
    },
    devServer: {
        port: 9999,
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
}