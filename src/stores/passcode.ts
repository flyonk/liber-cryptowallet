import { defineStore } from 'pinia';

import passcodeService, {
  IPasscodeRequestBody,
  IPasscodeUpdateRequestBody,
} from '@/services/passcodeService';

export const usePasscodeStore = defineStore('passcode', {
  getters: {},

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

    async delete() {
      const { message } = await passcodeService.delete();

      return message;
    },
  },
});
