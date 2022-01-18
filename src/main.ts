import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia';

import PInput from 'primevue/inputtext';
import PInputNumber from 'primevue/inputnumber';
import PDialog from 'primevue/dialog';

import '@/assets/styles/index.scss';

(async () => {
  const app = createApp(App).use(createPinia());
  app
    // App uses
    .use(PrimeVue)
    .use(ToastService)
    .use(router);
  await router.isReady();
  
  app.component('PInput', PInput);
  app.component('PDialog', PDialog);
  app.component('PInputNumber', PInputNumber);
})();
