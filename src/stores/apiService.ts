import { defineStore } from 'pinia';

// === OldApiService Types ===

export interface IApiServiceState {
  reqCount: number;
}

// === OldApiService Store ===

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
