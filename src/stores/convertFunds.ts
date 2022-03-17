import { defineStore } from 'pinia';

interface IconvertFunds {
  from: string | null;
  to: string | null;
  imgFrom: string | null;
  imgTo: string | null;
}

// === 2fa Store ===

export const useConvertFundsStore = defineStore('convertFunds', {
  state: (): IconvertFunds => ({
    from: null,
    to: null,
    imgFrom: null,
    imgTo: null,
  }),

  getters: {
    getState: (state) => state,
  },

  actions: {
    setCryptoTo(crypto: string, img: string) {
      this.to = crypto;
      this.imgTo = img;
    },
    setCryptoFrom(crypto: string, img: string) {
      this.from = crypto;
      this.imgFrom = img;
    },
  },
});
