export enum DatepickerTypeEnum {
  date = 0,
  month = 1,
  year = 2,
  week = 3
}

export type DatepickerType = keyof typeof DatepickerTypeEnum;
