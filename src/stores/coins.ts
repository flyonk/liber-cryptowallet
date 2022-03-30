import { defineStore } from 'pinia';
import { ICoin } from '@/models/coin/coins';
import CoinService from '@/services/coinService';

export interface ICoinsState {
  coins: ICoin[];
}

export const useCoinsStore = defineStore('coins', {
  state: (): ICoinsState => ({
    coins: [],
  }),

  getters: {
    getCoins: (state) => state.coins,
  },

  actions: {
    async fetchCoins() {
      this.coins = await CoinService.getCoins();
    },
  },
});
