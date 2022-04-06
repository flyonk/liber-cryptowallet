import { defineStore } from 'pinia';
import cloneDeep from 'lodash/cloneDeep';

import fundsService from '@/services/fundsService';
import { STATIC_BASE_URL } from '@/constants';

import { IConvertInfo, TConvertData } from '@/models/funds/convertInfo';

export interface ICoinForExchange {
  name: string;
  code: string;
  img: string;
}

interface IFundsState {
  convertInfo: IConvertInfo;
  convertFunds: boolean;
  from: ICoinForExchange | null;
  to: ICoinForExchange | null;
}

export const emptyConvert = {
  from: '',
  to: '',
  rate: '0',
  backRate: '0',
  fee: '0',
  validUntil: '',
  estimatedAmount: '0',
  requestAmount: '0',
} as IConvertInfo;

// === transaction Store ===

export const useFundsStore = defineStore('funds', {
  state: (): IFundsState => ({
    convertInfo: cloneDeep(emptyConvert),
    convertFunds: false,
    from: {
      name: 'BTC',
      code: 'tbtc',
      img: `${STATIC_BASE_URL}/currencies/btc.svg`,
    },
    to: {
      name: 'LTC',
      code: 'tltc',
      img: `${STATIC_BASE_URL}/currencies/ltc.svg`,
    },
  }),

  getters: {
    getState: (state) => state,
    getConvertInfo: (state) => state.convertInfo,
    getConvertFunds: (state) => state.convertFunds,
  },

  actions: {
    async checkConvertInfo(
      data: Omit<TConvertData, 'amount'>,
      dir: 'from' | 'to'
    ): Promise<void> {
      this.convertInfo = await fundsService.convertInfo(data, dir);
    },

    async changeCurrency(
      data: Omit<TConvertData, 'request_amount'>
    ): Promise<void> {
      await fundsService.convert(data);
    },

    setConvertFunds(val: boolean): void {
      this.convertFunds = val;
    },

    setCrypto(
      crypto: string,
      code: string,
      img: string,
      direction: 'to' | 'from'
    ): void {
      this[direction] = {
        name: crypto,
        code: code,
        img: img,
      };
    },

    swapCoins(): void {
      const _from = Object.assign({}, this.from);
      this.from = this.to;
      this.to = _from;
    },
  },
});
