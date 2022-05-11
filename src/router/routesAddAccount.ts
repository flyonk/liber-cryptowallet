import { Route } from './types';

export default [
  {
    path: '',
    name: Route.AccountAddSelectCoin,
    component: () =>
      import('@/views/Dashboard/Account/AddAccount/SelectCoin.vue'),
  },
  {
    path: 'network',
    name: Route.AccountAddSelectNetwork,
    component: () =>
      import('@/views/Dashboard/Account/AddAccount/SelectNetwork.vue'),
  },
  {
    path: 'wallet',
    name: Route.AccountAddShowWallet,
    component: () =>
      import('@/views/Dashboard/Account/AddAccount/ShowWallet.vue'),
  },
];
