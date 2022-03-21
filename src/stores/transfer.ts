import { defineStore } from 'pinia';

import fundsService from '@/services/fundsService';

interface ITransferState {
  coin: string;
  recipient: {
    id: string;
    phone: string;
  };
  amount: number;
}

// === transaction Store ===

export const useTransferStore = defineStore('transfer', {
  state: (): ITransferState => ({
    coin: '',
    recipient: {
      id: '',
      phone: '',
    },
    amount: 0,
  }),

  getters: {
    isReadyForTransfer: (state) => {
      const isFullData =
        Boolean(state.coin) &&
        Boolean(state.recipient.id) &&
        Boolean(state.recipient.phone) &&
        Boolean(state.amount > 0);

      return isFullData;
    },
  },

  actions: {
    async transfer(): Promise<void> {
      await fundsService.transfer(this.coin, {
        amount: this.amount,
        recipient: this.recipient,
      });
    },

    clearTransferData(): void {
      this.amount = 0;
      this.recipient = { id: '', phone: '' };
      this.coin = '';
    },
  },
});
