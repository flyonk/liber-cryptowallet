import { defineStore } from 'pinia';
import { Contacts } from '@capacitor-community/contacts';

import { Contact } from '@/types/contacts';

import { mockedContacts } from '@/helpers/mockData';
import { CAPACITOR_WEB_ERROR } from '@/constants';

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
      try {
        const result = await Contacts.getPermissions();
        const { granted } = result;
        this.permission = !!granted;
        if (granted) {
          const { contacts } = await Contacts.getContacts();
          this.contacts = contacts;
          return true;
        }
        return true;
      } catch (error: any) {
        if (error?.code === CAPACITOR_WEB_ERROR) {
          this.contacts = mockedContacts;
        }
      }
    },
  },
});
