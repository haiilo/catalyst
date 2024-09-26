import flatpickr from 'flatpickr';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

export function getHour12(language: string): boolean {
  const dateStr = new Intl.DateTimeFormat(language, { hour: '2-digit', minute: '2-digit' })
    .format(new Date())
    .toLowerCase();
  return dateStr.includes('am') || dateStr.includes('pm');
}

function getFirstDayOfWeek(language: string): number {
  const locale = new Intl.Locale(language);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const weekInfo = (locale as any).getWeekInfo?.() ?? (locale as any).weekInfo;
  return weekInfo?.firstDay ?? 1;
}

function daysForLocale(language: string, weekday: 'long' | 'short' | 'narrow' = 'long') {
  const date = new Date();
  const firstDayOfWeek = (date.getUTCDate() - date.getUTCDay() + 7) % 7;
  const format = new Intl.DateTimeFormat(language, { weekday }).format;
  return [...Array(7).keys()].map(day => format(new Date(date.getTime()).setUTCDate(firstDayOfWeek + day)));
}

function monthsForLocale(language: string, month: 'long' | 'short' = 'long') {
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(i);
    return date.toLocaleString(language, { month: month });
  });
}

export function getLocale(language: string): flatpickr.CustomLocale {
  return {
    firstDayOfWeek: getFirstDayOfWeek(language),
    rangeSeparator: ' - ',
    weekAbbreviation: '',
    yearAriaLabel: i18n.t('datepicker.year'),
    monthAriaLabel: i18n.t('datepicker.month'),
    hourAriaLabel: i18n.t('datepicker.hour'),
    minuteAriaLabel: i18n.t('datepicker.minute'),
    toggleTitle: i18n.t('datepicker.toggle'),
    scrollTitle: i18n.t('datepicker.scroll'),
    time_24hr: !getHour12(language),
    weekdays: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      shorthand: daysForLocale(language, 'short') as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      longhand: daysForLocale(language, 'long') as any
    },
    months: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      shorthand: monthsForLocale(language, 'short') as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      longhand: monthsForLocale(language, 'long') as any
    }
  };
}
