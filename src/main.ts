import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia';

import ApiService from './services/ApiService';
import AuthService from './services/AuthService';

import '@/assets/styles/index.scss';

//test new features
ApiService.getInstance();
const authService = AuthService.getInstance();
authService.signIn({ phone: "test" });
//

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
