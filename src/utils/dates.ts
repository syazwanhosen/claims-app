import dayjs from 'dayjs';

export const fmt = (d: string | Date, format = 'YYYY-MM-DD') =>
  dayjs(d).format(format);

export function isIncidentDateValid(d: Date) {
  const date = dayjs(d).startOf('day');
  const min = dayjs().subtract(6, 'month').startOf('day');
  const max = dayjs().add(1, 'day').startOf('day');
  return date.isAfter(min) && date.isBefore(max);
}
