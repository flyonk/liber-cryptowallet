import { defineStore } from 'pinia';

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
    //
  },
});
