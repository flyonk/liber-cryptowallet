import { Dialog } from '@capacitor/dialog';
import {
  AlertOptions,
  ConfirmOptions,
} from '@capacitor/dialog/dist/esm/definitions';
import { useErrorsStore } from '@/stores/errors';

export const showAlert = async (options: AlertOptions) => {
  await Dialog.alert(options);
};

export const showConfirm = async (options: ConfirmOptions) => {
  try {
    const { value } = await Dialog.confirm(options);

    return value;
  } catch (err) {
    const errorsStore = useErrorsStore();

    errorsStore.handle(
      err,
      'nativeDialog',
      'showConfirm',
      'show confirm form error'
    );
    return false;
  }
};
