import { DateTime } from 'luxon';

// Check out about formats here: https://moment.github.io/luxon/#/formatting
export const timestampToDate = (
  timestamp: string,
  format = 'yyyy.LL.dd HH:mm:ss'
) => {
  return DateTime.fromSeconds(Number(timestamp)).toFormat(format);
};
