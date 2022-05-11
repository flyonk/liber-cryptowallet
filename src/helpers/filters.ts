import { DateTime } from 'luxon';
import { App } from 'vue';

// Check out about formats here: https://moment.github.io/luxon/#/formatting
export const timestampToDate = (
  timestamp: string,
  format = 'yyyy.LL.dd HH:mm:ss'
) => {
  return DateTime.fromSeconds(Number(timestamp)).toFormat(format);
};

export const string2ISO = (date: string): string => {
  return DateTime.fromFormat(date, 'dd.LL.yyyy').toISO();
};

export const toUpperCase = (string: string): string => {
  if (!string) {
    return '';
  }

  return string.toUpperCase();
};

const filters = { timestampToDate, toUpperCase };

export default {
  install(app: App) {
    app.config.globalProperties.$filters = filters;
  },
};
