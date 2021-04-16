const webpack = require('webpack');
console.log('webpack :>> ', webpack);
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV);
console.log(path.join(__dirname, 'dist'));

const webpackConfig = {
  mode: process.env.NODE_ENV, // 模式配置
  entry: {
    demo: './demo.js'
  }, // 入口文件
  output: {
    // 添加hash可以防止文件缓存，每次都会生成8位的hash串
    filename: '[name].[hash:8].js',
    path: path.join(__dirname, 'dist'),
    publicPath: ''
  }, // 出口文件
  // module: {}, // 处理对应模块
  plugins: [
    new HtmlWebpackPlugin({
      // 用哪个html作为模板在public目录下创建一个index.html页面当做模板来用
      filename: 'index.html',
      template: './public/index.html',
      favicon: './public/favicon.ico', // 添加小图标
      hash: true
    })
  ], // 对应的插件
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true
  } // 开发服务器配置
};

console.log('webpackConfig :>> \n', webpackConfig);

module.exports = webpackConfig;
