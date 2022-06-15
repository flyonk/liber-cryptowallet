import { defineStore } from 'pinia';
import cloneDeep from 'lodash/cloneDeep';

import fundsService from '@/applications/liber/services/fundsService';
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
      img: `${STATIC_BASE_URL}/static/currencies/btc.svg`,
    },
    to: {
      name: '---',
      code: 'empty',
      img: `${STATIC_BASE_URL}/static/currencies/empty_token.svg`,
    },
  }),

  getters: {
    getState: (state) => state,
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

    setCrypto(coin: ICoinForExchange | null, direction: 'to' | 'from'): void {
      if (!coin) {
        this[direction] = null;
      } else {
        this[direction] = {
          name: coin.name,
          code: coin.code,
          img: coin.img,
        };
      }
    },

    swapCoins(): void {
      const _from = Object.assign({}, this.from);
      this.from = this.to;
      this.to = _from;
    },
  },
});
