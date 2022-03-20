import { defineStore } from 'pinia';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

import profileService from '@/services/profileService';
import { IProfile } from '@/models/profile/profile';
import { clearAll } from '@/helpers/storage';

import { SStorageKeys } from '@/types/storage';

interface IUserProfile {
  user: IProfile;
}

// === User Profile Store ===

export const useProfileStore = defineStore('profile', {
  state: (): IUserProfile => ({
    user: <IProfile>{},
  }),

  getters: {
    getUser: (state) => state.user,
  },

  actions: {
    async init() {
      this.user = await profileService.getProfile();
      const value = JSON.stringify(this.user);
      //TODO: save to storage - sync after user data editing
      // Use storage servise
      SecureStoragePlugin.set({
        key: SStorageKeys.user,
        value,
      });
    },
    async closeAccount() {
      // TODO Wait for response when API is ready
      profileService.closeProfile();

      await clearAll();
    },
  },
});
