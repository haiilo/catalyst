import { Datepicker } from 'vanillajs-datepicker';
import { DatepickerType, DatepickerTypeEnum } from './datepicker-type';
import dayjs, { today } from './dayjs.config';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

const browserLanguage = window?.navigator?.language ?? 'en';

const getDefaultDate = (type: DatepickerType, selectedDate?: string): Date => {
  const date = selectedDate ? dayjs(selectedDate).toDate() : today();
  return type === 'week' ? dayjs(date).startOf('isoWeek').toDate() : date;
};

export function getDatepickerOptions(type: DatepickerType, selectedDate?: string) {
  const config: object = {
    enableOnReadonly: false,
    pickLevel: DatepickerTypeEnum[type],
    todayButton: true,
    todayButtonMode: 1,
    todayHighlight: true,
    weekStart: 1, // TO-DO get value from browser Intl.Locale().weekInfo api which is not supported by Firefox or other browsers
    language: 'browser',
    defaultViewDate: getDefaultDate(type, selectedDate)
  };
  return config;
}

function daysForLocale(weekday: 'long' | 'short' | 'narrow' = 'long') {
  const date = new Date();
  const firstDayOfWeek = new Date(date.setUTCDate(date.getUTCDate() - date.getUTCDay()));
  const format = new Intl.DateTimeFormat(browserLanguage, { weekday }).format;
  return [...Array(7).keys()].map(day => format(firstDayOfWeek.setUTCDate(firstDayOfWeek.getUTCDate() + day)));
}

function monthsForLocale(month: 'long' | 'short' = 'long') {
  const date = new Date();
  const format = new Intl.DateTimeFormat(browserLanguage, { month }).format;
  return [...Array(12).keys()].map(month => format(date.setUTCMonth(month)));
}

if (Datepicker?.locales?.browser) {
  Datepicker.locales.browser = {
    days: daysForLocale('long'),
    daysShort: daysForLocale('short'),
    daysMin: daysForLocale('narrow'),
    months: monthsForLocale('long'),
    monthsShort: monthsForLocale('short'),
    today: i18n.t('input.today')
  };
}

export default Datepicker;
