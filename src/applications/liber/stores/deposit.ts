import { defineStore } from 'pinia';
import { IAccount } from '@/applications/liber/models/account/account';

export interface IDepositNetwork {
  value: string | number;
  text: string;
}

export interface IDepositState {
  accountInfo: IAccount | null;
  network: IDepositNetwork | null;
}

export const useDepositStore = defineStore('deposit', {
  state: (): IDepositState => ({
    accountInfo: null,
    network: null,
  }),

  getters: {
    getNetwork: ({ network }) => network,
    getAccountInfo: ({ accountInfo }) => accountInfo,
  },

  actions: {
    setAccountInfo(info: IAccount) {
      this.accountInfo = info;
    },

    setNetwork(network: IDepositNetwork) {
      this.network = { ...network };
    },
  },
});
