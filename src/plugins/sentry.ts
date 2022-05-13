import { App } from 'vue';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import router from '@/router';
import SentryUtil from '@/helpers/sentryUtil';

let sentry = {
  install: (app: App) => {
    console.error('Unable to connect to Sentry', app.config);
  },
};

if (process.env.VUE_APP_SENTRY_ENABLED === '1') {
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DSN,
    release: 'cw@' + process.env.VUE_APP_VERSION,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // Adjust for production
    tracesSampleRate: 1.0,
    trackComponents: true,
    environment: process.env.NODE_ENV,
    logErrors: true,
    attachProps: true,
  });

  sentry = {
    install: (app: App) => {
      SentryUtil.setUser();
      // inject a globally available $sentry
      // for custom usage in components
      app.config.globalProperties.$sentry = SentryUtil;
    },
  };
}

export default sentry;
