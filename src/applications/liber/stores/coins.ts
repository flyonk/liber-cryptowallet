import { defineStore } from 'pinia';
import { ICoin } from '@/applications/liber/models/funds/coin';
import FundsService from '@/applications/liber/services/fundsService';

export interface ICoinsState {
  coins: ICoin[];
}

export const useCoinsStore = defineStore('coins', {
  state: (): ICoinsState => ({
    coins: [],
  }),

  getters: {
    getCoins: (state) => state.coins,
    getPopularCoins: (state) => state.coins.filter((e) => !!e?.isPopular),
  },

  actions: {
    async fetchCoins(forceFetch = true) {
      if (forceFetch) {
        this.coins = await FundsService.getCoins();

        return;
      }

      if (!this.coins.length) {
        this.coins = await FundsService.getCoins();
      }
    },
  },
});
