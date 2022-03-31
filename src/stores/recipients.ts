import { defineStore } from 'pinia';
import { Contacts } from '@capacitor-community/contacts';

import { Contact } from '@/types/contacts';

import { mockedContacts } from '@/helpers/contacts';
import { CAPACITOR_WEB_ERROR } from '@/constants';

interface IRecepients {
  contacts: Contact[];
  permission: boolean;
  friends: Set<string>;
}

// === Phone contacts Store ===

export const useRecepientsStore = defineStore('recepients', {
  state: (): IRecepients => ({
    contacts: [],
    permission: false,
    friends: new Set<string>(),
  }),

  getters: {
    getFriends: (state) => {
      return state.contacts
        .sort((a, b) => {
          const aFirstLetter = a.displayName?.charCodeAt(0) || Number.MAX_VALUE;
          const bFirstLetter = b.displayName?.charCodeAt(0) || Number.MAX_VALUE;
          return aFirstLetter - bFirstLetter;
        })
        .filter((c) => state.friends.has(c.contactId));
    },
    getContacts: (state) => {
      return state.contacts.sort((a, b) => {
        const aFirstLetter = a.displayName?.charCodeAt(0) || Number.MAX_VALUE;
        const bFirstLetter = b.displayName?.charCodeAt(0) || Number.MAX_VALUE;
        return aFirstLetter - bFirstLetter;
      });
    },
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
    addFriend(contact: Contact) {
      this.friends.add(contact.contactId);
    },
  },
});
