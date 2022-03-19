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

export const emptyConvert = {
  coin: '',
  recipient: {
    id: '',
    phone: '',
  },
  amount: '',
} as ITransferState;

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
    isReadyForTransfer: (state) => {
      const isFullData =
        Boolean(state.coin) &&
        Boolean(state.recipient.id) &&
        Boolean(state.recipient.phone) &&
        Boolean(state.amount);

      return isFullData;
    },
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
