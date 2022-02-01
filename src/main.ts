import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia';

import AuthService from './services/AuthService';

import '@/assets/styles/index.scss';
import ApiService from './services/ApiService';

const apiService = ApiService.getInstance()
const authService = new AuthService(apiService)


(async () => {
  const app = createApp(App).use(createPinia());
  app
    // App uses
    .use(PrimeVue)
    .use(ToastService)
    .use(router);
  await router.isReady();
  app.mount('#app');
})();
