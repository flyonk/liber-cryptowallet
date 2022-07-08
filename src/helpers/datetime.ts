import { DateTime, Interval } from 'luxon';

export const getRelativeDate = (dateInISO: string): string => {
  const parsedDate = DateTime.fromISO(dateInISO);
  const now = DateTime.now();
  const duration = Interval.fromDateTimes(parsedDate, now).toDuration([
    'days',
    'hours',
    'minutes',
  ]);

  if (duration.days > 10) {
    return parsedDate.toLocaleString(DateTime.DATETIME_MED);
  }

  return <string>now.minus(duration.toObject()).toRelative();
};

//October 10, 1985
export const formatToNormalDate = (dateInISO: string): string => {
  const parsedDate = DateTime.fromISO(dateInISO);

  return parsedDate.toLocaleString(DateTime.DATE_FULL);
};
