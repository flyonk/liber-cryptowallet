import type { ClipboardPlugin, ReadResult, WriteOptions } from './definitions';

declare global {
  interface Clipboard {
    read(): Promise<any>;
    write(data: any[]): Promise<any>;
  }
}

declare let ClipboardItem: any;

const UNIMPLEMENTED_CODE_ERROR = 'UNIMPLEMENTED';

function ClipboardException(message: string, code: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.message = message;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.code = code;
}

export class ClipboardWeb implements ClipboardPlugin {
  async write(options: WriteOptions): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      throw new (ClipboardException as any)(
        'Clipboard API not available in this browser',
        UNIMPLEMENTED_CODE_ERROR
      );
    }

    if (options.string !== undefined) {
      await this.writeText(options.string);
    } else if (options.url) {
      await this.writeText(options.url);
    } else if (options.image) {
      if (typeof ClipboardItem !== 'undefined') {
        try {
          const blob = await (await fetch(options.image)).blob();
          const clipboardItemInput = new ClipboardItem({ [blob.type]: blob });
          await navigator.clipboard.write([clipboardItemInput]);
        } catch (err) {
          throw new Error('Failed to write image');
        }
      } else {
        throw new (ClipboardException as any)(
          'Writing images to the clipboard is not supported in this browser',
          UNIMPLEMENTED_CODE_ERROR
        );
      }
    } else {
      throw new Error('Nothing to write');
    }
  }

  async read(): Promise<ReadResult> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      throw new (ClipboardException as any)(
        'Clipboard API not available in this browser',
        UNIMPLEMENTED_CODE_ERROR
      );
    }

    if (typeof ClipboardItem !== 'undefined') {
      try {
        const clipboardItems = await navigator.clipboard.read();
        const type = clipboardItems[0].types[0];
        const clipboardBlob = await clipboardItems[0].getType(type);
        const data = await this._getBlobData(clipboardBlob, type);
        return { value: data, type };
      } catch (err) {
        return this.readText();
      }
    } else {
      return this.readText();
    }
  }

  private async readText() {
    if (
      typeof navigator === 'undefined' ||
      !navigator.clipboard ||
      !navigator.clipboard.readText
    ) {
      throw new (ClipboardException as any)(
        'Reading from clipboard not supported in this browser',
        UNIMPLEMENTED_CODE_ERROR
      );
    }

    const text = await navigator.clipboard.readText();
    return { value: text, type: 'text/plain' };
  }

  private async writeText(text: string) {
    if (
      typeof navigator === 'undefined' ||
      !navigator.clipboard ||
      !navigator.clipboard.writeText
    ) {
      throw new (ClipboardException as any)(
        'Writting to clipboard not supported in this browser',
        UNIMPLEMENTED_CODE_ERROR
      );
    }

    await navigator.clipboard.writeText(text);
  }

  private _getBlobData(clipboardBlob: Blob, type: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      if (type.includes('image')) {
        reader.readAsDataURL(clipboardBlob);
      } else {
        reader.readAsText(clipboardBlob);
      }
      reader.onloadend = () => {
        const r = reader.result as string;
        resolve(r);
      };
      reader.onerror = (e) => {
        reject(e);
      };
    });
  }
}

const Clipboard = new ClipboardWeb();

export { Clipboard };
