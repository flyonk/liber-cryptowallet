import { Route } from '@/router/types';

export default [
  {
    path: '',
    name: Route.RecepientsPhone,
    component: () =>
      import(
        '@/applications/liber/views/Contacts/childrenviews/PhoneContacts.vue'
      ),
  },
  {
    path: 'liber',
    name: Route.RecepientsLiber,
    component: () =>
      import(
        '@/applications/liber/views/Contacts/childrenviews/PhoneContacts.vue'
      ),
    meta: {
      friends: true,
    },
  },
];
