import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

function getDays(language: string, weekday: 'long' | 'short' | 'narrow' = 'long') {
  const date = new Date();
  const firstDayOfWeek = (date.getUTCDate() - date.getUTCDay() + 7) % 7;
  const format = new Intl.DateTimeFormat(language, { weekday }).format;
  return [...Array(7).keys()].map(day => format(new Date(date.getTime()).setUTCDate(firstDayOfWeek + day)));
}

function getMonths(language: string, month: 'long' | 'short' = 'long') {
  const date = new Date(0);
  const format = new Intl.DateTimeFormat(language, { month }).format;
  return [...Array(12).keys()].map(month => format(new Date(date.getTime()).setUTCMonth(month)));
}

function getWeekInfo(language: string) {
  const locale = new Intl.Locale(language);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const weekInfo = (locale as any).getWeekInfo?.() ?? (locale as any).weekInfo;
  return {
    firstDay: weekInfo?.firstDay ?? 1,
    minDays: weekInfo?.minDays ?? 4,
    weekend: weekInfo?.weekend ?? [6, 7]
  };
}

function getFormat(language: string) {
  const format = new Intl.DateTimeFormat(language, { year: 'numeric', month: '2-digit', day: '2-digit' })
    .format(new Date(3456, 10, 22))
    .replace('3456', 'YYYY')
    .replace('56', 'YY')
    .replace('11', 'MM')
    .replace('22', 'DD');
  return /^(YYYY|YY|MM|DD)\W(YYYY|YY|MM|DD)\W(YYYY|YY|MM|DD)$/.test(format) ? format : 'DD-MM-YYYY';
}

export function getLocale(language: string) {
  return {
    prevYear: i18n.t('datepicker.prevYear'),
    nextYear: i18n.t('datepicker.nextYear'),
    prevMonth: i18n.t('datepicker.prevMonth'),
    nextMonth: i18n.t('datepicker.nextMonth'),
    arrowKeys: i18n.t('datepicker.arrowKeys'),
    today: i18n.t('datepicker.today'),
    change: i18n.t('datepicker.change'),
    choose: i18n.t('datepicker.choose'),
    clear: i18n.t('datepicker.clear'),
    formatStr: getFormat(language),
    weekInfo: getWeekInfo(language),
    days: {
      short: getDays(language, 'short'),
      long: getDays(language, 'long')
    },
    months: {
      short: getMonths(language, 'short'),
      long: getMonths(language, 'long')
    },
    now: () => {
      const date = new Date();
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    },
    fromLocalISO: (date?: string | null) => {
      const [match, year, month, day] = date?.match(/^(\d{4})-(\d{2})-(\d{2})/) ?? [];
      return match ? new Date(Number(year), Number(month) - 1, Number(day)) : null;
    },
    toLocalISO: (date: Date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    toLocalStr: (date: Date) =>
      new Intl.DateTimeFormat(language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }).format(date)
  };
}
