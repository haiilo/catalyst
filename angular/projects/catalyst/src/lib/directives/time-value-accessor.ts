import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'cat-time',
  host: {
    '(catChange)': 'handleChangeEvent($event.target.value)'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TimeValueAccessor,
      multi: true
    }
  ]
})
export class TimeValueAccessor extends ValueAccessor {
  constructor(el: ElementRef) {
    super(el);
  }
  get nativeElement() {
    return this.el.nativeElement;
  }
  writeValue(value: any) {
    if (value && value instanceof Date) {
      const hours = value.getHours().toString().padStart(2, '0');
      const mins = value.getMinutes().toString().padStart(2, '0');
      return super.writeValue(`${hours}:${mins}`);
    }
    return super.writeValue(undefined);
  }
  handleChangeEvent(value: any) {
    const [match, hours, mins] = value?.match(/^(\d{2}):(\d{2})/) ?? [];
    if (match) {
      const date = new Date();
      date.setHours(Number(hours), Number(mins), 0, 0);
      return super.handleChangeEvent(date);
    }
    return super.handleChangeEvent(null);
  }
}
