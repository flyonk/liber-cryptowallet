import { CouponRoutes } from '@/applications/coupons/router/types';

export default [
  {
    path: '',
    name: CouponRoutes.RecipientsPhone,
    component: () =>
      import(
        '@/applications/liber/views/Contacts/childrenviews/PhoneContacts.vue'
      ),
  },
  {
    path: 'liber',
    name: CouponRoutes.RecipientsLiber,
    component: () =>
      import(
        '@/applications/liber/views/Contacts/childrenviews/PhoneContacts.vue'
      ),
    meta: {
      friends: true,
    },
  },
];
