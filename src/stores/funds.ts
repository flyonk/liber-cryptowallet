import { defineStore } from 'pinia';
import cloneDeep from 'lodash/cloneDeep';

import fundsService from '@/services/fundsService';

import { IConvertInfo, TConvertData } from '@/models/funds/convertInfo';

interface IFundsState {
  convertInfo: IConvertInfo;
  convertFunds: boolean;
  from: string | null;
  to: string | null;
  codeFrom: string | null;
  codeTo: string | null;
  imgFrom: string | null;
  imgTo: string | null;
}

export const emptyConvert = {
  from: '',
  to: '',
  codeFrom: '',
  codeTo: '',
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
    from: 'BTC',
    codeFrom: 'tbtc',
    to: 'LTC',
    codeTo: 'tltc',
    imgFrom: require('@/assets/icon/currencies/btc.svg'),
    imgTo: require('@/assets/icon/currencies/ltc.svg'),
  }),

  getters: {
    getState: (state) => state,

    getConvertInfo: (state) => state.convertInfo,
    getConvertFunds: (state) => state.convertFunds,
  },

  actions: {
    //TODO: duplicate methods checkConvertInfo and checkConvertInfoBack
    async checkConvertInfo(data: Omit<TConvertData, 'amount'>): Promise<void> {
      this.convertInfo = await fundsService.convertInfo(data);
    },

    async checkConvertInfoBack(
      data: Omit<TConvertData, 'amount'>
    ): Promise<void> {
      this.convertInfo = await fundsService.convertInfoBack(data);
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
    setCryptoTo(crypto: string, code: string, img: string): void {
      this.to = crypto;
      this.codeTo = code;
      this.imgTo = img;
    },
    setCryptoFrom(crypto: string, code: string, img: string): void {
      this.from = crypto;
      this.codeFrom = code;
      this.imgFrom = img;
    },
    replaceCoins(): void {
      const _from = this.from;
      const _imgFrom = this.imgFrom;
      this.from = this.to;
      this.imgFrom = this.imgTo;
      this.to = _from;
      this.imgTo = _imgFrom;
    },
  },
});
