import { defineStore } from 'pinia';

import fundsService from '@/services/fundsService';
import { useMfaStore } from '@/stores/mfa';

interface ITransferState {
  coin: string;
  recipient: TRecipient;
  amount: string;
}

export type TRecipient = {
  id?: string;
  phone: string;
  email?: string;
};

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
        Boolean(+state.amount > 0);

      return isFullData;
    },
  },

  actions: {
    async transfer(): Promise<void> {
      const mfaStore = useMfaStore();
      mfaStore.show({ title: 'transactions.send' });
      await fundsService.transfer(this.coin, {
        amount: this.amount,
        recipient: this.recipient as TRecipient,
      });
    },

    clearTransferData(): void {
      this.$reset();
    },

    setRecipient(data: TRecipient = { id: '', phone: '' }): void {
      this.recipient = data;
    },
  },
});
