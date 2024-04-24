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
  get nativeElement() {
    return this.el.nativeElement;
  }
  writeValue(value: any) {
    if (!this.el.nativeElement.range) {
      return super.writeValue(this.toISO(value));
    } else if (value instanceof Array) {
      const data = [this.toISO(value[0]), this.toISO(value[1])];
      return super.writeValue(JSON.stringify(data));
    }
    return super.writeValue(undefined);
  }
  handleChangeEvent(value: any) {
    if (!this.el.nativeElement.range) {
      return super.handleChangeEvent(this.toDate(value));
    } else if (typeof value === 'string') {
      return super.handleChangeEvent(JSON.parse(value).map(this.toDate));
    }
    super.handleChangeEvent(null);
  }
  private toISO(value: any) {
    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = (value.getMonth() + 1).toString().padStart(2, '0');
      const day = value.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return undefined;
  }
  private toDate(value: any) {
    const [match, year, month, day] = value?.match(/^(\d{4})-(\d{2})-(\d{2})/) ?? [];
    return match ? new Date(Number(year), Number(month) - 1, Number(day)) : null;
  }
}
