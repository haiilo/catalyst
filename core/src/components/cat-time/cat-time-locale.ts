import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

export function getHour12(language: string): boolean {
  const dateStr = new Intl.DateTimeFormat(language, { hour: '2-digit', minute: '2-digit' })
    .format(new Date())
    .toLowerCase();
  return dateStr.includes('am') || dateStr.includes('pm');
}

export function getLocale(language: string) {
  return {
    change: i18n.t('timepicker.change'),
    choose: i18n.t('timepicker.choose'),
    timeFormat: getHour12(language) ? '12' : '24'
  };
}

export function formatIso(date: Date) {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}
