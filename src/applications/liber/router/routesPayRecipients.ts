import { Route } from '@/router/types';
import checkContactsLoaded from '@/router/middleware/checkContacts';

export default [
  {
    path: '',
    name: Route.PayRecipientsPhone,
    beforeEnter: checkContactsLoaded,
    component: () =>
      import(
        '@/applications/liber/views/Contacts/childrenviews/PayPhoneContacts.vue'
      ),
  },
  {
    path: 'liber',
    name: Route.PayRecipientsLiber,
    component: () =>
      import(
        '@/applications/liber/views/Contacts/childrenviews/PayPhoneContacts.vue'
      ),
    meta: {
      friends: true,
    },
  },
];
