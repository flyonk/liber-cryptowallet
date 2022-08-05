import {
  getAttestationOptions,
  randomStringFromServer,
} from './server/datafromserver';

import {
  NativeBiometricPlugin,
  AvailableResult,
  BiometryType,
  SetCredentialOptions,
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
    try {
      const id = await get(BIOMETRIC_PUBLIC_KEY_ID);

      if (!id) {
        throw new Error('Method not implemented.');
      }

      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions =
        {
          challenge: new Uint8Array(randomStringFromServer),
          allowCredentials: [
            {
              id: base64ToBuffer(id),
              type: 'public-key',
              transports: ['internal'],
            },
          ],
          userVerification: 'required',
          timeout: 60000,
        };

      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      });

      // @TODO
      // Send assertion to server for verification

      return credential as Credential;
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }

  // async setCredentials(_options: SetCredentialOptions): Promise<any> {
  async setCredentials(options: SetCredentialOptions): Promise<any> {
    try {
      const publicKeyCredential = (await navigator.credentials.create(
        getAttestationOptions(options) as any
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
