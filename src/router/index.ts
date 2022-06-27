import { createRouter, createWebHistory } from 'vue-router';
import routesMain from './routes';
import routesLiber from '@/applications/liber/router/index';
import routerCoupons from '@/applications/coupons/router/index';
import authGuard from '@/router/middleware/auth';
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...routesMain, ...routesLiber, ...routerCoupons],
});

router.beforeEach(authGuard);

export default router;
