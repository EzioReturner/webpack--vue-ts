module.exports = {
  presets: [
    '@vue/app',
    ['@vue/babel-preset-jsx', { injectH: false }],
    ['@babel/preset-env', { modules: false }]
  ],
  plugins: [
    'jsx-v-model',
    'transform-class-properties',
    ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }]
  ]
};
