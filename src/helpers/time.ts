import moment from 'moment';

export const timestampToDate = (
  timestamp: string,
  format = 'YYYY.MM.DD HH:MM:SS'
): string => {
  return moment.unix(Number(timestamp)).format(format);
};
