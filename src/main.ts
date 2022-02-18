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
import PSwitch from 'primevue/inputswitch';

import '@/assets/styles/index.scss';

const app = createApp(App)
  // App uses
  .use(router)
  .use(createPinia())
  .use(PrimeVue)
  .use(ToastService)

app.component('PInput', PInput);
app.component('PDialog', PDialog);
app.component('PInputNumber', PInputNumber);
app.component('PSwitch', PSwitch);

router.isReady().then(() => {
  app.mount('#app');
});
