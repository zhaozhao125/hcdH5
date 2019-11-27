module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    'eqeqeq': 0,
    'comma-dangle': 0,
    'handle-callback-err': 0,
    'no-console': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
