import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia';
import { i18n, setLocale } from './i18n';
import axiosInterceptor from '@/plugins/axiosInterceptor';

import PInput from 'primevue/inputtext';
import PInputNumber from 'primevue/inputnumber';
import PDialog from 'primevue/dialog';
import PSwitch from 'primevue/inputswitch';
import PTooltip from 'primevue/tooltip';
import FloatingVue from 'floating-vue';

import '@/assets/styles/index.scss';

axiosInterceptor();

const app = createApp(App)
  // App uses
  .use(i18n)
  .use(createPinia())
  .use(PrimeVue)
  .use(ToastService)
  .use(router)
  .use(FloatingVue);

setLocale();

app.component('PInput', PInput);
app.component('PDialog', PDialog);
app.component('PInputNumber', PInputNumber);
app.component('PSwitch', PSwitch);

app.directive('tooltip', PTooltip);

router.isReady().then(() => {
  app.mount('#app');
});
