module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: 'http://xn----7sbabjp2blsvjgdxi.xn--p1ai/',
  },
  chainWebpack: (config) => {
    config.module.rules.delete('svg');
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(svg)(\?.*)?$/,
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                runtimeCompat: true,
              },
            },
            'svgo-loader',
          ],
        },
      ],
    },
  },
};
