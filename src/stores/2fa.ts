import { defineStore } from 'pinia';
import { generateSecret, generateToken, verifyToken } from 'node-2fa';
import { Storage } from '@capacitor/storage';

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
  },

  actions: {
    generateToken() {
      generateToken(this.secret);
    },

    verify(token: string) {
      return verifyToken(this.secret, token);
    },

    generateSecret() {
      const { secret, uri } = generateSecret({
        name: 'Liber App',
        account: 'Personal',
      });

      this.secret = secret;
      this.uri = uri;

      setSecret(secret);
    },

    async setTwofaDate(): Promise<void> {
      await Storage.set({
        key: EStorageKeys.twofaDate,
        value: String(Date.now()),
      });
    },

    async checkTwofaExpire(): Promise<boolean> {
      const timestamp = Number(
        (await Storage.get({ key: EStorageKeys.twofaDate })).value
      );
      return checkExpiration(timestamp, 14);
    },

    async init() {
      this.secret = await getSecret();
    },
  },
});
