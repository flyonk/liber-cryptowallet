import { getAttestationOptions } from './server/datafromserver';

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

import { set } from '@/helpers/storage';

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
    // navigator.credentials.get()
    throw new Error('Method not implemented.');
  }

  // async setCredentials(_options: SetCredentialOptions): Promise<any> {
  async setCredentials(): Promise<any> {
    try {
      const publicKeyCredential = await navigator.credentials.create(
        getAttestationOptions as any
      );

      // @TODO save to server
      set({
        key: 'BIOMETRIC_PUBLIC_KEY_ID',
        value: publicKeyCredential?.id as string,
      });

      return publicKeyCredential;
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  // deleteCredentials(_options: DeleteCredentialOptions): Promise<any> {
  deleteCredentials(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

const NativeBiometric = new NativeBiometricWeb();

export { NativeBiometric };
