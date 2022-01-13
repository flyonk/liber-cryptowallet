import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';

import { createPinia } from 'pinia';
import router from './router';

import '@/assets/styles/index.scss';

import PrimeVue from 'primevue/config';
import PInput from 'primevue/inputtext';

const app = createApp(App)
  // App uses
  .use(router)
  .use(createPinia())
  .use(PrimeVue);

app.component('PInput', PInput);

router.isReady().then(() => {
  app.mount('#app');
});
