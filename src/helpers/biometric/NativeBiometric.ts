import { getAttestationOptions } from './server/datafromserver';

import {
  NativeBiometricPlugin,
  AvailableResult,
  // BiometricOptions,
  // SetCredentialOptions,
  // DeleteCredentialOptions,
  BiometryType,
} from './definitions';

import { set, get } from '@/helpers/storage';

const BIOMETRIC_PUBLIC_KEY_ID = 'BIOMETRIC_PUBLIC_KEY_ID';

const bufferToBase64 = (buffer: any) =>
  btoa(String.fromCharCode(...new Uint8Array(buffer)));
const base64ToBuffer = (base64: any) =>
  Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

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
  async getCredentials(): Promise<Credential> {
    // navigator.credentials.get()
    try {
      const id = await get(BIOMETRIC_PUBLIC_KEY_ID);

      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions =
        {
          challenge: new Uint8Array([
            220, 39, 125, 203, 142, 208, 157, 184, 138, 8, 138, 16, 96, 33, 162,
            245, 83, 135, 27, 147, 52, 21, 222, 160, 254, 112, 91, 86, 225, 68,
            94, 182,
          ]),
          allowCredentials: [
            {
              id: base64ToBuffer(id),
              type: 'public-key',
              transports: ['internal'],
            },
          ],
          timeout: 60000,
        };

      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      });

      return credential as Credential;
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }

  // async setCredentials(_options: SetCredentialOptions): Promise<any> {
  async setCredentials(): Promise<any> {
    try {
      const publicKeyCredential = (await navigator.credentials.create(
        getAttestationOptions as any
      )) as PublicKeyCredential;

      // @TODO save to server
      const credentialId = bufferToBase64(publicKeyCredential?.rawId);

      set({
        key: BIOMETRIC_PUBLIC_KEY_ID,
        value: credentialId,
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
