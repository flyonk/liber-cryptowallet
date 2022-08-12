import { defineStore } from 'pinia';

import profileService from '@/services/profileService';
import { IProfile, TMarketing } from '@/models/profile/profile';
import { clearAll, get, set } from '@/helpers/storage';
import SentryUtil from '@/helpers/sentryUtil';

import { EStorageKeys } from '@/types/storage';
import { useErrorsStore } from '@/stores/errors';

export interface IUserProfile {
  user: IProfile;
}

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
      const { isPasscodeEnabled } = this.user;

      await set({
        value: isPasscodeEnabled ? 'true' : 'false',
        key: EStorageKeys.passcode,
      });
      if (this.user.id) {
        SentryUtil.setUser();
      }
    },

    async closeAccount(): Promise<void> {
      // TODO Wait for response when API is ready
      profileService.closeProfile();

      await clearAll();
    },

    async getUserProfile(): Promise<IProfile> {
      try {
        return await profileService.getProfile();
      } catch (err) {
        console.error(err);
        const errorsStore = useErrorsStore();

        errorsStore.handle({
          err,
          name: 'profile.ts',
          ctx: 'getUserProfile',
          description: "Error can't retrieve user data",
        });

        return {} as IProfile;
      }
    },

    async updateUserProfile(data: Partial<IProfile>): Promise<void> {
      try {
        for (const [key, val] of Object.entries(data)) {
          this.user[key] = val;
        }
        await profileService.updateProfile(this.user);
      } catch (err) {
        const errorsStore = useErrorsStore();

        errorsStore.handle({
          err,
          name: 'profile.ts',
          ctx: 'updateUserProfile',
          description: "Error can't update user data",
        });
      }
    },

    async setMarketingToStorage(): Promise<void> {
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
