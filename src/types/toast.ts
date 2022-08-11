import { LocaleMessageValue, VueMessageType } from 'vue-i18n';

export interface IToast {
  severity: EToastSeverity;
  title: string | LocaleMessageValue<VueMessageType>;
  description: string | LocaleMessageValue<VueMessageType>;
  additionalContent?: object;
}

export enum EToastSeverity {
  warning = 'warning',
  error = 'error',
  success = 'success',
}
