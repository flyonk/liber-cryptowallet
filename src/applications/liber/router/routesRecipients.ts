import { Route } from '@/router/types';

export default [
  {
    path: '',
    name: Route.RecipientsPhone,
    component: () =>
      import(
        '@/applications/liber/views/Contacts/childrenviews/PhoneContacts.vue'
      ),
  },
  {
    path: 'liber',
    name: Route.RecipientsLiber,
    component: () =>
      import(
        '@/applications/liber/views/Contacts/childrenviews/PhoneContacts.vue'
      ),
    meta: {
      friends: true,
    },
  },
];
