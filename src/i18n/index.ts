import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n';
import { Device } from '@capacitor/device';
import { get } from '@/helpers/storage';

import { EStorageKeys } from '@/types/storage';
import { useErrorsStore } from '@/stores/errors';

import { SUPPORTED_LANGUAGES } from '@/constants';

/**
 * Return messages for each json locale file
 * @returns {LocaleMessages}
 */
function getLocaleMessages(): LocaleMessages<VueMessageType> {
  const locales = require.context('./', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: LocaleMessages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    const locale = matched && matched.length > 1 ? matched[1] : undefined;
    if (locale && SUPPORTED_LANGUAGES.includes(locale)) {
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
});

/**
 * Set global application locale
 * @returns {void}
 */
export const setLocale = async (): Promise<void> => {
  try {
    i18n.global.locale.value =
      (await get(EStorageKeys.language)) ||
      (await Device.getLanguageCode()).value.substr(0, 2);
  } catch (err) {
    const errorsStore = useErrorsStore();

    errorsStore.handle({
      err,
      name: 'src/i18n/index.ts',
      ctx: 'setLocale',
      description: 'Language selection error',
    });
  }
};
