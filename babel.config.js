module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        "targets": {
          "esmodules": true // 
        },
        // 'useBuiltIns': 'usage', // 按需添加polyfill
        // 'modules': false,  // 让 babel 不转换我们的 module，而让 webpack 来处理模块（为了tree-shaking）。
      }
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
    // sourceType: 'unambiguous', // 让 babel 自动推断编译的模块类型 或者直接在webpack.config中将node_modules和local_react exclude掉也可以，就不会出现exports和es模块的语法冲突问题
    // sourceType: 'module', // 默认es模块语法
    ignore: [/@babel[/\\]runtime/], // 因为编译包括 node_modules，要忽略 @babel/runtime处理
    presets,
    plugins
  };
}