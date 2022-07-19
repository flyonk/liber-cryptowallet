import { RouteRecordRaw } from 'vue-router';
import { ServicesRoutes } from '@/applications/servicesapp/router/types';

import GetCoupons from '@/applications/servicesapp/views/GetCoupons/index.vue';
import GetCouponsEmail from '@/applications/servicesapp/views/GetCoupons/GetCouponsEmail.vue';
import ChangeCurrency from '@/applications/servicesapp/views/GetCoupons/GetCouponsPay.vue';

import GetCrypto from '@/applications/servicesapp/views/GetCrypto/GetCrypto.vue';
import GetCryptoCoin from '@/applications/servicesapp/views/GetCrypto/GetCryptoCoin.vue';

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

  {
    path: '/crypto-services',
    name: ServicesRoutes.GetCrypto,
    component: GetCoupons,
    meta: { layout: 'default', authRequired: true },
    children: [
      {
        path: '',
        name: ServicesRoutes.GetCryptoCoin,
        component: GetCryptoCoin,
      },
      {
        path: 'get',
        name: ServicesRoutes.GetCryptoFunds,
        meta: { authRequired: true },
        component: GetCrypto,
      },
    ],
  },
];

export default routes;
