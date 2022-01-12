import { defineStore } from 'pinia';
import { STORE_AUTH_KEY } from '@/constants';

// === Account Types ===

export interface IAccountState {
  address: string;
  token?: string;
}

// === Account Store ===

export const useAccountStore = defineStore('account', {
  state: (): IAccountState => ({
    address: '',
    token: undefined,
  }),

  getters: {
    //
  },

  actions: {
    async init() {
      const payload = window.localStorage.getItem(STORE_AUTH_KEY);
      console.debug(payload);
    },
  },
});
