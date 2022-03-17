import { defineStore } from 'pinia';

import profileService from '@/services/profileService';
import { clearAll } from '@/helpers/storage';

export const useProfileStore = defineStore('profile', {
  state: () => ({}),

  getters: {},

  actions: {
    async closeAccount() {
      // TODO Wait for response when API is ready
      profileService.closeProfile();

      await clearAll();
    },
  },
});
