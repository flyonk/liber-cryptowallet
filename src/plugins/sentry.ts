// import * as Sentry from '@sentry/vue';
// import { BrowserTracing } from '@sentry/tracing';
// import router from '../router/';
//
// Sentry.init({
//   dsn: process.env.VUE_APP_SENTRY_DNS,
//   autoSessionTracking: true,
//   release: 'CW@' + process.env.VUE_APP_VERSION,
//   integrations: [
//     new BrowserTracing({
//       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//       // tracingOrigins: ['localhost', /^\//],
//     }),
//   ],
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
//   environment: process.env.NODE_ENV,
//   logErrors: true,
//   attachProps: true,
// });
