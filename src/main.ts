import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

// import '@/plugins/sentry';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia';

import PInput from 'primevue/inputtext';
import PInputNumber from 'primevue/inputnumber';
import PDialog from 'primevue/dialog';
import PSwitch from 'primevue/inputswitch';
import PTooltip from 'primevue/tooltip';
import FloatingVue from 'floating-vue';

import '@/assets/styles/index.scss';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';

const app = createApp(App);

Sentry.init({
  app,
  dsn: process.env.VUE_APP_SENTRY_DNS,
  release: 'CW@' + process.env.VUE_APP_VERSION,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  logErrors: true,
  attachProps: true,
});

// App uses
app.use(createPinia());
app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.use(FloatingVue);

app.component('PInput', PInput);
app.component('PDialog', PDialog);
app.component('PInputNumber', PInputNumber);
app.component('PSwitch', PSwitch);

app.directive('tooltip', PTooltip);

router.isReady().then(() => {
  app.mount('#app');
});
