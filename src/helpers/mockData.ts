import { Contact } from '@/types/contacts';

export const mockedContacts: Contact[] = [
  {
    contactId: '1',
    displayName: 'Steven King',
    phoneNumbers: [{ number: '+7 123 123 1233' }],
    emails: [],
  },
  {
    contactId: '2',
    displayName: 'Jorge Washinton',
    phoneNumbers: [{ number: '+7 123 456 1233' }],
    emails: [],
  },
  {
    contactId: '3',
    displayName: 'Indira Gandi',
    phoneNumbers: [{ number: '+7 123 789 1233' }],
    emails: [],
  },
  {
    contactId: '4',
    displayName: 'Kseniya Borodina',
    phoneNumbers: [{ number: '+7 123 102 9999' }],
    emails: [],
  },
  {
    contactId: '5',
    displayName: undefined,
    phoneNumbers: [{ number: '+7 123 102 9955' }],
    emails: [],
  },
  {
    contactId: '6',
    displayName: '',
    phoneNumbers: [{ number: '+7 123 102 9912' }],
    emails: [],
  },
  {
    contactId: '7',
    displayName: 'Иван Тест',
    phoneNumbers: [{ number: '+7 123 102 9912' }],
    emails: [],
  },
  {
    contactId: '8',
    displayName: ' ! фтн any',
    phoneNumbers: [{ number: '+7 123 102 9912' }],
    emails: [],
  },
];
