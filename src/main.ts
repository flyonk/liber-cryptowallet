import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';

import { createPinia } from 'pinia';
import router from './router';

import '@/assets/styles/index.scss';

import PrimeVue from 'primevue/config';

import PInput from 'primevue/inputtext';
import PInputNumber from 'primevue/inputnumber';
import PDialog from 'primevue/dialog';

const app = createApp(App)
  // App uses
  .use(router)
  .use(createPinia())
  .use(PrimeVue);

app.component('PInput', PInput);
app.component('PDialog', PDialog);
app.component('PInputNumber', PInputNumber);

router.isReady().then(() => {
  app.mount('#app');
});
