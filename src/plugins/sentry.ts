import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import router from '@/router';

Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_DSN,
  release: 'cw@' + process.env.VUE_APP_VERSION,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  tracesSampleRate: 1.0,
  trackComponents: true,
  environment: process.env.NODE_ENV,
  logErrors: true,
  attachProps: true,
});
