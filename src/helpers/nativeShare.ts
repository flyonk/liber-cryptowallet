import { Share } from '@/helpers/share/share';
import { ShareOptions, ShareResult } from '@/helpers/share/definitions';

export const check = async (): Promise<boolean> => {
  const { value } = await Share.canShare();

  return value;
};

export const share = async (data: ShareOptions): Promise<ShareResult> => {
  return await Share.share(data);
};
