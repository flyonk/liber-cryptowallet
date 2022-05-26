import { BiometryType, NativeBiometric } from 'capacitor-native-biometric';

import { useErrorsStore } from '@/stores/errors';
import { showConfirm } from '@/helpers/nativeDialog';
import { openIosAppSettings } from '@/helpers/settings';

/**
 * Function tries to get permission from native settings
 *
 * @returns {void}
 */
async function _getPermission() {
  const identifier = await getSupportedOptions();

  const textsForIdentifier = {
    'face-id': 'Face ID',
    'touch-id': 'Touch ID',
  };

  const identifierText =
    textsForIdentifier[identifier as 'face-id' | 'touch-id'] ||
    textsForIdentifier['face-id'];

  const approve = await showConfirm({
    title: 'Change settings',
    message: `To enable ${identifierText} please, toggle on Application Settings ${identifierText} option`,
    okButtonTitle: 'Ok',
    cancelButtonTitle: 'Cancel',
  });

  if (approve) {
    //TODO after returning to app click face id toggle again
    await openIosAppSettings();
  }
}

/**
 * Function tries to enable biometrical identification
 *
 * @returns {boolean}
 */
export async function verifyIdentity(): Promise<boolean | undefined> {
  try {
    await NativeBiometric.verifyIdentity();

    return true;
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    if (
      error.errorMessage &&
      error.errorMessage === 'Authentication not available'
    ) {
      await _getPermission();

      return false;
    }
  }
}

/**
 * Function to check support faceId and TouchId
 *
 * @returns {string} allowed values: ['touch-id', 'face-id', '']
 */
export async function getSupportedOptions() {
  try {
    const result = await NativeBiometric.isAvailable();
    const biometryType = result.biometryType;
    if (biometryType === BiometryType.FACE_ID) {
      return 'face-id';
    }
    if (biometryType === BiometryType.TOUCH_ID) {
      return 'touch-id';
    }
    return '';
  } catch (err) {
    const errorsStore = useErrorsStore();

    errorsStore.handle(
      err,
      'identification',
      'getSupportedOptions',
      'error to define native biometrics'
    );

    return '';
  }
}
