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
  const formatDate = DateTime.fromJSDate(
    new Date(date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$2.$1.$3'))
  ).toFormat('yyyy.LL.dd HH:mm:ss');
  return DateTime.fromFormat(formatDate, 'yyyy.LL.dd HH:mm:ss').toISO();
};

const filters = { timestampToDate };

export default {
  install(app: App) {
    app.config.globalProperties.$filters = filters;
  },
};
