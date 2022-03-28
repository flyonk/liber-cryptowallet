import { defineStore } from 'pinia';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

import profileService from '@/services/profileService';
import { IProfile, TMarketing } from '@/models/profile/profile';
import { clearAll, get, set } from '@/helpers/storage';
import SentryUtil from '@/helpers/sentryUtil';

import { EStorageKeys, SStorageKeys } from '@/types/storage';

interface IUserProfile {
  user: IProfile;
}

// const getKeyValue = <T extends Partial<IProfile>, K extends keyof T>(
//   obj: T,
//   key: K
// ) => obj[key];

// === User Profile Store ===

export const useProfileStore = defineStore('profile', {
  state: (): IUserProfile => ({
    user: <IProfile>{},
  }),

  getters: {
    getUser: (state) => state.user,
    getMarketing: (state) => state.user.marketing,
  },

  actions: {
    async init(): Promise<void> {
      this.user = await this.getUserProfile();
      if (this.user.id) {
        const value = JSON.stringify(this.user);
        //TODO: save to storage - sync after user data editing
        // Use storage servise
        SecureStoragePlugin.set({
          key: SStorageKeys.user,
          value,
        });
      }
    },
    async closeAccount() {
      // TODO Wait for response when API is ready
      profileService.closeProfile();

      await clearAll();
    },

    async getUserProfile(): Promise<IProfile> {
      try {
        return await profileService.getProfile();
      } catch (err) {
        SentryUtil.capture(
          err,
          'getUserProfile',
          'Login3Step',
          "error can't retrieve user data"
        );
        return {} as IProfile;
      }
    },

    async updateUserProfile(data: Partial<IProfile>): Promise<void> {
      try {
        for (const [key, val] of Object.entries(data)) {
          //TODO: fix typescript
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.user[key] = val;
        }
        await profileService.updateProfile(this.user);
      } catch (err) {
        SentryUtil.capture(
          err,
          'updateUserProfile',
          'Signup',
          "error can't update user data"
        );
      }
    },

    async setMarketingToStorage() {
      await set({
        key: EStorageKeys.marketing,
        value: JSON.stringify(this.getMarketing),
      });
    },

    async getMarketingFromStorage(): Promise<TMarketing> {
      const marketing = await get(EStorageKeys.marketing);

      if (marketing !== null) {
        return JSON.parse(marketing);
      }

      return {
        isEmail: false,
        isPushNotification: false,
        isSocialMedia: false,
      };
    },
  },
});
