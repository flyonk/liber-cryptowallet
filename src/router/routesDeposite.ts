export default [
  {
    path: '',
    name: 'deposit-coin',
    component: () => import('@/views/DepositeCoin/DepositeSelectCoin.vue'),
  },
  {
    path: 'network',
    name: 'deposit-network',
    component: () => import('@/views/DepositeCoin/DepositeSelectNetwork.vue'),
  },
  {
    path: 'wallet',
    name: 'deposit-add',
    component: () => import('@/views/DepositeCoin/DepositeWallet.vue'),
  },
];
