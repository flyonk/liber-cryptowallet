import { Route } from '@/router/types';

export default [
  {
    path: '',
    name: Route.DepositCoin,
    component: () =>
      import('@/applications/liber/views/DepositeCoin/DepositeSelectCoin.vue'),
  },
  {
    path: 'network',
    name: Route.DepositNetwork,
    component: () =>
      import(
        '@/applications/liber/views/DepositeCoin/DepositeSelectNetwork.vue'
      ),
  },
  {
    path: 'wallet',
    name: Route.DepositAdd,
    component: () =>
      import('@/applications/liber/views/DepositeCoin/DepositeWallet.vue'),
  },
];
