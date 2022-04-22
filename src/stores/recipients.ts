import { defineStore } from 'pinia';
import { Contacts } from '@capacitor-community/contacts';
import { Storage } from '@capacitor/storage';

import contactsService from '@/services/contactsService';
import transactionService from '@/services/transactionService';

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
  return value ? JSON.parse(value) : [];
};

async function setOptions(value: any, key: EStorageKeys) {
  await Storage.set({
    key,
    value: JSON.stringify(value),
  });
}

async function loadFriends() {
  const transactions = await transactionService.getTransactionList();
  const userIds =
    transactions
      ?.map((transaction) => {
        const id = transaction.contractor?.id;
        return id || '';
      })
      .filter((id) => id !== '') || [];
  const friends = await getStoredOption(EStorageKeys.friends);
  if (friends && friends.length) {
    return new Set<string>([...friends, ...userIds]);
  }
  return new Set<string>(userIds);
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
        }
        this.friends = await loadFriends();
        this.contacts = this.contacts.map((c: Contact) => {
          if (this.friends.has(c.contactId)) {
            c.isFriend = true;
          }
          return c;
        });
        return true;
      } catch (error: any) {
        if (error?.code === CAPACITOR_WEB_ERROR) {
          this.contacts = mockedContacts;
          this.friends = await loadFriends();
          this.contacts = this.contacts.map((c: Contact) => {
            if (this.friends.has(c.contactId)) {
              c.isFriend = true;
            }
            return c;
          });
        }
      }
    },
    async addNewContact(contact: any) {
      const newContact: Contact = {
        contactId: contact.id || '',
        displayName: contact.name || '',
        phoneNumbers: contact.phones.map((item: any) => {
          return {
            number: item.value,
          };
        }),
        emails: [],
        isFriend: true,
      };
      this.contacts.push(newContact);
      this.friends.add(newContact.contactId);
      setOptions(Array.from(this.friends), EStorageKeys.friends);
    },
    async addFriend(contact: Contact) {
      this.friends.add(contact.contactId);
      this.contacts = this.contacts.map((c: Contact) => {
        if (c.contactId === contact.contactId) {
          c.isFriend = true;
        }
        return c;
      });
      const newFriend = {
        id: contact.contactId,
        name: contact.displayName || '',
        phones: contact.phoneNumbers.map((phone) => {
          return {
            value: phone.number || '',
            isPrimary: false,
          };
        }),
        emails: [],
      };
      try {
        await contactsService.createContact(newFriend);
      } catch (error) {
        console.log('friend add error', error);
      }
      setOptions(Array.from(this.friends), EStorageKeys.friends);
    },
  },
});
