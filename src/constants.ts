// Middleware file to pass constants and env variables to the App
export const STORE_AUTH_KEY = 'liber_auth';
export const BASE_API_URL = process.env.VUE_APP_BASE_API_URL;
export const API_VERSION = process.env.VUE_APP_API_VERSION;
export const CAPACITOR_WEB_ERROR = 'UNIMPLEMENTED';
export const STATIC_BASE_URL = process.env.VUE_APP_STATIC_STORAGE_URL;
// export const AUTH_API_URL = process.env.VUE_APP_AUTH_URL;
// export const PROFILE_API_URL = process.env.VUE_APP_PROFILE_URL;
export const COUPONS_ENABLED = !!process.env.VUE_APP_COUPONS_ENABLED;
export const LOANS_ENABLED = process.env.VUE_APP_LOANS_ENABLED === 'true';
export const CRYPTO_CURRENCIES_ENABLED =
  process.env.VUE_APP_CRYPTO_CURRENCIES_ENABLED === 'true';
export const FIAT_ENABLED = process.env.VUE_APP_FIAT_ENABLED === 'true';
export const MULTI_LANGUAGE = process.env.VUE_APP_MULTI_LANGUAGE === 'true';
export const TRANSACTIONS_ENABLED =
  process.env.VUE_APP_TRANSACTIONS_FOR_NOT_VERIFIED_USERS === 'true';
export const SUPPORT_EMAIL = process.env.VUE_APP_SUPPORT_EMAIL;

let _langs = process.env.VUE_APP_SUPPORTED_LANGUAGES;
if (_langs) {
  _langs = _langs.replaceAll(' ', '').split(',');
}

export const SUPPORTED_LANGUAGES = _langs || [];
