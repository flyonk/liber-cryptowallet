import { RouteRecordRaw } from 'vue-router';

// Pages
import PhoneEnter from '@/views/Auth/PhoneEnter.vue';
import CodeEnter from '@/views/Auth/CodeEnter.vue';
import PasscodeEnter from '@/views/Auth/PasscodeEnter.vue';
import SignUp from '@/views/Auth/SignUp/SignUp.vue';

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

  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
    meta: { layout: 'default' },
  },

  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.

  // === Dashboard ===
  // TODO: Refactor to make it more flat without nesting
  {
    path: '/home',
    name: 'dashboard-parent',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard/index.vue'),
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
        path: 'accounts',
        name: 'dashboard-account',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Account/AllAccounts.vue'
          ),
      },
      {
        path: 'accounts/add',
        name: 'dashboard-account-add',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Account/AddAccount.vue'
          ),
      },
      {
        path: 'transactions',
        name: 'dashboard-transactions',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Transactions/DashboardTransactions.vue'
          ),
      },
      {
        path: 'transactions/details',
        name: 'dashboard-transactions-details',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Transactions/TransactionDetails.vue'
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
    ],
  },
  // {
  //   path: '/account',
  //   name: 'dashboard-account',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "dashboard" */ '@/views/Dashboard/DashboardAccount.vue'
  //     ),
  // },

  // === KYC ===

  {
    path: '/kyc/personal',
    name: 'kyc-personal',
    component: () =>
      import(/* webpackChunkName: "kyc" */ '@/views/KYC/SignUpPersonal.vue'),
  },
  {
    path: '/kyc/documents',
    name: 'kyc-documents',
    component: () =>
      import(/* webpackChunkName: "kyc" */ '@/views/KYC/SignUpDocuments.vue'),
  },

  // === Survey ===

  {
    path: '/survey',
    name: 'survey',
    component: () =>
      import(/* webpackChunkName: "kyc" */ '@/views/Survey/SurveyScreen.vue'),
  },

  // === Install app ===

  {
    path: '/install',
    name: 'install-app',
    component: () =>
      import(/* webpackChunkName: "kyc" */ '@/views/InstallApp/InstallApp.vue'),
  },

  // === Configure app ===

  {
    path: '/config',
    name: 'configure-app',
    component: () => import('@/views/ConfigureApp/ConfigureApp.vue'),
  },
  {
    path: '/config-verify',
    name: 'configure-app-verify',
    component: () => import('@/views/ConfigureApp/ConfigureAppVerify.vue'),
  },

  // === Configure app options ===

  {
    path: '/faceid',
    name: 'face-id',
    component: () => import('@/views/ConfigureApp/Options/FaceId.vue'),
  },
  {
    path: '/touchid',
    name: 'touch-id',
    component: () => import('@/views/ConfigureApp/Options/TouchId.vue'),
  },
  {
    path: '/push-notifications',
    name: 'push-notifications',
    component: () =>
      import('@/views/ConfigureApp/Options/PushNotifications.vue'),
  },
];

export default routes;
