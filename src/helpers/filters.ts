import { DateTime } from 'luxon';
import { App } from 'vue';

// Check out about formats here: https://moment.github.io/luxon/#/formatting
export const timestampToDate = (
  timestamp: string,
  format = 'yyyy.LL.dd HH:mm:ss'
) => {
  return DateTime.fromSeconds(Number(timestamp)).toFormat(format);
};

const filters = { timestampToDate };

export default {
  install(app: App) {
    app.config.globalProperties.$filters = filters;
  },
};
