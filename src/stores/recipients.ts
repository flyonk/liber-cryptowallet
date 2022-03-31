import { defineStore } from 'pinia';
import { Contacts } from '@capacitor-community/contacts';
import { Storage } from '@capacitor/storage';

import { Contact } from '@/types/contacts';
import { EStorageKeys } from '@/types/storage';

import { mockedContacts } from '@/helpers/contacts';
import { CAPACITOR_WEB_ERROR } from '@/constants';

interface IRecepients {
  contacts: Contact[];
  permission: boolean;
  friends: Set<string>;
}

const getStoredOption = async (key: EStorageKeys) => {
  const { value } = await Storage.get({
    key,
  });
  return value || null;
};

async function setOptions(value: any, key: EStorageKeys) {
  await Storage.set({
    key,
    value,
  });
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
        const friends = await getStoredOption(EStorageKeys.friends);
        if (friends && friends.length) {
          this.friends = new Set<string>(friends);
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
      setOptions(this.friends, EStorageKeys.friends);
    },
  },
});
