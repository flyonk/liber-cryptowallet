import { defineStore } from 'pinia';

import fundsService from '@/services/fundsService';

interface ITransferState {
  coin: string;
  recipient: {
    id: string;
    phone: string;
  };
  amount: string;
}

// === transaction Store ===

export const useTransferStore = defineStore('transfer', {
  state: (): ITransferState => ({
    coin: '',
    recipient: {
      id: '',
      phone: '',
    },
    amount: '',
  }),

  getters: {
    getCoin: (state) => state.coin,
    getRecipient: (state) => state.recipient,
    getAmount: (state) => state.recipient,
  },

  actions: {
    async transfer(): Promise<void> {
      await fundsService.transfer(this.coin, {
        recipient: this.recipient,
        amount: this.amount,
      });
    },
  },
});
