module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-multiple-empty-lines': 0,
    'no-trailing-spaces': 0,
    indent: 0,
    semi: 0,
    'space-before-function-paren': 0,
    'quote-props': 0,
    'vue/multi-word-component-names': 0,
    'eol-last': 0,
    'vue/no-mutating-props': 0,
    'no-dupe-keys': 0
  }
};
