import { RouteRecordRaw } from 'vue-router';

import DepositeRoutes from './routesDeposite';
import RecepientsRoutes from './routesRecepients';
import PayRecepientsRoutes from './routesPayRecepients';
import checkContactsLoaded from './middleware/checkContacts';

// Pages
import CodeEnter from '@/views/Auth/CodeEnter.vue';
import SignUp from '@/views/Auth/SignUp/SignUp.vue';
import Login from '@/views/Auth/Login/MainLogin.vue';
import Restore from '@/views/Auth/Restore/MainRestore.vue';
import { Route } from '@/router/types';

import WelcomeLogoScreen from '@/views/Welcome/WelcomeLogoScreen.vue';
import WelcomeAuthScreen from '@/views/Welcome/WelcomeAuthScreen.vue';

import PasscodeEnter from '@/views/ConfigureApp/PasscodeEnter.vue';

import Dashboard from '@/views/Dashboard/index.vue';
import DashboardHome from '@/views/Dashboard/DashboardHome.vue';
import DashboardVerification from '@/views/Dashboard/DashboardVerification.vue';
import DashboardStory from '@/views/Dashboard/DashboardStory.vue';
import DashboardVerifyingIdentityStory from '@/views/Dashboard/DashboardVerifyingIdentityStory.vue';
import DashboardTransferFundsToTreasuryStory from '@/views/Dashboard/DashboardTransferFundsToTreasuryStory.vue';

import Account from '@/views/Dashboard/Account/index.vue';
import AllAccounts from '@/views/Dashboard/Account/AllAccounts.vue';
import AddAccount from '@/views/Dashboard/Account/AddAccount.vue';

import Transactions from '@/views/Dashboard/Transactions/index.vue';
import DashboardTransactions from '@/views/Dashboard/Transactions/DashboardTransactions.vue';
import TransactionDetails from '@/views/Dashboard/Transactions/TransactionDetails.vue';

import Contacts from '@/views/Contacts/index.vue';
import WhoToPay from '@/views/Contacts/WhoToPay.vue';
import SendTo from '@/views/Contacts/SendTo.vue';
import FirstTimeInvite from '@/views/Contacts/FirstTimeInvite.vue';
import SendInvite from '@/views/Contacts/SendInvite.vue';
import AddNewContact from '@/views/Contacts/AddNewContact.vue';
import SendViaLink from '@/views/Contacts/SendViaLink.vue';

import Profile from '@/views/Profile/index.vue';
import ProfileSettings from '@/views/Profile/ProfileSettings.vue';
import ProfileMyQrCode from '@/views/Profile/ProfileMyQrCode.vue';
import ProfileDevices from '@/views/Profile/ProfileDevices.vue';
import ProfileHelpPage from '@/views/Profile/ProfileHelpPage.vue';
import ProfileDetails from '@/views/Profile/ProfileDetails.vue';
import PrivacySettings from '@/views/Profile/PrivacySettings.vue';

import KYCMain from '@/views/KYC/KYCMain.vue';

import SurveyScreen from '@/views/Survey/SurveyScreen.vue';

import TwoFA from '@/views/ConfigureApp/TwoFA.vue';
import InstallApp from '@/views/ConfigureApp/InstallApp.vue';
import ConfigureApp from '@/views/ConfigureApp/ConfigureApp.vue';
import ConfigureAppVerify from '@/views/ConfigureApp/ConfigureAppVerify.vue';

import FaceId from '@/views/ConfigureApp/Options/FaceId.vue';
import TouchId from '@/views/ConfigureApp/Options/TouchId.vue';
import PushNotifications from '@/views/ConfigureApp/Options/PushNotifications.vue';

import DepositeIndex from '@/views/DepositeCoin/DepositeIndex.vue';
import ChangeCurrency from '@/components/ui/pages/ChangeCurrency.vue';

import RequestContacts from '@/views/Contacts/RequestContacts.vue';
import Recipients from '@/views/Contacts/Recepients.vue';

// Routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: Route.WelcomeLogoScreen,
    component: WelcomeLogoScreen,
  },
  {
    path: '/welcome-auth',
    name: Route.WelcomeAuthScreen,
    component: WelcomeAuthScreen,
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
    component: PasscodeEnter,
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
    component: Dashboard,
    meta: { layout: 'navbar' },
    children: [
      {
        path: '',
        name: Route.DashboardHome,
        component: DashboardHome,
      },
      {
        path: 'verification',
        name: Route.DashboardVerification,
        component: DashboardVerification,
      },
      {
        path: 'story',
        name: Route.DashboardStory,
        meta: { layout: 'default' },
        component: DashboardStory,
      },
      {
        path: 'verifying-identity',
        name: Route.DashboardVerifyingStory,
        component: DashboardVerifyingIdentityStory,
      },
      {
        path: 'transfer-funds-to-treasury',
        name: Route.DashboardTransferFundsToTreasuryStory,
        component: DashboardTransferFundsToTreasuryStory,
      },
    ],
  },

  // === Account ===

  {
    path: '/account',
    name: Route.Account,
    component: Account,
    meta: { layout: 'navbar' },
    children: [
      {
        path: '',
        name: Route.AccountMain,
        component: AllAccounts,
      },
      {
        path: ':coin',
        name: Route.AccountDetail,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/components/ui/pages/AccountDetail.vue'
          ),
      },
      {
        path: 'add',
        name: Route.AccountAdd,
        component: AddAccount,
      },
    ],
  },

  // === Transactions ===

  {
    path: '/transactions',
    name: Route.Transactions,
    component: Transactions,
    meta: { layout: 'navbar' },
    children: [
      {
        path: '', //TODO: ref this rout, component is wrong
        name: Route.TransactionsMain,
        component: DashboardTransactions,
      },
      {
        path: 'details/:id',
        name: Route.TransactionsDetails,
        component: TransactionDetails,
      },
    ],
  },

  // === Contacts Flow ===

  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts,
    children: [
      {
        path: '',
        name: Route.ContactsWhoToPay,
        component: WhoToPay,
        children: PayRecepientsRoutes,
      },
      {
        path: 'send/:id',
        name: Route.ContactsSend,
        component: SendTo,
      },
      {
        path: 'send',
        name: Route.ContactsSendFirstTime,
        component: FirstTimeInvite,
      },
      {
        path: 'send_invite',
        name: Route.ContactsSendInvite,
        component: SendInvite,
      },
      {
        path: 'add',
        name: Route.ContactsAddNewContact,
        component: AddNewContact,
      },
      {
        path: 'send_link',
        name: Route.ContactsSendLink,
        component: SendViaLink,
      },
    ],
  },

  // === Convert funds Flow ===

  {
    path: '/convert',
    name: Route.ConvertFunds,
    component: ChangeCurrency,
  },

  // === Profile (Left Navigation Menu) ===

  {
    path: '/profile',
    name: Route.ProfileMainView,
    component: Profile,
    children: [
      {
        path: '',
        name: Route.ProfileSettings,
        component: ProfileSettings,
      },
      {
        path: 'my-qr-code',
        name: Route.ProfileMyQrCode,
        component: ProfileMyQrCode,
      },
      {
        path: 'devices',
        name: Route.ProfileDevices,
        component: ProfileDevices,
      },
      {
        path: 'help',
        name: Route.ProfileHelp,
        component: ProfileHelpPage,
      },
      {
        path: 'details/:id',
        name: Route.ProfileEdit,
        component: ProfileDetails,
      },
      {
        path: 'privacy',
        name: Route.ProfilePrivacy,
        component: PrivacySettings,
      },
    ],
  },

  // === KYC ===

  {
    path: '/kyc',
    name: Route.KYCMain,
    component: KYCMain,
  },

  // === Survey ===

  {
    path: '/survey',
    name: Route.Survey,
    component: SurveyScreen,
  },

  // === Configure 2fa ===
  {
    path: '/2fa',
    name: Route.TwoFAApp,
    component: TwoFA,
    meta: {
      classLayout: '-full-height',
    },
  },
  {
    path: '/install',
    name: Route.InstallApp,
    component: InstallApp,
    meta: {
      classLayout: '-full-height',
    },
  },
  {
    path: '/config',
    name: Route.ConfigureApp,
    component: ConfigureApp,
    meta: {
      classLayout: '-full-height',
    },
  },
  {
    path: '/config-verify',
    name: Route.ConfigureAppVerify,
    component: ConfigureAppVerify,
    meta: {
      classLayout: '-full-height',
    },
  },

  // === Configure app options ===

  {
    path: '/faceid',
    name: Route.FaceId,
    component: FaceId,
    meta: {
      classLayout: '-full-height',
    },
  },
  {
    path: '/touchid',
    name: Route.TouchId,
    component: TouchId,
    meta: {
      classLayout: '-full-height',
    },
  },
  {
    path: '/push-notifications',
    name: Route.PushNotifications,
    component: PushNotifications,
    meta: {
      classLayout: '-full-height',
    },
  },

  // == Select Coin ==

  {
    path: '/choose_coin',
    name: Route.ChooseCoin,
    component: () => import('@/views/Contacts/SelectCoin.vue'),
  },

  // === Deposite btc ===

  {
    path: '/deposit',
    name: Route.Deposit,
    component: DepositeIndex,
    children: DepositeRoutes,
  },

  // === Recepients ===

  {
    path: '/recepients',
    name: Route.Recepients,
    component: Recipients,
    meta: { layout: 'navbar' },
    beforeEnter: checkContactsLoaded,
    children: RecepientsRoutes,
  },

  // === Load phone contacts ===

  {
    path: '/requestcontacts',
    name: Route.LoadContacts,
    component: RequestContacts,
    meta: {
      classLayout: '-full-height',
    },
  },
];

export default routes;
