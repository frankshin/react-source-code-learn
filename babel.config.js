module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      // {
      //   "targets": {
      //     "esmodules": true
      //   }
      // }
    ], '@babel/preset-react'];
  const plugins = [
    [
      "@babel/plugin-transform-runtime",
      // {
      //   "absoluteRuntime": false,
      //   "corejs": false,
      //   "helpers": true,
      //   "regenerator": true,
      //   "version": "7.0.0-beta.0"
      // }
    ]
  ]

  return {
    // sourceType: 'unambiguous', // 这也可以，为啥pms没写这个也可以？测试下
    presets,
    plugins
  };
}