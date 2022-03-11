import { defineStore } from 'pinia';

// === ApiService Types ===

export interface IApiServiceState {
  reqCount: number;
}

// === ApiService Store ===

export const useApiServiceStore = defineStore('apiService', {
  state: (): IApiServiceState => ({
    reqCount: 0,
  }),

  getters: {
    //
  },

  actions: {
    incReqCount() {
      this.reqCount++;
    },

    decResCount() {
      this.reqCount--;
    },
  },
});
