import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n';
import { EStorageKeys } from '@/types/base-component';
import { Device } from '@capacitor/device';
import { Storage } from '@capacitor/storage';

/**
 * Return messages for each json locale file
 * @returns {LocaleMessages}
 */
function getLocaleMessages(): LocaleMessages<VueMessageType> {
  const locales = require.context("./", true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: LocaleMessages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    const locale = matched && matched.length > 1 ? matched[1] : undefined;
    if (locale) {
      messages[locale] = locales(key);
    }
  });
  return <LocaleMessages<VueMessageType>>messages;
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en', // set fallback locale
  messages: getLocaleMessages(), // set locale messages
})

/**
 * Set global application locale
 * @returns {void}
 */
export const setLocale = async (): Promise<void> => {
  try {
    i18n.global.locale.value = (await Storage.get({ key: EStorageKeys.language })).value
      || (await Device.getLanguageCode()).value.substr(0, 2);
  } catch (e) {
    //TODO: Logger err to Sentry
    console.error(e);
  }
};