import { AfterContentInit, Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateValueAccessor } from '../directives/date-value-accessor';
import { TimeValueAccessor } from '../directives/time-value-accessor';

@Component({
  selector: 'cat-datetime',
  template: '<ng-content></ng-content>',
  styles: ['cat-datetime { display: contents; }'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatetimeComponent,
      multi: true
    }
  ]
})
export class DatetimeComponent implements AfterContentInit, ControlValueAccessor {
  protected lastValue: any;
  protected lastDateValue: any;
  protected lastTimeValue: any;

  @ContentChild(DateValueAccessor) dateInput?: DateValueAccessor;
  @ContentChild(TimeValueAccessor) timeInput?: TimeValueAccessor;

  private _min?: Date | null;
  get min(): Date | null {
    return this._min ?? null;
  }
  @Input() set min(value: Date | null | undefined) {
    this._min = value;
    setTimeout(() => {
      const min = value ? this.toLocalISODate(value) : undefined;
      this.dateInput?.nativeElement.setAttribute('min', min);
      this.limitTime('min');
    });
  }

  private _max?: Date | null;
  get max(): Date | null {
    return this._max ?? null;
  }
  @Input() set max(value: Date | null | undefined) {
    this._max = value;
    setTimeout(() => {
      const max = value ? this.toLocalISODate(value) : undefined;
      this.dateInput?.nativeElement.setAttribute('max', max);
      this.limitTime('max');
    });
  }

  ngAfterContentInit(): void {
    if (!this.dateInput) {
      throw new Error('Missing child element <cat-date></cat-date>');
    }
    if (!this.timeInput) {
      throw new Error('Missing child element <cat-time></cat-time>');
    }
  }

  writeValue(value: any): void {
    this.lastValue = this.lastDateValue = this.lastTimeValue = value;
    setTimeout(() => {
      this.dateInput?.writeValue(value);
      this.timeInput?.writeValue(value);
    });
  }

  registerOnChange(fn: (value: any) => void) {
    setTimeout(() => {
      this.dateInput?.registerOnChange((value: any) => {
        this.lastDateValue = value;
        this.limitTime('min');
        this.limitTime('max');
        fn(this.value);
      });
      this.timeInput?.registerOnChange((value: any) => {
        this.lastTimeValue = value;
        fn(this.value);
      });
    });
  }

  registerOnTouched(fn: () => void) {
    setTimeout(() => {
      this.dateInput?.registerOnTouched(fn);
      this.timeInput?.registerOnTouched(fn);
    });
  }

  setDisabledState?(isDisabled: boolean): void {
    setTimeout(() => {
      this.dateInput?.setDisabledState(isDisabled);
      this.timeInput?.setDisabledState(isDisabled);
    });
  }

  private get value() {
    if (this.lastDateValue && this.lastTimeValue) {
      const result = new Date(this.lastDateValue);
      result.setHours(
        this.lastTimeValue.getHours(),
        this.lastTimeValue.getMinutes(),
        this.lastTimeValue.getSeconds(),
        this.lastTimeValue.getMilliseconds()
      );
      return result;
    }
    return null;
  }

  private limitTime(mode: 'min' | 'max') {
    const limit = mode === 'min' ? this.min : this.max;
    const limitIso = limit ? this.toLocalISODate(limit) : undefined;
    const dateIso = this.lastDateValue ? this.toLocalISODate(this.lastDateValue) : undefined;
    const attr = limit && limitIso === dateIso ? this.toLocalISOTime(limit) : undefined;
    this.timeInput?.nativeElement.setAttribute(mode, attr);
  }

  private toLocalISODate(value: Date) {
    const year = value.getFullYear();
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const day = value.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private toLocalISOTime(value: Date) {
    const hours = value.getHours().toString().padStart(2, '0');
    const mins = value.getMinutes().toString().padStart(2, '0');
    return `${hours}:${mins}`;
  }
}
