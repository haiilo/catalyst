import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'cat-date, cat-date-inline',
  host: {
    '(catChange)': 'handleChangeEvent($event.target.value)'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateValueAccessor,
      multi: true
    }
  ]
})
export class DateValueAccessor extends ValueAccessor {
  constructor(el: ElementRef) {
    super(el);
  }
  writeValue(value: any) {
    if (value && value instanceof Date) {
      const year = value.getFullYear();
      const month = (value.getMonth() + 1).toString().padStart(2, '0');
      const day = value.getDate().toString().padStart(2, '0');
      return super.writeValue(`${year}-${month}-${day}`);
    }
    return super.writeValue(undefined);
  }
  handleChangeEvent(value: any) {
    const [match, year, month, day] = value?.match(/^(\d{4})-(\d{2})-(\d{2})/) ?? [];
    return super.handleChangeEvent(match ? new Date(Number(year), Number(month) - 1, Number(day)) : null);
  }
}
