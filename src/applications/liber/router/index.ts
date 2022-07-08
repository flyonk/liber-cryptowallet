import { RouteRecordRaw } from 'vue-router';
import { Route } from '@/router/types';

import DepositeRoutes from './routesDeposite';
import RecipientsRoutes from './routesRecipients';
import PayRecipientsRoutes from './routesPayRecipients';
import checkContactsLoaded from '@/router/middleware/checkContacts';

import Dashboard from '@/applications/liber/views/Dashboard/index.vue';
import DashboardVerification from '@/applications/liber/views/Dashboard/DashboardVerification.vue';
import DashboardStory from '@/applications/liber/views/Dashboard/DashboardStory.vue';
import DashboardVerifyingIdentityStory from '@/applications/liber/views/Dashboard/DashboardVerifyingIdentityStory.vue';
import DashboardTransferFundsToTreasuryStory from '@/applications/liber/views/Dashboard/DashboardTransferFundsToTreasuryStory.vue';

import Account from '@/applications/liber/views/Dashboard/Account/index.vue';
import AllAccounts from '@/applications/liber/views/Dashboard/Account/AllAccounts.vue';

import Transactions from '@/applications/liber/views/Dashboard/Transactions/index.vue';
import DashboardTransactions from '@/applications/liber/views/Dashboard/Transactions/DashboardTransactions.vue';
import TransactionDetails from '@/applications/liber/views/Dashboard/Transactions/TransactionDetails.vue';
import TransactionsAll from '@/applications/liber/views/Dashboard/Transactions/TransactionsAll.vue';

import Contacts from '@/applications/liber/views/Contacts/index.vue';
import WhoToPay from '@/applications/liber/views/Contacts/WhoToPay.vue';
import SendTo from '@/applications/liber/views/Contacts/SendTo.vue';
import FirstTimeInvite from '@/applications/liber/views/Contacts/FirstTimeInvite.vue';
import SendInvite from '@/applications/liber/views/Contacts/SendInvite.vue';
import AddNewContact from '@/applications/liber/views/Contacts/AddNewContact.vue';
import SendViaLink from '@/applications/liber/views/Contacts/SendViaLink.vue';

import ChangeCurrency from '@/components/ui/pages/ChangeCurrency.vue';

import Withdraw from '@/applications/liber/views/Withdraw/WithdrawScreen.vue';

import DepositeIndex from '@/applications/liber/views/DepositeCoin/DepositeIndex.vue';

import AddAccount from '@/applications/liber/views/Dashboard/Account/AddAccount/IndexView.vue';
import AddAccountRoutes from './routesAddAccount';

import RequestContacts from '@/applications/liber/views/Contacts/RequestContacts.vue';
import Recipients from '@/applications/liber/views/Contacts/RecipientsView.vue';

import { TRANSACTIONS_ENABLED } from '@/constants';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: Route.DashboardParent,
    component: Dashboard,
    meta: { layout: 'navbar', authRequired: true },
    children: [
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
        meta: {
          layout: 'default',
        },
      },
      {
        path: 'transfer-funds-to-treasury',
        name: Route.DashboardTransferFundsToTreasuryStory,
        component: DashboardTransferFundsToTreasuryStory,
        meta: {
          layout: 'default',
        },
      },
    ],
  },

  // === Account ===

  {
    path: '/account/add',
    name: Route.AccountAdd,
    component: AddAccount,
    meta: { authRequired: true },
    redirect: { name: Route.AccountAddSelectCoin },
    children: AddAccountRoutes,
  },

  {
    path: '/account',
    name: Route.Account,
    component: Account,
    meta: { layout: 'navbar', authRequired: true },
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
    ],
  },

  // === Transactions ===

  {
    path: '/transactions',
    name: Route.Transactions,
    component: Transactions,
    meta: { layout: 'navbar', authRequired: true },
    beforeEnter(to, from, next) {
      if (TRANSACTIONS_ENABLED) {
        next();
      } else {
        next({
          name: Route.DashboardHome,
        });
      }
    },
    children: [
      {
        path: '', //TODO: ref this rout, component is wrong
        name: Route.TransactionsMain,
        component: DashboardTransactions,
      },
      {
        path: 'details/:id/',
        name: Route.TransactionsDetails,
        meta: { layout: 'default' },
        component: TransactionDetails,
      },
      {
        path: 'all',
        name: Route.TransactionsAll,
        component: TransactionsAll,
      },
    ],
  },

  // === Contacts Flow ===

  {
    path: '/contacts',
    name: 'contacts',
    meta: { authRequired: true },
    component: Contacts,
    children: [
      {
        path: '',
        name: Route.ContactsWhoToPay,
        component: WhoToPay,
        children: PayRecipientsRoutes,
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
    meta: { authRequired: true, classLayout: '-full-height' },
    component: ChangeCurrency,
  },

  //  === Withdraw funds Flow

  {
    path: '/withdraw',
    name: Route.Withdraw,
    meta: { authRequired: true },
    component: Withdraw,
  },

  // == Select Coin ==

  {
    path: '/choose_coin',
    name: Route.ChooseCoin,
    meta: { authRequired: true },
    component: () =>
      import('@/applications/liber/views/Contacts/SelectCoin.vue'),
  },

  // === Deposite btc ===

  {
    path: '/deposit',
    name: Route.Deposit,
    meta: { authRequired: true },
    component: DepositeIndex,
    children: DepositeRoutes,
  },

  // === Recipients ===

  {
    path: '/recipients',
    name: Route.Recipients,
    meta: { layout: 'navbar', authRequired: true },
    component: Recipients,
    beforeEnter: checkContactsLoaded,
    children: RecipientsRoutes,
  },

  // === Load phone contacts ===

  {
    path: '/requestcontacts',
    name: Route.LoadContacts,
    meta: {
      classLayout: '-full-height',
      authRequired: true,
    },
    component: RequestContacts,
  },

  // === Invite ===

  {
    path: '/invite',
    name: Route.Invite,
    component: Recipients,
    meta: { layout: 'navbar', authRequired: true },
  },
];

export default routes;
