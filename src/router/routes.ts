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
    name: 'dashboard-home',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard/DashboardHome.vue'),
  },
  {
    path: '/account',
    name: 'dashboard-account',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard/DashboardAccount.vue'),
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

  // === Configure app ===

  {
    path: '/config',
    name: 'configure-app',
    component: () =>
      import('@/views/ConfigureApp/ConfigureApp.vue'),
  },
  {
    path: '/config-verify',
    name: 'configure-app-verify',
    component: () =>
      import('@/views/ConfigureApp/ConfigureAppVerify.vue'),
  },

  // === Configure app options ===
  
  {
    path: '/faceid',
    name: 'face-id',
    component: () =>
      import('@/views/ConfigureApp/Options/FaceId.vue'),
  },{
    path: '/touchid',
    name: 'touch-id',
    component: () =>
      import('@/views/ConfigureApp/Options/TouchId.vue'),
  },
  {
    path: '/push-notifications',
    name: 'push-notifications',
    component: () =>
      import('@/views/ConfigureApp/Options/PushNotifications.vue'),
  },

  // === Deposite btc ===
  {
    path: '/deposit',
    name: 'deposit',
    component: () =>
      import('@/views/DepositeBTC/DepositeBTC.vue'),
  },
  
];

export default routes;
