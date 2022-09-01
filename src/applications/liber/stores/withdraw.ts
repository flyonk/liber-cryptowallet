import { defineStore } from 'pinia';

import fundsService from '@/applications/liber/services/fundsService';

import {
  IWithdrawalInfo,
  IWithdrawalInfoRequest,
} from '@/applications/liber/models/funds/withdrawInfo';

export interface IWithdrawState {
  info: IWithdrawalInfo;
}

export const useWithdrawStore = defineStore('withdraw', {
  state: (): IWithdrawState => ({
    info: {
      address: '',
      currencyCode: '',
      availableSum: '',
      requestAmount: '',
      fee: '',
      total: '',
      minRequest: '',
      maxRequest: '',
    },
  }),

  getters: {
    getWithdrawInfo: (state: IWithdrawState) => state.info,
  },

  actions: {
    async fetchWithdrawInfo(requestData: IWithdrawalInfoRequest) {
      this.info = await fundsService.withdrawInfo(requestData);
    },

    async withdraw() {
      await fundsService.withdraw({
        code: this.info.currencyCode,
        address: this.info.address,
        amount: this.info.requestAmount,
        network: 'main',
      });
    },

    resetData() {
      this.$reset();
    },
  },
});
