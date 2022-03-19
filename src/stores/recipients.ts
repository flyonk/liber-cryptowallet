import { defineStore } from 'pinia';
import { Contacts } from '@capacitor-community/contacts';

import { Contact } from '@/types/contacts';

interface IRecepients {
  contacts: Contact[];
  permission: boolean;
}

// === Phone contacts Store ===

export const useRecepientsStore = defineStore('recepients', {
  state: (): IRecepients => ({
    contacts: [],
    permission: false,
  }),

  getters: {
    getContacts: (state) => state.contacts,
  },

  actions: {
    async getPhoneContacts() {
      const { granted } = await Contacts.getPermissions();
      this.permission = !!granted;
      if (granted) {
        const { contacts } = await Contacts.getContacts();
        this.contacts = contacts;
        return true;
      }
      return true;
    },
  },
});
