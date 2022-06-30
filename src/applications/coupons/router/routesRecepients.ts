import { CouponRoutes } from '@/applications/coupons/router/types';

export default [
  {
    path: '',
    name: CouponRoutes.RecepientsPhone,
    component: () =>
      import(
        '@/applications/liber/views/Contacts/childrenviews/PhoneContacts.vue'
      ),
  },
  {
    path: 'liber',
    name: CouponRoutes.RecepientsLiber,
    component: () =>
      import(
        '@/applications/liber/views/Contacts/childrenviews/PhoneContacts.vue'
      ),
    meta: {
      friends: true,
    },
  },
];
