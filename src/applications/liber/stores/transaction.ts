import { defineStore } from 'pinia';

import transactionService from '@/applications/liber/services/transactionService';

import { INetTransaction } from '@/models/transaction/transaction';

interface ITransactionState {
  transactions: INetTransaction[];
}

// === transaction Store ===

export const useTransactionStore = defineStore('transaction', {
  state: (): ITransactionState => ({
    transactions: [],
  }),

  getters: {
    getTransactionList: (state) => state.transactions,
  },

  actions: {
    async init(id?: string): Promise<void> {
      this.transactions = await transactionService.getTransactionList(id);
    },
  },
});
