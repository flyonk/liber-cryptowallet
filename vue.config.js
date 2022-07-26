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
              release: `cw@${process.env.VUE_APP_VERSION}`,
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
        additionalData: `@import "@/assets/styles/common/variables.scss"; @import "${process.env.VUE_APP_STATIC_STORAGE_URL}/build/styles/common/${whitelabelConfigPath.brand}/variables.css"; @import "@liber-biz/crpw-ui-kit-${whitelabelConfigPath.brand}/dist/crpw.css";`,
      },
    },
  },
  pwa: {
    name: whitelabelConfigPath.nameApp,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    iconPaths: {
      favicon32: `img/icons/${whitelabelConfigPath.appIconsFolder}/favicon-32x32.png`,
      favicon16: `img/icons/${whitelabelConfigPath.appIconsFolder}/favicon-16x16.png`,
      appleTouchIcon: `img/icons/${whitelabelConfigPath.appIconsFolder}/apple-touch-icon-152x152.png`,
      maskIcon: `img/icons/${whitelabelConfigPath.appIconsFolder}/safari-pinned-tab.svg`,
      msTileImage: `img/icons/${whitelabelConfigPath.appIconsFolder}/msapplication-icon-144x144.png`,
    },
    manifestOptions: {
      icons: [
        {
          src: `./img/icons/${whitelabelConfigPath.appIconsFolder}/android-chrome-192x192.png`,
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: `./img/icons/${whitelabelConfigPath.appIconsFolder}/android-chrome-512x512.png`,
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: `./img/icons/${whitelabelConfigPath.appIconsFolder}/android-chrome-maskable-192x192.png`,
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: `./img/icons/${whitelabelConfigPath.appIconsFolder}/android-chrome-maskable-512x512.png`,
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: './src/service-worker.js',
      // ...other Workbox options...
    },
  },
};
