import { defineStore } from 'pinia';

import fundsService from '@/applications/servicesapp/services/fundsService';
import { STATIC_BASE_URL } from '@/constants';

import {
  IConvertInfo,
  TConvertCouponData,
  TConvertData,
} from '@/applications/servicesapp/models/funds/convertInfo';

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

// === transaction Store ===

export const useFundsStore = defineStore('fundsLiberSave', {
  state: (): IFundsState => ({
    convertInfo: {
      from: '',
      to: '',
      rate: '0',
      backRate: '0',
      fee: '0',
      validUntil: '',
      estimatedAmount: '0',
      requestAmount: '0',
    } as IConvertInfo,
    convertFunds: false,
    from: {
      name: 'EUR',
      code: 'eur',
      img: `${STATIC_BASE_URL}/static/currencies/euro.svg`,
    },
    to: {
      name: 'BTC',
      code: 'tbtc',
      img: `${STATIC_BASE_URL}/static/currencies/btc.svg`,
    },
  }),

  getters: {
    getState: (state) => state,
    getConvertInfo: (state) => state.convertInfo,
    getConvertFunds: (state) => state.convertFunds,
  },

  actions: {
    async checkConvertInfo(data: TConvertCouponData): Promise<void> {
      this.convertInfo = await fundsService.convertInfo(data);
    },

    async changeCurrency(data: TConvertData): Promise<void> {
      await fundsService.convert(data);
    },

    async getCrypto(data: TConvertData): Promise<void> {
      await fundsService.getcrypto(data);
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
  },
});
