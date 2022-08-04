import {
  NativeBiometricPlugin,
  AvailableResult,
  // BiometricOptions,
  // GetCredentialOptions,
  // SetCredentialOptions,
  // DeleteCredentialOptions,
  BiometryType,
  Credentials,
} from './definitions';

class NativeBiometricWeb implements NativeBiometricPlugin {
  async isAvailable(): Promise<AvailableResult> {
    try {
      const isAvailable =
        await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      return {
        isAvailable,
        biometryType: BiometryType.TOUCH_ID,
      };
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }

  // verifyIdentity(_options?: BiometricOptions): Promise<any> {
  verifyIdentity(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  // getCredentials(_options: GetCredentialOptions): Promise<Credentials> {
  getCredentials(): Promise<Credentials> {
    throw new Error('Method not implemented.');
  }
  // setCredentials(_options: SetCredentialOptions): Promise<any> {
  setCredentials(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  // deleteCredentials(_options: DeleteCredentialOptions): Promise<any> {
  deleteCredentials(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

const NativeBiometric = new NativeBiometricWeb();

export { NativeBiometric };
