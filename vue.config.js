import webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      // https://stackoverflow.com/questions/68707553/uncaught-referenceerror-buffer-is-not-defined
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      // new webpack.ProvidePlugin({
      //   process: 'process/browser',
      // }),
    ],
    resolve: {
      extensions: ['.ts', '.js'],
      fallback: {
        // "util": false,
        // "url": false,
        stream: require.resolve('stream-browserify'),
        // "stream": false,
        crypto: require.resolve('crypto-browserify'),
        buffer: require.resolve('buffer'),
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/common/variables.scss";',
      },
    },
  },
};
