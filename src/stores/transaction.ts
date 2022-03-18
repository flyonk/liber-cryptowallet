import { defineStore } from 'pinia';

import transactionService from '@/services/transactionService';

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
    async init(id?: string) {
      this.transactions = await transactionService.getTransactionList(id);
    },
  },
});