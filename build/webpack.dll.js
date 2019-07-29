const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//拼接路径
function resolve(track) {
  return path.join(__dirname, './', track);
}

const dllPath = resolve('dll'); // dll文件存放的目录

module.exports = {
  entry: {
    // 把 vue 相关模块的放到一个单独的动态链接库
    ueDll: ['vue/dist/vue.esm.js', 'vue-router', 'vuex', 'axios', 'ant-design-vue', 'ant-design']
  },
  output: {
    filename: '[name]-[hash].dll.js',
    path: dllPath,
    library: '_dll_[name]'
  },
  plugins: [
    new CleanWebpackPlugin({
      // 清除之前的dll文件
      cleanOnceBeforeBuildPatterns: dllPath
    }),
    new webpack.DllPlugin({
      name: '_dll_[name]',
      // manifest.json 描述动态链接库包含了哪些内容
      path: path.join(__dirname, './dll', '[name].manifest.json')
    })
  ]
};
