import type { NativeSettingsPlugin } from './definitions';

const UNIMPLEMENTED_CODE_ERROR = 'UNIMPLEMENTED';

function SettingsException(message: string, code: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.message = message;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.code = code;
}

export class NativeSettingsWeb implements NativeSettingsPlugin {
  /**
   * Open iOS & Android settings.
   * Not implemented for web!
   */
  async open(): Promise<{ status: boolean }> {
    throw new (SettingsException as any)(
      'Not implemented for web',
      UNIMPLEMENTED_CODE_ERROR
    );
  }

  /**
   * Open android settings.
   * Not implemented for web!
   */
  async openAndroid(): Promise<{ status: boolean }> {
    return new Promise<any>(() => {
      throw new (SettingsException as any)(
        'Not implemented for web',
        UNIMPLEMENTED_CODE_ERROR
      );
    });
  }

  /**
   * Open iOS settings.
   * Not implemented for web!
   */
  async openIOS(): Promise<{ status: boolean }> {
    return new Promise<any>(() => {
      throw new (SettingsException as any)(
        'Not implemented for web',
        UNIMPLEMENTED_CODE_ERROR
      );
    });
  }
}

const NativeSettings = new NativeSettingsWeb();

export { NativeSettings };
