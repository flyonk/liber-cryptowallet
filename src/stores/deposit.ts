import { defineStore } from 'pinia';
import { IAccount } from '@/models/account/account';

export interface IDepositState {
  account: IAccount | null;
}

export const useDepositStore = defineStore('deposit', {
  state: (): IDepositState => ({
    account: null,
  }),

  getters: {
    getAccount: ({ account }) => account,
  },

  actions: {
    setAccount(account: IAccount) {
      this.account = account;
    },
  },
});
