import flatpickr from 'flatpickr';
import weekSelectPlugin from 'flatpickr/dist/plugins/weekSelect/weekSelect';
import { CatDatepickerMode } from './cat-datepicker.mode';

export function getConfig(
  options: {
    locale: flatpickr.CustomLocale;
    format: string;
    mode: CatDatepickerMode;
    min: string | undefined;
    max: string | undefined;
    step: number;
    disabled: boolean;
    readonly: boolean;
    applyChange: (value?: string) => void;
  },
  more: flatpickr.Options.Options = {}
): flatpickr.Options.Options {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plugins = options.mode === 'week' ? [new (weekSelectPlugin as any)({})] : [];

  return {
    ...more,
    locale: options.locale,
    plugins,
    altInput: true,
    prevArrow: '←',
    nextArrow: '→',
    dateFormat: dateFormat(options.mode),
    altFormat: options.format,
    ariaDateFormat: options.format,
    mode: options.mode === 'daterange' ? 'range' : 'single',
    minDate: options.min,
    maxDate: options.max,
    enableTime: options.mode === 'time' || options.mode === 'datetime',
    noCalendar: options.mode === 'time',
    weekNumbers: true,
    minuteIncrement: options.step,
    clickOpens: !options.disabled && !options.readonly,
    onChange: (dates, dateStr, flatpickr) => {
      let value = dateStr || undefined;
      if (options.mode === 'week') {
        value = dates[0] ? flatpickr.config.getWeek(dates[0]).toString() : undefined;
      }
      options.applyChange(value);
    }
  };
}

function dateFormat(mode: CatDatepickerMode): string {
  if (mode === 'week') {
    return 'W';
  } else if (mode === 'time') {
    return 'H:i';
  } else {
    return 'Z';
  }
}
