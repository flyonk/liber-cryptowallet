import { RouteRecordRaw } from 'vue-router';
import { CouponRoutes } from '@/applications/coupons/router/types';

import Account from '@/applications/liber/views/Dashboard/Account/index.vue';
import AllAccounts from '@/applications/liber/views/Dashboard/Account/AllAccounts.vue';
import Recipients from '@/applications/liber/views/Contacts/RecepientsView.vue';

const routes: Array<RouteRecordRaw> = [
  // === Account ===

  {
    path: '/account-coupon',
    name: CouponRoutes.Account,
    component: Account,
    meta: { layout: 'navbar', authRequired: true },
    children: [
      {
        path: '',
        name: CouponRoutes.AccountMain,
        component: AllAccounts,
      },
    ],
  },

  // === Invite ===

  {
    path: '/invite-coupon',
    name: CouponRoutes.Invite,
    component: Recipients,
    meta: { layout: 'navbar', authRequired: true },
  },
];

export default routes;
