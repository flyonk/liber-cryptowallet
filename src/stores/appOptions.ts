import { PushNotifications } from '@capacitor/push-notifications';
import { Storage } from '@capacitor/storage';
import { defineStore } from 'pinia';

import { get } from '@/helpers/storage';

import { EStorageKeys } from '@/types/storage';

interface IappOptionsState {
  notifictions: boolean | null;
  faceid: boolean | null;
  touchid: boolean | null;
}

const registerNotification = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  await PushNotifications.register();
};

const getStoredOption = async (key: EStorageKeys) => {
  const { value } = await Storage.get({
    key,
  });
  return value || null;
};

async function setOptions(value: string, key: EStorageKeys) {
  if (value && key === EStorageKeys.notifications) {
    await registerNotification();
  }
  await Storage.set({
    key,
    value,
  });
}

// === Options Store ===

export const useAppOptionsStore = defineStore('appOptions', {
  state: (): IappOptionsState => ({
    notifictions: null,
    faceid: null,
    touchid: null,
  }),

  getters: {
    isItFirstRun: (state) => {
      const notificationsSet = state.notifictions === null;
      const touchidSet = state.touchid === null;
      const faceidSet = state.touchid === null;
      return notificationsSet && faceidSet && touchidSet;
    },
    getOptions: (state) => state,
  },

  actions: {
    setOptions,
    async init() {
      const notifications = await getStoredOption(EStorageKeys.notifications);
      const faceid = await getStoredOption(EStorageKeys.faceid);
      const touchid = await getStoredOption(EStorageKeys.touchid);
      this.notifictions = notifications === null ? null : !!notifications;
      this.faceid = faceid === null ? null : !!faceid;
      this.touchid = touchid === null ? null : !!touchid;
    },

    async checkPassCode(): Promise<boolean> {
      return (await get(EStorageKeys.passcode)) === 'true';
    },
  },
});
