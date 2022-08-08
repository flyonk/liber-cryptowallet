import { Dialog } from '@/helpers/dialog/dialog';
import { AlertOptions, ConfirmOptions } from '@/helpers/dialog/definitions';
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

    errorsStore.handle({
      err,
      name: 'nativeDialog.ts',
      ctx: 'showConfirm',
      description: 'Show confirm form error',
    });
    return false;
  }
};
