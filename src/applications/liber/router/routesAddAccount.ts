import { Route } from '@/router/types';

export default [
  {
    path: '',
    name: Route.AccountAddSelectCoin,
    component: () =>
      import(
        '@/applications/liber/views/Dashboard/Account/AddAccount/SelectCoin.vue'
      ),
  },
  {
    path: 'network',
    name: Route.AccountAddSelectNetwork,
    component: () =>
      import(
        '@/applications/liber/views/Dashboard/Account/AddAccount/SelectNetwork.vue'
      ),
  },
  {
    path: 'wallet',
    name: Route.AccountAddShowWallet,
    component: () =>
      import(
        '@/applications/liber/views/Dashboard/Account/AddAccount/ShowWallet.vue'
      ),
    meta: { classLayout: '-full-viewport' },
  },
];
