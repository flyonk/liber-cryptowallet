import { Route } from './types';

export default [
  {
    path: '',
    name: Route.PayRecepientsPhone,
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
