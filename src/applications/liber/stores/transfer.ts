import { defineStore } from 'pinia';

import fundsService from '@/applications/liber/services/fundsService';

interface ITransferState {
  coin: string;
  recipient: TRecipient;
  amount: string;
}

export type TRecipient = {
  id?: string;
  phone?: string;
  email?: string;
};

// === transaction Store ===

export const useTransferStore = defineStore('transfer', {
  state: (): ITransferState => ({
    coin: '',
    recipient: {
      id: '',
      email: '',
    },
    amount: '',
  }),

  getters: {
    isReadyForTransfer: (state) => {
      const isFullData =
        Boolean(state.coin) &&
        Boolean(state.recipient.id) &&
        Boolean(state.recipient.email) &&
        Boolean(+state.amount > 0);

      return isFullData;
    },
  },

  actions: {
    async transfer(): Promise<void> {
      await fundsService.transfer(this.coin, {
        amount: this.amount,
        recipient: this.recipient as TRecipient,
      });
    },

    clearTransferData(): void {
      this.$reset();
    },

    setRecipient(data: TRecipient = { id: '', email: '' }): void {
      this.recipient = data;
    },
  },
});
