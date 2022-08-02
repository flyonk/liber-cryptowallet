import {
  NativeBiometricPlugin,
  AvailableResult,
  // BiometricOptions,
  // GetCredentialOptions,
  // SetCredentialOptions,
  // DeleteCredentialOptions,
  Credentials,
} from './definitions';

class NativeBiometricWeb implements NativeBiometricPlugin {
  isAvailable(): Promise<AvailableResult> {
    throw new Error('Method not implemented.');
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
