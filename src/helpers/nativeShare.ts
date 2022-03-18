import { Share } from '@capacitor/share';
import {
  ShareOptions,
  ShareResult,
} from '@capacitor/share/dist/esm/definitions';

export const check = async (): Promise<boolean> => {
  const { value } = await Share.canShare();

  return value;
};

export const share = async (data: ShareOptions): Promise<ShareResult> => {
  return await Share.share(data);
};
