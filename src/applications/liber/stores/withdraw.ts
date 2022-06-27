import { defineStore } from 'pinia';

import fundsService from '@/applications/liber/services/fundsService';

import {
  IWithdrawalInfo,
  IWithdrawalInfoRequest,
} from '@/applications/liber/models/funds/withdrawInfo';

export interface IWithdrawState {
  info: IWithdrawalInfo;

  showSuccessToast: boolean;
}

export const useWithdrawStore = defineStore('withdraw', {
  state: (): IWithdrawState => ({
    info: {
      currencyCode: '',
      requestAmount: '',
      amountToReceive: '',
      availableSum: '',
      minRequest: '',
      maxRequest: '',
      fee: '',
      address: '',
    },

    showSuccessToast: false,
  }),

  getters: {
    getWithdrawInfo: (state) => state.info,
  },

  actions: {
    async fetchWithdrawInfo(requestData: IWithdrawalInfoRequest) {
      this.info = await fundsService.withdrawInfo(requestData);
    },

    async withdraw() {
      await fundsService.withdraw({
        code: this.info.currencyCode,
        address: this.info.address,
        amount: this.info.amountToReceive,
        network: 'main',
      });
    },

    resetData() {
      this.$reset();
    },

    setSuccessToastState(state: boolean) {
      this.showSuccessToast = state;
    },
  },
});
