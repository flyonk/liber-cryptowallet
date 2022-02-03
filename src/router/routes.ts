import { RouteRecordRaw } from 'vue-router';

// Pages
import PhoneEnter from '@/views/Auth/PhoneEnter.vue';
import CodeEnter from '@/views/Auth/CodeEnter.vue';
import PasscodeEnter from '@/views/Auth/PasscodeEnter.vue';

// Routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'auth-phone',
    component: PhoneEnter,
    meta: { layout: 'default' },
  },
  {
    path: '/code',
    name: 'auth-code',
    component: CodeEnter,
    meta: { layout: 'default' },
  },
  {
    path: '/passcode',
    name: 'auth-passcode',
    component: PasscodeEnter,
    meta: { layout: 'default' },
  },

  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.

  // === Dashboard ===

  {
    path: '/home',
    name: 'dashboard-parent',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard/index.vue'),
    meta: { layout: 'navbar' },
    children: [
      {
        path: '',
        name: 'dashboard-home',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/DashboardHome.vue'
          ),
      },
      {
        path: 'verification',
        name: 'dashboard-verification',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/DashboardVerification.vue'
          ),
      },
      {
        path: 'story',
        name: 'dashboard-story',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/DashboardStory.vue'
          ),
      },
    ],
  },

  // === Account ===

  {
    path: '/account',
    name: 'account',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Account/index.vue'
      ),
    meta: { layout: 'navbar' },
    children: [
      {
        path: '',
        name: 'account-main',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Account/AllAccounts.vue'
          ),
      },
      {
        path: 'add',
        name: 'account-add',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Account/AddAccount.vue'
          ),
      },
      {
        path: 'profile',
        name: 'account-profile',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Account/AccountProfile.vue'
          ),
        meta: { layout: 'default' },
      },
      {
        path: 'settings',
        name: 'account-settings',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Account/AccountSettings.vue'
          ),
        meta: { layout: 'default' },
      },
      {
        path: 'devices',
        name: 'account-devices',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Account/AccountDevices.vue'
          ),
        meta: { layout: 'default' },
      },
    ],
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Transactions/index.vue'
      ),
    meta: { layout: 'navbar' },
    children: [
      {
        path: '',
        name: 'transactions-main',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Transactions/DashboardTransactions.vue'
          ),
      },
      {
        path: 'details',
        name: 'transactions-details',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Transactions/TransactionDetails.vue'
          ),
      },
    ],
  },

  // === KYC ===

  {
    path: '/kyc/personal',
    name: 'kyc-personal',
    component: () =>
      import(/* webpackChunkName: "kyc" */ '@/views/KYC/SignUpPersonal.vue'),
  },
  {
    path: '/kyc/personal',
    name: 'kyc-documents',
    component: () =>
      import(/* webpackChunkName: "kyc" */ '@/views/KYC/SignUpDocuments.vue'),
  },
];

export default routes;
