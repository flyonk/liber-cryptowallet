import { RouteRecordRaw } from 'vue-router';
import { ServicesRoutes } from '@/applications/servicesapp/router/types';

import GetCoupons from '@/applications/servicesapp/views/GetCoupons/index.vue';
import GetCouponsEmail from '@/applications/servicesapp/views/GetCoupons/GetCouponsEmail.vue';
import ChangeCurrency from '@/components/ui/pages/ChangeCurrency.vue';

const routes: Array<RouteRecordRaw> = [
  // === Get coupons ===

  {
    path: '/coupon-services',
    name: ServicesRoutes.GetCoupons,
    component: GetCoupons,
    meta: { layout: 'default', authRequired: true },
    children: [
      {
        path: '',
        name: ServicesRoutes.GetCouponsEmail,
        component: GetCouponsEmail,
      },
      {
        path: 'convert',
        name: ServicesRoutes.ConvertFunds,
        meta: { authRequired: true },
        component: ChangeCurrency,
      },
    ],
  },
];

export default routes;
