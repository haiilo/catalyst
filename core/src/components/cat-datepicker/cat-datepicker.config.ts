import flatpickr from 'flatpickr';
import weekSelectPlugin from 'flatpickr/dist/plugins/weekSelect/weekSelect';
import { CatDatepickerMode } from './cat-datepicker.mode';
import { Hook } from 'flatpickr/dist/types/options';

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
    nativePickerAttributes: { [key: string]: string };
    applyChange: (value?: string) => void;
    appendTo?: HTMLElement | undefined;
    position?: (instance: flatpickr.Instance, positionElement: HTMLElement | undefined) => void;
    onReady?: Hook;
  },
  more: flatpickr.Options.Options = {}
): flatpickr.Options.Options {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plugins = options.mode === 'week' ? [new (weekSelectPlugin as any)({})] : [];
  const format = dateFormat(options.mode);

  return {
    ...more,
    locale: options.locale,
    plugins,
    allowInput: true,
    altInput: true,
    prevArrow: '←',
    nextArrow: '→',
    dateFormat: format,
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
    appendTo: options.appendTo,
    // flatpickr has open bug about incorrect positioning when appendTo is used,
    // we have to use custom logic to calculate position
    // https://github.com/flatpickr/flatpickr/issues/1619
    position: options.appendTo && options.position ? options.position : 'auto',
    onReady: (_dates, _dateStr, flatpickr) => {
      for (const key in options.nativePickerAttributes) {
        const value = options.nativePickerAttributes[key];
        flatpickr.calendarContainer.setAttribute(key, value);
      }
      if (options.appendTo && typeof options.onReady === 'function') {
        options.onReady(_dates, _dateStr, flatpickr);
      }
    },
    onClose: function (dates, _dateStr, instance) {
      if (options.mode === 'daterange' && dates.length < 2) {
        instance.clear();
      }
    },
    onChange: (dates, dateStr, flatpickr) => {
      let value = dateStr || undefined;
      if (options.mode === 'daterange') {
        if (dates.length < 2) {
          return;
        } else {
          const start = dates[0];
          const end = dates[1];
          end.setHours(23);
          end.setMinutes(59);
          end.setSeconds(59);
          value = `${flatpickr.formatDate(start, format)} - ${flatpickr.formatDate(end, format)}`;
        }
      } else if (options.mode === 'week') {
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
