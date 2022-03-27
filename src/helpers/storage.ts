import { Storage } from '@capacitor/storage';
import {
  KeysResult,
  SetOptions,
} from '@capacitor/storage/dist/esm/definitions';

export const set = async (data: SetOptions) => {
  await Storage.set(data);
};

//FIXME: Storage.get Returns null as a string
export const get = async (key: string): Promise<string | null> => {
  const { value } = await Storage.get({ key });
  return value;
};

export const remove = async (key: string): Promise<void> => {
  await Storage.remove({ key });
};

export const clearAll = async (): Promise<void> => {
  await Storage.clear();
};

export const keys = async (): Promise<KeysResult> => {
  return await Storage.keys();
};
