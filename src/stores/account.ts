import { defineStore } from 'pinia';

import { STORE_AUTH_KEY } from '@/constants';
import accountService from '@/services/accountService';
import SentryUtil from '@/helpers/sentryUtil';

import { IAccount } from '@/models/account/account';
import { IAccountTotal } from '@/models/account/IAccountTotal';

// === Account Types ===

export interface IAccountState {
  address: string;
  token?: string;
  accountList: IAccount[];
  totalBalance: IAccountTotal;
}

// === Account Store ===

export const useAccountStore = defineStore('account', {
  state: (): IAccountState => ({
    address: '',
    token: undefined,
    accountList: [],
    totalBalance: <IAccountTotal>{},
  }),

  getters: {
    getAccounts: (state) => state.accountList,
    getTotalBalance: (state) => state.totalBalance,
  },

  actions: {
    async init() {
      const payload = window.localStorage.getItem(STORE_AUTH_KEY);
      console.debug(payload);
    },

    async getAccountList(): Promise<void> {
      try {
        this.accountList = await accountService.getAccounts();
      } catch (err) {
        SentryUtil.capture(
          err,
          'dashboard',
          'getAccountList',
          "error can't retrieve accounts list"
        );
      }
    },

    async getAccountBalance(): Promise<void> {
      try {
        this.totalBalance = await accountService.getAccountsTotalBalance();
      } catch (err) {
        SentryUtil.capture(
          err,
          'dashboard',
          'getAccountBalance',
          "error can't retrieve account balance"
        );
      }
    },
  },
});
