import { IOSSettings, NativeSettings } from 'capacitor-native-settings';

export const openIosAppSettings = async () => {
  //TODO only works for IOs, work around when connect Android
  await NativeSettings.openIOS({
    option: IOSSettings.App,
  });
};
