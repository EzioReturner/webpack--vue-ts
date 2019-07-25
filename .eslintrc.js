module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2017,
    sourceType: 'module',
    legacyDecorators: true
  },
  extends: ['plugin:vue/recommended'],
  env: {
    browser: true
  }
};
