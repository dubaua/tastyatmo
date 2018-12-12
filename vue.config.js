module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: 'http://atmo.dubaua.ru/',
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
