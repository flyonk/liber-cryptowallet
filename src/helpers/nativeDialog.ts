import { Dialog } from '@capacitor/dialog';
import {
  AlertOptions,
  ConfirmOptions,
} from '@capacitor/dialog/dist/esm/definitions';

export const showAlert = async (options: AlertOptions) => {
  await Dialog.alert(options);
};

export const showConfirm = async (options: ConfirmOptions) => {
  try {
    const { value } = await Dialog.confirm(options);

    return value;
  } catch (e) {
    return await Promise.reject();
  }
};
