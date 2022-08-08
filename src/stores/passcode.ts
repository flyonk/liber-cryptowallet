import { defineStore } from 'pinia';

import passcodeService, {
  IPasscodeRequestBody,
  IPasscodeUpdateRequestBody,
} from '@/services/passcodeService';

interface IPasscodeState {
  successPasscodeToast: boolean;
}

export const usePasscodeStore = defineStore('passcode', {
  state: (): IPasscodeState => ({
    successPasscodeToast: false,
  }),

  getters: {
    getShowPasscodeToast: (state) => state.successPasscodeToast,
  },

  actions: {
    async create(request: IPasscodeRequestBody) {
      const { message } = await passcodeService.create(request);

      return message === 'success';
    },

    async verify(data: IPasscodeRequestBody) {
      const { message } = await passcodeService.verify(data);

      return message === 'success';
    },

    async update(data: IPasscodeUpdateRequestBody) {
      const { message } = await passcodeService.update(data);

      return message === 'success';
    },

    async restore(data: IPasscodeUpdateRequestBody) {
      const { message } = await passcodeService.restore(data);

      return message === 'success';
    },

    async delete() {
      const { message } = await passcodeService.delete();

      return message;
    },

    async toggleSuccessPasscodeToast(value: boolean) {
      this.successPasscodeToast = value;
    },
  },
});
