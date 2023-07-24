import { CatDatepickerMode } from './cat-datepicker.mode';

export function getFormat(language: string, mode: CatDatepickerMode): string {
  const date = new Date(2000, 1, 3, 4, 5, 6);
  const formatDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  return mode === 'week'
    ? 'W'
    : new Intl.DateTimeFormat(
        language,
        {
          date: formatDate,
          time: formatTime,
          datetime: { ...formatDate, ...formatTime },
          daterange: formatDate
        }[mode]
      )
        .format(date)
        .replace('2000', 'Y')
        .replace('00', 'y')
        .replace('02', 'm')
        .replace('03', 'd')
        .replace('04', 'H')
        .replace('05', 'i')
        .replace(/AM|PM/i, 'K');
}
