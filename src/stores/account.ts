import { defineStore } from 'pinia';

import { STORE_AUTH_KEY } from '@/constants';
import accountService from '@/services/accountService';
import transactionService from '@/services/transactionService';
import SentryUtil from '@/helpers/sentryUtil';

import { IAccount } from '@/models/account/account';
import { IAccountTotal } from '@/models/account/IAccountTotal';
import { INetTransaction } from '@/models/transaction/transaction';

// === Account Types ===

export interface IAccountState {
  address: string;
  token?: string;
  accountList: IAccount[];
  totalBalance: IAccountTotal;
  balanceByCoin: IAccount;
  coinTransactions: INetTransaction[];
}

// === Account Store ===

export const useAccountStore = defineStore('account', {
  state: (): IAccountState => ({
    address: '',
    token: undefined,
    accountList: [],
    balanceByCoin: <IAccount>{},
    totalBalance: <IAccountTotal>{},
    coinTransactions: [],
  }),

  getters: {
    getAccounts: (state) => state.accountList,
    getTotalBalance: (state) => state.totalBalance,
    getCoinTransactions: (state) => state.coinTransactions,
    getBalanceByCoin: (state) => state.balanceByCoin,
  },

  actions: {
    async init(coin?: string) {
      const payload = window.localStorage.getItem(STORE_AUTH_KEY);
      console.debug(payload);
      try {
        //Get account data
        const [totalBalance, coinTransactions] = await Promise.all([
          await accountService.getAccountBalanceByCoin(coin),
          await transactionService.getTransactionList(coin),
        ]);
        this.balanceByCoin = totalBalance;
        this.coinTransactions = coinTransactions;
      } catch (err) {
        SentryUtil.capture(
          err,
          'AccountDetail',
          'getAccountData',
          "error can't retrieve account data"
        );
      }
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

    async createAccount(
      coinCode: string,
      data: { network: string; force: boolean }
    ) {
      try {
        return await accountService.createAccount(coinCode, data);
      } catch (err) {
        SentryUtil.capture(
          err,
          'dashboard',
          'createAccount',
          'error on creating account'
        );
      }
    },
  },
});
