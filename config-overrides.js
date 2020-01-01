const resolve = dir => require('path').join(__dirname, dir)

function traverse (obj, callback) {
  if (Array.isArray(obj)) {
    obj.forEach(item => traverse(item, callback));
  } else if ((typeof obj === 'object') && (obj !== null)) {
    Object.keys(obj).forEach(key => {
      if (obj.hasOwnProperty(key)) {
        callback(obj, key);
        traverse(obj[key], callback);
      }
    })
  }
}

module.exports = function override (config, env) {
  // 为开发环境添加css sourcemap
  if (env === 'development') {
    traverse(config.module.rules, (node, key) => {
      if (key !== 'loader') return
      if (
        node[key].includes("sass-loader") ||
        node[key].includes("postcss-loader") ||
        node[key].includes("css-loader")
      ) {
        if (node.options) {
          node.options.sourceMap = true;
        }
      }
    })
  }

  // svg-icon相关配置
  traverse(config.module.rules, (node, key) => {
    if (key !== 'oneOf') return
    traverse(node[key], (node1, key1) => {
      if (key1 !== 'loader' || String(node1[key1]).indexOf('file-loader') === -1) return
      (node1.exclude || []).push(resolve('src/assets/svg-icons/icons'))
    })

  })
  config.module.rules.push({
    test: /\.svg$/,
    include: [
      resolve('src/assets/svg-icons/icons')
    ],
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          runtimeCompat: true,
          symbolId: 'sprite-[name]'
        }
      }
    ]
  })

  // 别名
  traverse(config.resolve, (node, key) => {
    if (key !== 'alias') return
    node[key] = {
      ...node[key],
      '@components': resolve('src/components'),
      '@assets': resolve('src/assets'),
    }
  })


  return config
}
