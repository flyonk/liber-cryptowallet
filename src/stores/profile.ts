import { defineStore } from 'pinia';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

import { use2faStore } from '@/stores/2fa';
import profileService from '@/services/profileService';
import { IProfile, TMarketing } from '@/models/profile/profile';
import { clearAll, get, set } from '@/helpers/storage';
import SentryUtil from '@/helpers/sentryUtil';

import { EStorageKeys, SStorageKeys } from '@/types/storage';
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
      if (this.user.id) {
        this.syncUserDataInStorage();
        SentryUtil.setUser();
      }
    },

    syncUserDataInStorage(): void {
      const value = JSON.stringify(this.user);
      SecureStoragePlugin.set({
        key: SStorageKeys.user,
        value,
      });
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
        const errorsStore = useErrorsStore();

        errorsStore.handle(
          err,
          'profile.ts',
          'getUserProfile',
          "error can't retrieve user data"
        );

        return {} as IProfile;
      }
    },

    async updateUserProfile(data: Partial<IProfile>): Promise<void> {
      try {
        for (const [key, val] of Object.entries(data)) {
          this.user[key] = val;
        }
        await profileService.updateProfile(this.user);
        this.syncUserDataInStorage();
      } catch (err) {
        const errorsStore = useErrorsStore();

        errorsStore.handle(
          err,
          'profile.ts',
          'updateUserProfile',
          "error can't update user data"
        );
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

    //TODO: temporary solution until backend twoFA not implemented
    async setTwoFASecret(secret: string): Promise<void> {
      const twoFAStore = use2faStore();
      twoFAStore.secret = secret;
      await set({ key: EStorageKeys.twofa, value: secret });
    },
  },
});
