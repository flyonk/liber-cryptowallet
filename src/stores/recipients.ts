import { defineStore } from 'pinia';

import { IIPhoneContact } from '@/models/recipient/iPhoneContact';

interface IRecepients {
  contacts: IIPhoneContact[];
}

// === Phone contacts Store ===

export const useRecepientsStore = defineStore('recepients', {
  state: (): IRecepients => ({
    contacts: [],
  }),

  getters: {
    getContacts: (state) => state.contacts,
  },

  actions: {},
});
