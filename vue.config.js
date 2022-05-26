const webpack = require('webpack');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const whitelabelConfig = require('./whitelabel.config');
const path = require('path');
process.env.VUE_APP_VERSION = require('./package.json').version;

const useSentryPlugin = process.env.VUE_APP_SENTRY_ENABLED === '1';
const whitelabelConfigPath = whitelabelConfig[process.env.VUE_APP_BRAND];

module.exports = {
  configureWebpack: {
    plugins: [
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      // https://stackoverflow.com/questions/68707553/uncaught-referenceerror-buffer-is-not-defined
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      ...(useSentryPlugin
        ? [
            new SentryWebpackPlugin({
              include: './dist',
              ignore: ['node_modules', 'vue.config.js'],
            }),
          ]
        : []),
      // new webpack.ProvidePlugin({
      //   process: 'process/browser',
      // }),
    ],
    resolve: {
      alias: {
        // create alias for whitelabel theme
        brandVariables: path.resolve(__dirname, whitelabelConfigPath.theme),
      },
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
        additionalData: `@import "@/assets/styles/common/variables.scss"; @import "${process.env.VUE_APP_STATIC_BASE_URL}/build/styles/common/${whitelabelConfigPath.brand}/variables.css"; @import "${process.env.VUE_APP_STATIC_BASE_URL}/build/fonts/${whitelabelConfigPath.brand}/iconmoon.css"; @import "${process.env.VUE_APP_STATIC_BASE_URL}/build/fonts/${whitelabelConfigPath.brand}/font.css";`,
      },
    },
  },
};
