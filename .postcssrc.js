module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: (module) =>
        /(vant|markdown)/gi.test(module.file) ? 37.5 : 75,
      propList: ['*'],
      exclude: 'github-markdown'
    }
  }
};
