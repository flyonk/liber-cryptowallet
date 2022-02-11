import { BiometryType, NativeBiometric } from "capacitor-native-biometric";

/**
 * Fuction to check support faceId and TouchId
 *
 * @returns {string} allowed values: ['touch-id', 'face-id', '']
 */
export async function getSupportedOptions() {
    const result = await NativeBiometric.isAvailable()
    const biometryType = result.biometryType
    if (biometryType === BiometryType.FACE_ID) {
        return 'face-id'
    }
    if (biometryType === BiometryType.TOUCH_ID) {
        return 'touch-id'
    }
    return ''
}