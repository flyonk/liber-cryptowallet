import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import authGuard from '@/router/middleware/auth';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(authGuard);

export default router;
