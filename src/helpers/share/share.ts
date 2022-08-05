import type {
  CanShareResult,
  ShareOptions,
  SharePlugin,
  ShareResult,
} from './definitions';

const UNIMPLEMENTED_CODE_ERROR = 'UNIMPLEMENTED';

function ShareException(message: string, code: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.message = message;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.code = code;
}

export class ShareWeb implements SharePlugin {
  async canShare(): Promise<CanShareResult> {
    if (typeof navigator === 'undefined' || !navigator.share) {
      return { value: false };
    } else {
      return { value: true };
    }
  }
  async share(options: ShareOptions): Promise<ShareResult> {
    if (typeof navigator === 'undefined' || !navigator.share) {
      throw new (ShareException as any)(
        'Share API not available in this browser',
        UNIMPLEMENTED_CODE_ERROR
      );
    }

    await navigator.share({
      title: options.title,
      text: options.text,
      url: options.url,
    });
    return {};
  }
}

const Share = new ShareWeb();

export { Share };
