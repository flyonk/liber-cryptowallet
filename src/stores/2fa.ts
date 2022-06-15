import { defineStore } from 'pinia';
import { Storage } from '@capacitor/storage';
import profileService from '@/applications/liber/services/profileService';

import { checkExpiration } from '@/helpers/2fa';

import { EStorageKeys } from '@/types/storage';

interface I2faState {
  secret: string;
  url: string;
}

// === 2fa Store ===

export const use2faStore = defineStore('2fa', {
  state: (): I2faState => ({
    secret: '',
    url: '',
  }),

  getters: {
    getSecret: (state) => state.secret,
    getState: (state) => state,
  },

  actions: {
    async confirmVerification(code: string) {
      return await profileService.confirmVerificationApp({
        secret: this.secret,
        code,
      });
    },

    async verify(code: string) {
      const result = await profileService.verificationByApp({ code });
      return result;
    },

    async disable(code = '') {
      const result = await profileService.disableVerificationApp({ code });
      return result;
    },

    async generateSecret() {
      const { secret, url } = await profileService.enableVerificationByApp();
      this.secret = secret;
      this.url = url;

      return {
        secret,
        url,
      };
    },

    async set2FADate(): Promise<void> {
      await Storage.set({
        key: EStorageKeys.twofaDate,
        value: String(Date.now()),
      });
    },

    async check2FAExpire(): Promise<boolean> {
      const timestamp = Number(
        (await Storage.get({ key: EStorageKeys.twofaDate })).value
      );
      /*
       * Return true if expired
       */
      return checkExpiration(timestamp, 3);
    },
  },
});
