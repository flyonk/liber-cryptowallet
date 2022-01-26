export default [
    {
        path: '',
        name: 'deposit-coin',
        component: () =>
        import('@/views/DepositeBTC/DepositeSelectCoin.vue'),
    },
    {
        path: 'network',
        name: 'deposit-network',
        component: () =>
        import('@/views/DepositeBTC/DepositeSelectNetwork.vue'),
    },
    {
        path: 'wallet',
        name: 'deposit-add',
        component: () =>
        import('@/views/DepositeBTC/DepositeWallet.vue'),
    },
]