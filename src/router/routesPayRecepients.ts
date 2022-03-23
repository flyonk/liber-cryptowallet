import { Route } from './types';
import checkContactsLoaded from './middleware/checkContacts';

export default [
  {
    path: '',
    name: Route.PayRecepientsPhone,
    beforeEnter: checkContactsLoaded,
    component: () =>
      import('@/views/Contacts/childrenviews/PayPhoneContacts.vue'),
  },
  {
    path: 'liber',
    name: Route.PayRecepientsLiber,
    component: () =>
      import('@/views/Contacts/childrenviews/PayLiberFriends.vue'),
  },
];
