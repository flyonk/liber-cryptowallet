import { IOSSettings, NativeSettings } from 'capacitor-native-settings';

export const openIosAppSettings = async (option = IOSSettings.App) => {
  //TODO only works for IOs, work around when connect Android
  await NativeSettings.openIOS({
    option,
  });
};
