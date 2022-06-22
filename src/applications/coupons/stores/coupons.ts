import { defineStore } from 'pinia';

import couponsService from '@/applications/coupons/services/couponsService';
import { useErrorsStore } from '@/stores/errors';
import { AxiosError } from 'axios';
import { ICouponAccount } from '@/applications/coupons/models/account/account';
import { TTransaction } from '@/models/transaction/transaction';

export interface ICouponsStore {
  totalBalance: string;

  accounts: ICouponAccount[];

  transactions: TTransaction[];
}

export const useCouponsStore = defineStore('coupons', {
  state: (): ICouponsStore => ({
    totalBalance: '',

    accounts: [],

    transactions: [],
  }),

  getters: {
    getTotalBalance: (state) => state.totalBalance,

    getAccounts: (state) => state.accounts,

    getTransactions: (state) => state.transactions,
  },

  actions: {
    async setTotalBalance() {
      try {
        this.totalBalance = await couponsService.fetchTotalBalance();
      } catch (e) {
        const errorsStore = useErrorsStore();
        errorsStore.handle({
          err: e as AxiosError | Error,
          name: 'CouponsFetchTotalBalance',
          ctx: 'store/coupons',
          description: 'Error receiving coupons data',
        });
      }
    },

    async setAccounts() {
      try {
        this.accounts = await couponsService.fetchAccounts();
      } catch (e) {
        const errorsStore = useErrorsStore();
        errorsStore.handle({
          err: e as AxiosError | Error,
          name: 'FetchCouponsAccounts',
          ctx: 'store/coupons',
          description: 'Error receiving coupons data',
        });
      }
    },

    async setTransactions() {
      try {
        this.transactions = await couponsService.fetchTransactions();
      } catch (e) {
        console.error(e);
        const errorsStore = useErrorsStore();

        await errorsStore.handle({
          err: e as AxiosError | Error,
          name: 'FetchCouponsTransactions',
          ctx: 'store/coupons',
          description: 'Error receiving coupons data',
        });
      }
    },
  },
});
