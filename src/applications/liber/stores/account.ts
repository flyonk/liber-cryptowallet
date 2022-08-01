import { defineStore } from 'pinia';

import { STORE_AUTH_KEY } from '@/constants';
import accountService from '@/services/accountService';
import transactionService from '@/applications/liber/services/transactionService';

import { IAccount } from '@/applications/liber/models/account/account';
import { IAccountTotal } from '@/applications/liber/models/account/IAccountTotal';
import { INetTransaction } from '@/models/transaction/transaction';
import { useErrorsStore } from '@/stores/errors';

export interface INewAccountParams {
  network: string;
  coin: string | null;
}

// === Account Types ===

export interface IAccountState {
  activeAccount: IAccount | null;
  accountToSend: IAccount | null;
  accountList: IAccount[];
  totalBalance: IAccountTotal;
  balanceByCoin: IAccount;
  coinTransactions: INetTransaction[];
  newAccountParams: INewAccountParams;
}

// === Account Store ===

export const useAccountStore = defineStore('account', {
  state: (): IAccountState => ({
    activeAccount: null,
    accountToSend: null,
    accountList: [],
    balanceByCoin: <IAccount>{},
    totalBalance: <IAccountTotal>{},
    coinTransactions: [],

    newAccountParams: {
      network: 'default',
      coin: null,
    },
  }),

  getters: {
    getAccounts: (state) => state.accountList,
    getTotalBalance: (state) => state.totalBalance,
    getCoinTransactions: (state) => state.coinTransactions,
    getBalanceByCoin: (state) => state.balanceByCoin,

    getNewAccountParams: (state) => state.newAccountParams,

    getActiveAccount: (state) => state.activeAccount,
  },

  actions: {
    async init(coin?: string) {
      const payload = window.localStorage.getItem(STORE_AUTH_KEY);
      console.debug(payload);
      try {
        this.balanceByCoin = coin
          ? await accountService.getAccountBalanceByCoin(coin)
          : <IAccount>{};
        this.coinTransactions = coin
          ? await transactionService.getTransactionList(coin)
          : [];
      } catch (err) {
        const errorsStore = useErrorsStore();

        errorsStore.handle({
          err,
          name: 'account.ts',
          ctx: 'getAccountData',
          description: "Error can't retrieve account data",
        });
      }
    },

    async getAccountList(forceFetch = true): Promise<void> {
      try {
        const fetchAndSaveData = async () => {
          this.accountList = await accountService.getAccounts();
        };

        if (forceFetch) {
          return await fetchAndSaveData();
        }

        if (!this.accountList.length) {
          await fetchAndSaveData();
        }
      } catch (err) {
        const errorsStore = useErrorsStore();

        errorsStore.handle({
          err,
          name: 'account.ts',
          ctx: 'getAccountList',
          description: "Error can't retrieve accounts list",
        });
      }
    },

    async getAccountBalance(): Promise<void> {
      try {
        this.totalBalance = await accountService.getAccountsTotalBalance();
      } catch (err) {
        const errorsStore = useErrorsStore();

        errorsStore.handle({
          err,
          name: 'account.ts',
          ctx: 'getAccountBalance',
          description: "Error can't retrieve account balance",
        });
      }
    },

    async createAccount(
      coinCode: string,
      data: { network: string; force: boolean }
    ) {
      try {
        return await accountService.createAccount(coinCode, data);
      } catch (err) {
        const errorsStore = useErrorsStore();

        errorsStore.handle({
          err,
          name: 'account.ts',
          ctx: 'createAccount',
          description: 'Error on creating account',
        });
      }
    },

    setNewAccountParams(property: keyof INewAccountParams, value: string) {
      this.newAccountParams[property] = value;
    },

    setActiveAccount(account: IAccount | null) {
      this.activeAccount = account;
    },
  },
});
