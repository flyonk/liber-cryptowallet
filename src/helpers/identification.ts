import { BiometryType, NativeBiometric } from 'capacitor-native-biometric';
import SentryUtil from '@/helpers/sentryUtil';

export function verifyIdentity() {
  return NativeBiometric.verifyIdentity();
}

/**
 * Fuction to check support faceId and TouchId
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
  } catch (error) {
    SentryUtil.capture(
      error,
      'identification',
      'getSupportedOptions',
      'error to define native biometrics'
    );
    return '';
  }
}
