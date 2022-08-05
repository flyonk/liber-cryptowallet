import { NativeSettings } from '@/helpers/native-settings/native-settings';

export const openIosAppSettings = async () => {
  //TODO only works for IOs, work around when connect Android
  await NativeSettings.openIOS();
};
