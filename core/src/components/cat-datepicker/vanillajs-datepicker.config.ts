import { DatepickerType, DatepickerTypeEnum } from './datepicker-type';
import dayjs from './dayjs.config';

const today = () => dayjs().utc().startOf('day').toDate();

const getDefaultDate = (type: DatepickerType, selectedDate?: string): Date => {
  const date = selectedDate ? dayjs(selectedDate).toDate() : today();
  return type === 'week' ? dayjs(date).startOf('isoWeek').toDate() : date;
};

export const getDatepickerOptions = (type: DatepickerType, selectedDate?: string) => {
  const config: any = {
    enableOnReadonly: false,
    pickLevel: DatepickerTypeEnum[type],
    todayButton: true,
    todayButtonMode: 1,
    todayHighlight: true,
    weekStart: 1, // TO-DO get value from browser Intl.Locale().weekInfo api
    language: 'en', // TO-DO get language from browser INTL api
    defaultViewDate: getDefaultDate(type, selectedDate)
  };
  return config;
};
