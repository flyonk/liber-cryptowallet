import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';

import { createPinia } from 'pinia';
import router from './router';

import '@/assets/styles/index.scss';

const app = createApp(App)
  // App uses
  .use(router)
  .use(createPinia());

router.isReady().then(() => {
  app.mount('#app');
});
