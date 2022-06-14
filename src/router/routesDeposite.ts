import { Route } from './types';

export default [
  {
    path: '',
    name: Route.DepositCoin,
    component: () => import('@/views/DepositeCoin/DepositeSelectCoin.vue'),
  },
  {
    path: 'network',
    name: Route.DepositNetwork,
    component: () => import('@/views/DepositeCoin/DepositeSelectNetwork.vue'),
  },
  {
    path: 'wallet',
    name: Route.DepositAdd,
    component: () => import('@/views/DepositeCoin/DepositeWallet.vue'),
  },
];
