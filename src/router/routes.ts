import { RouteRecordRaw } from 'vue-router';
import DepositeRoutes from './routesDeposite';

// Pages
// import PhoneEnter from '@/views/Auth/PhoneEnter.vue';
import CodeEnter from '@/views/Auth/CodeEnter.vue';
import SignUp from '@/views/Auth/SignUp/SignUp.vue';
import Login from '@/views/Auth/Login/MainLogin.vue';
import Restore from '@/views/Auth/Restore/MainRestore.vue';
import { Route } from '@/router/types';

// Routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: Route.WelcomeLogoScreen,
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/views/Welcome/WelcomeLogoScreen.vue'
      ),
  },
  {
    path: '/welcome-auth',
    name: Route.WelcomeAuthScreen,
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/views/Welcome/WelcomeAuthScreen.vue'
      ),
  },
  {
    path: '/code',
    name: Route.AuthCode,
    component: CodeEnter,
    meta: { layout: 'default' },
  },

  {
    path: '/passcode',
    name: Route.AuthPasscode,
    component: () => import('@/views/ConfigureApp/PasscodeEnter.vue'),
  },

  {
    path: '/sign-up',
    name: Route.SignUp,
    component: SignUp,
    meta: { layout: 'default' },
  },

  {
    path: '/login',
    name: Route.Login,
    component: Login,
    meta: {
      classLayout: '-full-height',
    },
  },

  {
    path: '/restore',
    name: Route.Restore,
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
    name: Route.DashboardParent,
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard/index.vue'),
    meta: { layout: 'navbar' },
    children: [
      {
        path: '',
        name: Route.DashboardHome,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/DashboardHome.vue'
          ),
      },
      {
        path: 'verification',
        name: Route.DashboardVerification,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/DashboardVerification.vue'
          ),
      },
      {
        path: 'story',
        name: Route.DashboardStory,
        meta: { layout: 'default' },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/DashboardStory.vue'
          ),
      },
      {
        path: 'verifying-identity',
        name: Route.DashboardVerifyingStory,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/DashboardVerifyingIdentityStory.vue'
          ),
      },
      {
        path: 'transfer-funds-to-treasury',
        name: Route.DashboardTransferFundsToTreasuryStory,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/DashboardTransferFundsToTreasuryStory.vue'
          ),
      },
    ],
  },

  // === Account ===

  {
    path: '/account',
    name: Route.Account,
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Account/index.vue'
      ),
    meta: { layout: 'navbar' },
    children: [
      {
        path: '',
        name: Route.AccountMain,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Account/AllAccounts.vue'
          ),
      },
      {
        path: 'add',
        name: Route.AccountAdd,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Account/AddAccount.vue'
          ),
      },
    ],
  },

  // === Transactions ===

  {
    path: '/transactions',
    name: Route.Transactions,
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Transactions/index.vue'
      ),
    meta: { layout: 'navbar' },
    children: [
      {
        path: '',
        name: Route.TransactionsMain,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Transactions/DashboardTransactions.vue'
          ),
      },
      {
        path: 'details',
        name: Route.TransactionsDetails,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Dashboard/Transactions/TransactionDetails.vue'
          ),
      },
    ],
  },

  // === Contacts Flow ===

  {
    path: '/contacts',
    name: 'contacts',
    component: () =>
      import(/* webpackChunkName: "contacts" */ '@/views/Contacts/index.vue'),
    children: [
      {
        path: '',
        name: 'contacts.who-to-pay',
        component: () =>
          import(
            /* webpackChunkName: "contacts-who-to-pay" */ '@/views/Contacts/WhoToPay.vue'
          ),
      },
      {
        path: 'send/:id',
        name: 'contacts.send',
        component: () =>
          import(
            /* webpackChunkName: "contacts-sendto" */ '@/views/Contacts/SendTo.vue'
          ),
      },
      {
        path: 'send',
        name: 'contacts.send.first.time',
        component: () =>
          import(
            /* webpackChunkName: "contacts-send-first" */ '@/views/Contacts/FirstTimeInvite.vue'
          ),
      },
      {
        path: 'send_invite',
        name: 'contacts.send.invite',
        component: () =>
          import(
            /* webpackChunkName: "contacts-send-first" */ '@/views/Contacts/SendInvite.vue'
          ),
      },
      {
        path: 'add',
        name: 'contacts.add.new.contact',
        component: () =>
          import(
            /* webpackChunkName: "contacts-send-first" */ '@/views/Contacts/AddNewContact.vue'
          ),
      },
      {
        path: 'send_link',
        name: 'contacts.send.link',
        component: () =>
          import(
            /* webpackChunkName: "contacts-send-first" */ '@/views/Contacts/SendViaLink.vue'
          ),
      },
    ],
  },

  // === Profile (Left Navigation Menu) ===

  {
    path: '/profile',
    name: Route.ProfileMainView,
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/views/Profile/index.vue'),
    children: [
      {
        path: '',
        name: Route.ProfileSettings,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Profile/ProfileSettings.vue'
          ),
      },
      {
        path: 'my-qr-code',
        name: Route.ProfileMyQrCode,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Profile/ProfileMyQrCode.vue'
          ),
      },
      {
        path: 'devices',
        name: Route.ProfileDevices,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Profile/ProfileDevices.vue'
          ),
      },
      {
        path: 'help',
        name: Route.ProfileHelp,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Profile/ProfileHelpPage.vue'
          ),
      },
      {
        path: 'details/:id',
        name: Route.ProfileEdit,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Profile/ProfileDetails.vue'
          ),
      },
      {
        path: 'privacy',
        name: Route.ProfilePrivacy,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Profile/PrivacySettings.vue'
          ),
      },
    ],
  },

  // === KYC ===

  {
    path: '/kyc',
    name: Route.KYCMain,
    component: () =>
      import(/* webpackChunkName: "kyc-main" */ '@/views/KYC/KYCMain.vue'),
  },

  // === Survey ===

  {
    path: '/survey',
    name: Route.Survey,
    component: () =>
      import(/* webpackChunkName: "kyc" */ '@/views/Survey/SurveyScreen.vue'),
  },

  // === Configure 2fa ===
  {
    path: '/2fa',
    name: Route.TwoFAApp,
    component: () => import('@/views/ConfigureApp/TwoFA.vue'),
    meta: {
      classLayout: '-full-height',
    },
  },
  {
    path: '/install',
    name: Route.InstallApp,
    component: () => import('@/views/ConfigureApp/InstallApp.vue'),
    meta: {
      classLayout: '-full-height',
    },
  },
  {
    path: '/config',
    name: Route.ConfigureApp,
    component: () => import('@/views/ConfigureApp/ConfigureApp.vue'),
    meta: {
      classLayout: '-full-height',
    },
  },
  {
    path: '/config-verify',
    name: Route.ConfigureAppVerify,
    component: () => import('@/views/ConfigureApp/ConfigureAppVerify.vue'),
    meta: {
      classLayout: '-full-height',
    },
  },

  // === Configure app options ===

  {
    path: '/faceid',
    name: Route.FaceId,
    component: () => import('@/views/ConfigureApp/Options/FaceId.vue'),
    meta: {
      classLayout: '-full-height',
    },
  },
  {
    path: '/touchid',
    name: Route.TouchId,
    component: () => import('@/views/ConfigureApp/Options/TouchId.vue'),
    meta: {
      classLayout: '-full-height',
    },
  },
  {
    path: '/push-notifications',
    name: Route.PushNotifications,
    component: () =>
      import('@/views/ConfigureApp/Options/PushNotifications.vue'),
    meta: {
      classLayout: '-full-height',
    },
  },

  // === Deposite btc ===

  {
    path: '/deposit',
    name: Route.Deposit,
    component: () => import('@/views/DepositeCoin/DepositeIndex.vue'),
    children: DepositeRoutes,
  },
];

export default routes;
