import { RouteRecordRaw } from 'vue-router';
import DepositeRoutes from './routesDeposite'

// Pages
// import PhoneEnter from '@/views/Auth/PhoneEnter.vue';
import CodeEnter from '@/views/Auth/CodeEnter.vue';
import PasscodeEnter from '@/views/Auth/PasscodeEnter.vue';
import SignUp from '@/views/Auth/SignUp/SignUp.vue';
import Login from '@/views/Auth/Login/MainLogin.vue';
import Restore from '@/views/Auth/Restore/MainRestore.vue';

// Routes
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'auth-phone',
  //   component: PhoneEnter,
  //   meta: { layout: 'default' },
  // },
  {
    path: '/',
    name: 'welcome-logo-screen',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/views/Welcome/WelcomeLogoScreen.vue'
      ),
  },
  {
    path: '/welcome-auth',
    name: 'welcome-auth-screen',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/views/Welcome/WelcomeAuthScreen.vue'
      ),
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

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      layout: 'default',
    },
  },

  {
    path: '/restore',
    name: 'restore',
    component: Restore,
    meta: {
      layout: 'default',
    },
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
  // === Profile (Left Navigation Menu) ===

  {
    path: '/profile',
    name: 'profile-main-view',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/views/Profile/index.vue'),
    children: [
      {
        path: '',
        name: 'profile-settings',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Profile/ProfileSettings.vue'
          ),
      },
      {
        path: 'my-qr-code',
        name: 'profile-my-qr-code',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Profile/ProfileMyQrCode.vue'
          ),
      },
      {
        path: 'devices',
        name: 'profile-devices',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Profile/ProfileDevices.vue'
          ),
      },
      {
        path: 'help',
        name: 'profile-help',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Profile/ProfileHelpPage.vue'
          ),
      },
      {
        path: 'details/:id',
        name: 'profile-edit',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Profile/ProfileDetails.vue'
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

  // === Deposite btc ===

  {
    path: '/deposit',
    name: 'deposit',
    component: () => import('@/views/DepositeCoin/DepositeIndex.vue'),
    children: DepositeRoutes,
  },
];

export default routes;
