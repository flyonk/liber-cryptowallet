import { PushNotifications } from '@capacitor/push-notifications';
import { defineStore } from 'pinia';

import { get, remove, set } from '@/helpers/storage';
import { getPushNotificationsPermission } from '@/helpers/identification';

import { EStorageKeys } from '@/types/storage';

interface IappOptionsState {
  notifictions: boolean | null;
  faceid: boolean | null;
  touchid: boolean | null;
}

const registerNotification = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'denied') {
    await getPushNotificationsPermission();
  }

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  await PushNotifications.register();
};

async function setOptions(value: string, key: EStorageKeys) {
  if (!value) {
    await remove(key);

    return;
  }

  if (value && key === EStorageKeys.notifications) {
    await registerNotification();
  }

  await set({
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
      const notifications = (await get(EStorageKeys.notifications)) || null;
      const faceid = (await get(EStorageKeys.faceid)) || null;
      const touchid = (await get(EStorageKeys.touchid)) || null;
      this.notifictions = notifications === null ? null : !!notifications;
      this.faceid = faceid === null ? null : !!faceid;
      this.touchid = touchid === null ? null : !!touchid;
    },

    async checkPassCode(): Promise<boolean> {
      return (await get(EStorageKeys.passcode)) === 'true';
    },
  },
});
