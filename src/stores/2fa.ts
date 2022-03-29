import { defineStore } from 'pinia';
import { generateSecret, generateToken, verifyToken } from 'node-2fa';
import { Storage } from '@capacitor/storage';

import { useAuthStore } from './auth';
import { checkExpiration } from '@/helpers/2fa';

import { EStorageKeys } from '@/types/storage';

interface I2faState {
  secret: string;
  uri: string;
}

const getSecret = async () => {
  const { value } = await Storage.get({
    key: EStorageKeys.twofa,
  });
  return value || '';
};

async function setSecret(secret: string) {
  await Storage.set({
    key: EStorageKeys.twofa,
    value: secret,
  });
}

// === 2fa Store ===

export const use2faStore = defineStore('2fa', {
  state: (): I2faState => ({
    secret: '',
    uri: '',
  }),

  getters: {
    getSecret: (state) => state.secret,
    getState: (state) => state,
  },

  actions: {
    generateToken() {
      generateToken(this.secret);
    },

    verify(token: string) {
      return verifyToken(this.secret, token);
    },

    async generateSecret() {
      const auth = useAuthStore();
      const { dialCode, phone } = await auth.recoverPhoneFromStorage();
      const account = `Personal${dialCode}${phone}`;
      const { secret, uri } = generateSecret({
        name: 'Liber App',
        account,
      });

      this.secret = secret;
      this.uri = uri;

      setSecret(secret);
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

    async init() {
      this.secret = await getSecret();
    },
  },
});
