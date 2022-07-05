import { defineStore } from 'pinia';

import liberSaveService from '@/applications/servicesapp/services/service';
import { useErrorsStore } from '@/stores/errors';
import { AxiosError } from 'axios';
// import { ICouponAccount } from '@/applications/coupons/models/account/account';
// import { TTransaction } from '@/models/transaction/transaction';

export interface ILiberSaveStore {
  email: string;
}

export const useLiberSaveStore = defineStore('coupons', {
  state: (): ILiberSaveStore => ({
    email: '',
  }),

  getters: {
    getEmail: (state) => state.email,
  },

  actions: {
    async setEmail(email: string) {
      try {
        this.email = await liberSaveService.checkLiberSaveEmail(email);
        return email;
      } catch (e) {
        const errorsStore = useErrorsStore();
        errorsStore.handle({
          err: e as AxiosError | Error,
          name: 'checkLiberSaveEmail',
          ctx: 'store/libersave',
          description: 'Error on enter liber save account',
          display: false,
        });
      }
    },
  },
});
