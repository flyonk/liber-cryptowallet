import { RouteRecordRaw } from 'vue-router';
import { CouponRoutes } from '@/applications/coupons/router/types';

import Account from '@/applications/liber/views/Dashboard/Account/index.vue';
import AllAccounts from '@/applications/liber/views/Dashboard/Account/AllAccounts.vue';
import Recipients from '@/applications/liber/views/Contacts/RecipientsView.vue';

import Transactions from '@/applications/liber/views/Dashboard/Transactions/index.vue';
import DashboardTransactions from '@/applications/coupons/views/Dashboard/Transactions/DashboardTransactions.vue';
import TransactionDetails from '@/applications/liber/views/Dashboard/Transactions/TransactionDetails.vue';
import TransactionsAll from '@/applications/coupons/views/Dashboard/Transactions/TransactionsAll.vue';

// import checkContactsLoaded from '@/router/middleware/checkContacts';
import RecipientsRoutes from './routesRecipients';

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
        meta: { classLayout: '-full-viewport' },
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

  // === Transactions ===

  {
    path: '/transactions-coupon',
    name: CouponRoutes.Transactions,
    component: Transactions,
    meta: { layout: 'navbar', authRequired: true },
    children: [
      {
        path: '', //TODO: ref this rout, component is wrong
        name: CouponRoutes.TransactionsMain,
        component: DashboardTransactions,
      },
      {
        path: 'details/:id/',
        name: CouponRoutes.TransactionsDetails,
        meta: { layout: 'default' },
        component: TransactionDetails,
      },
      {
        path: 'all',
        name: CouponRoutes.TransactionsAll,
        component: TransactionsAll,
        meta: { classLayout: '-full-viewport' },
      },
    ],
  },

  // === Recipients ===

  {
    path: '/recipients-coupon',
    name: CouponRoutes.Recipients,
    meta: { layout: 'navbar', authRequired: true },
    component: Recipients,
    // beforeEnter: checkContactsLoaded,
    children: RecipientsRoutes,
  },
];

export default routes;
