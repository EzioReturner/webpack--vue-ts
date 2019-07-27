module.exports = {
  presets: ['@vue/app', '@vue/babel-preset-jsx', ['@babel/preset-env', { modules: false }]],
  plugins: [
    'transform-vue-jsx',
    ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }]
  ]
};
