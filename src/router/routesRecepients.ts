import { Route } from './types';

export default [
  {
    path: '',
    name: Route.RecepientsPhone,
    component: () => import('@/views/Contacts/childrenviews/PhoneContacts.vue'),
  },
  {
    path: 'liber',
    name: Route.RecepientsLiber,
    component: () => import('@/views/Contacts/childrenviews/LiberFriends.vue'),
  },
];
