import { defineStore } from 'pinia';
import { Contacts } from '@capacitor-community/contacts';
import { get, set } from '@/helpers/storage';

import contactsService from '@/applications/liber/services/contactsService';
import transactionService from '@/applications/liber/services/transactionService';

import { Contact } from '@/types/contacts';
import { EStorageKeys } from '@/types/storage';

import { mockedContacts } from '@/helpers/contacts';
import { CAPACITOR_WEB_ERROR } from '@/constants';
import { useErrorsStore } from '@/stores/errors';

interface IRecipients {
  contacts: Contact[];
  permission: boolean;
  friends: Set<string>;
  communicationWayContactId?: null | string;
}

interface IPhoneNumber {
  value: string;
}

interface IContact {
  id: string;
  name: string;
  phones: IPhoneNumber[];
  emails: [];
}

const getStoredOption = async (key: EStorageKeys) => {
  const value = await get(key);
  return value ? JSON.parse(value) : [];
};

async function setOptions(value: string[], key: EStorageKeys) {
  await set({
    key,
    value: JSON.stringify(value),
  });
}

async function loadFriends() {
  const transactions = await transactionService.getTransactionList();
  const contacts = <any>[];
  const userIds =
    transactions
      ?.map((transaction) => {
        const id = transaction.contractor?.id;
        if (id) {
          contacts.push({
            contactId: transaction.contractor?.id || '',
            displayName: '',
            phoneNumbers: transaction.contractor?.phone
              ? [transaction.contractor?.phone]
              : [],
            emails: transaction.contractor?.email
              ? [transaction.contractor?.email]
              : [],
            isFriend: true,
          });
        }
        return id || '';
      })
      .filter((id) => id !== '') || [];
  const friends = await getStoredOption(EStorageKeys.friends);
  const filteredContacts = contacts.filter(
    (c: any) => c.id && c.phoneNumbers.length
  );
  if (friends && friends.length) {
    return [new Set<string>([...friends, ...userIds]), filteredContacts];
  }
  return [new Set<string>(userIds), filteredContacts];
}

// === Phone contacts Store ===

export const useRecipientsStore = defineStore('recipients', {
  state: (): IRecipients => ({
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
        this.permission = Boolean(granted);
        if (granted) {
          const { contacts } = await Contacts.getContacts();
          this.contacts = contacts;
        }
        const [friends, contacts] = await loadFriends();
        this.friends = friends;
        this.contacts = this.contacts.map((c: Contact) => {
          if (this.friends.has(c.contactId)) {
            c.isFriend = true;
          }
          return c;
        });
        const contactIds = this.contacts.map((c: Contact) => c.contactId);
        contacts.forEach((c: Contact) => {
          if (!contactIds.includes(c.contactId)) {
            this.contacts.push(c);
          }
        });
        return true;
      } catch (err: any) {
        if (err?.code === CAPACITOR_WEB_ERROR) {
          // todo: remove mocked contacts import
          this.contacts = mockedContacts;
          const [friends, contacts] = await loadFriends();
          this.friends = friends;
          this.contacts = this.contacts.map((c: Contact) => {
            if (this.friends.has(c.contactId)) {
              c.isFriend = true;
            }
            return c;
          });
          const contactIds = this.contacts.map((c: Contact) => c.contactId);
          contacts.forEach((c: Contact) => {
            if (!contactIds.includes(c.contactId)) {
              this.contacts.push(c);
            }
          });
        }

        const errorsStore = useErrorsStore();

        errorsStore.handle({
          err,
          name: 'recipients.ts',
          ctx: 'getPhoneContacts',
          description: "Error can't get phone contacts",
        });
      }
    },
    async addNewContact(contact: IContact) {
      const newContact: Contact = {
        contactId: contact.id || '',
        displayName: contact.name || '',
        phoneNumbers: contact.phones
          .map((item) => {
            return {
              number: item.value,
            };
          })
          .filter((item) => !!item.number),
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
      } catch (err) {
        const errorsStore = useErrorsStore();

        errorsStore.handle({
          err,
          name: 'recipients.ts',
          ctx: 'addFriend',
          description: "Error can't add new contact",
        });
      }
      setOptions(Array.from(this.friends), EStorageKeys.friends);
    },
    getContactInfo(contactId: string | null | undefined) {
      if (contactId) {
        const _contactArr = this.contacts.filter(
          (c) => c.contactId === contactId
        );
        return _contactArr && _contactArr[0];
      }
      return;
    },
    selectCommunicationWay(contactId: string) {
      this.communicationWayContactId = contactId;
    },
  },
});
