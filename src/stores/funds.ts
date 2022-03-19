import { defineStore } from 'pinia';
import cloneDeep from 'lodash/cloneDeep';

import fundsService from '@/services/fundsService';

import { IConvertInfo, TConvertData } from '@/models/funds/convertInfo';

interface IFundsState {
  convertInfo: IConvertInfo;
  convertFunds: boolean;
}

export const emptyConvert = {
  from: '',
  to: '',
  rate: '0',
  backRate: '0',
  fee: '0',
  validUntil: '',
  estimatedAmount: '0',
} as IConvertInfo;

// === transaction Store ===

export const useFundsStore = defineStore('funds', {
  state: (): IFundsState => ({
    convertInfo: cloneDeep(emptyConvert),
    convertFunds: false,
  }),

  getters: {
    getConvertInfo: (state) => state.convertInfo,
    getConvertFunds: (state) => state.convertFunds,
  },

  actions: {
    async checkConvertInfo(data: Omit<TConvertData, 'amount'>): Promise<void> {
      this.convertInfo = await fundsService.convertInfo(data);
    },

    async changeCurrency(
      data: Omit<TConvertData, 'request_amount'>
    ): Promise<void> {
      await fundsService.convert(data);
    },

    setConvertFunds(val: boolean): void {
      this.convertFunds = val;
    },

    clearConvertInfo(): void {
      this.convertFunds = false;
      this.convertInfo = cloneDeep(emptyConvert);
    },
  },
});
