import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, h } from '@stencil/core';
import log from 'loglevel';
import { ErrorMap } from '../cat-form-hint/cat-form-hint';
import { DatepickerType } from './datepicker-type';
import dayjs from './dayjs.config';
import Datepicker, { getDatepickerOptions } from './vanillajs-datepicker.config';

/**
 * Inputs are used to allow users to provide text input when the expected input
 * is short. As well as plain text, Input supports various types of text,
 * including passwords and numbers.
 *
 * @slot hint - Optional hint element to be displayed with the input.
 * @slot label - The slotted label. If both the label property and the label slot are present, only the label slot will be displayed.
 * @part label - The label content.
 */
@Component({
  tag: 'cat-datepicker',
  styleUrl: 'cat-datepicker.scss',
  shadow: true
})
export class CatDatepicker {
  private input!: HTMLInputElement;
  private catInput!: HTMLCatInputElement;
  private datepicker!: any;

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  @State() hasSlottedHint = false;

  /**
   * Whether the label need a marker to shown if the input is required or optional.
   */
  @Prop() requiredMarker: 'none' | 'required' | 'optional' | 'none!' | 'optional!' | 'required!' = 'optional';

  /**
   * Whether the label is on top or left.
   */
  @Prop() horizontal = false;

  /**
   * Hint for form autofill feature.
   */
  @Prop() autoComplete?: string;

  /**
   * Whether the input should show a clear button.
   */
  @Prop() clearable = false;

  /**
   * Whether the input is disabled.
   */
  @Prop() disabled = false;

  /**
   * Optional hint text(s) to be displayed with the input.
   */
  @Prop() hint?: string | string[];

  /**
   * The name of an icon to be displayed in the input.
   */
  @Prop() icon?: string;

  /**
   * Display the icon on the left.
   */
  @Prop() iconLeft = false;

  /**
   * A unique identifier for the input.
   */
  @Prop() identifier?: string;

  /**
   * The label for the input.
   */
  @Prop() label = '';

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * A maximum value for date, time and numeric values.
   */
  @Prop() max?: number | string;

  /**
   * A minimum value for date, time and numeric values.
   */
  @Prop() min?: number | string;

  /**
   * The name of the form control. Submitted with the form as part of a name/value pair.
   */
  @Prop() name?: string;

  /**
   * The placeholder text to display within the input.
   */
  @Prop() placeholder?: string;

  /**
   * A textual prefix to be displayed in the input.
   */
  @Prop() textPrefix?: string;

  /**
   * A textual suffix to be displayed in the input.
   */
  @Prop() textSuffix?: string;

  /**
   * The value is not editable.
   */
  @Prop() readonly = false;

  /**
   * A value is required or must be check for the form to be submittable.
   */
  @Prop() required = false;

  /**
   * The date format after picker selection.
   */
  @Prop() format = 'mm/dd/yyyy';

  /**
   * Whether the picker should show the week numbers.
   */
  @Prop() weekNumbers = true;

  /**
   * Type of datepicker ('date', 'week', 'month', 'year').
   */
  @Prop() type: DatepickerType = 'date';

  /**
   * Dates that should be disabled inside the picker
   */
  @Prop() datesDisabled!: Array<Date> | Array<string>;

  /**
   * The value of the control.
   */
  @Prop({ mutable: true }) value?: string;

  /**
   * The validation errors for this input. Will render a hint under the input
   * with the translated error message(s) `error.${key}`. If an object is
   * passed, the keys will be used as error keys and the values translation
   * parameters.
   * If the value is `true`, the input will be marked as invalid without any
   * hints under the input.
   */
  @Prop() errors?: boolean | string[] | ErrorMap;

  /**
   * Fine-grained control over when the errors are shown. Can be `false` to
   * never show errors, `true` to show errors on blur, or a number to show
   * errors on change with the given delay in milliseconds.
   */
  @Prop() errorUpdate: boolean | number = 0;

  /**
   * Attributes that will be added to the native HTML input element.
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  /**
   * Emitted when the value is changed.
   */
  @Event() catChange!: EventEmitter<InputEvent>;

  /**
   * Emitted when the input received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  /**
   * Programmatically move focus to the input. Use this method instead of
   * `input.focus()`.
   *
   * @param options An optional object providing options to control aspects of
   * the focusing process.
   */
  @Method()
  async doFocus(options?: FocusOptions): Promise<void> {
    this.input.focus(options);
  }

  /**
   * Programmatically remove focus from the input. Use this method instead of
   * `input.blur()`.
   */
  @Method()
  async doBlur(): Promise<void> {
    this.input.blur();
  }

  /**
   * Programmatically simulate a click on the input.
   */
  @Method()
  async doClick(): Promise<void> {
    this.input.click();
  }

  /**
   * Clear the input.
   */
  @Method()
  async clear(): Promise<void> {
    this.value = '';
  }

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
  }

  render() {
    return (
      <Host>
        <cat-input
          ref={el => (this.catInput = el as HTMLCatInputElement)}
          requiredMarker={this.requiredMarker}
          horizontal={this.horizontal}
          autoComplete={this.autoComplete}
          clearable={this.clearable}
          disabled={this.disabled}
          hint={this.hint}
          icon={this.icon}
          iconRight={!this.iconLeft}
          identifier={this.identifier}
          label={this.label}
          labelHidden={this.labelHidden}
          name={this.name}
          placeholder={this.placeholder}
          textPrefix={this.textPrefix}
          textSuffix={this.textSuffix}
          readonly={this.readonly}
          required={this.required}
          value={this.value}
          errors={this.errors}
          errorUpdate={this.errorUpdate}
          nativeAttributes={this.nativeAttributes}
          onCatChange={event => this.onCatChange(event)}
          onCatFocus={event => this.onCatFocus(event.detail)}
          onCatBlur={event => this.onCatBlur(event.detail)}
        >
          {this.hasSlottedLabel && (
            <span slot="label">
              <slot name="label"></slot>
            </span>
          )}
          {this.hasSlottedHint && (
            <span slot="hint">
              <slot name="hint"></slot>
            </span>
          )}
        </cat-input>
      </Host>
    );
  }

  componentDidLoad() {
    if (this.hostElement) {
      const inputWrapper = this.catInput.shadowRoot?.querySelector('.input-wrapper') as HTMLElement;
      const inputElement = inputWrapper.querySelector('input');

      if (inputElement) {
        this.input = inputElement;
      } else {
        log.error('[CatInput] Missing input element', this);
        return;
      }

      this.datepicker = new Datepicker(inputElement, {
        ...getDatepickerOptions(this.type, this.value),
        container: inputWrapper,
        maxDate: this.max,
        minDate: this.min,
        datesDisabled: this.datesDisabled,
        prevArrow: '←',
        nextArrow: '→',
        weekNumbers: this.weekNumbers ? 1 : 0,
        format: {
          toValue: (dateStr: string | Date | number): Date =>
            this.type === 'week' ? this.fromISOWeek(dateStr) : Datepicker.parseDate(dateStr, this.dateFormat),
          toDisplay: (date: Date): string =>
            this.type === 'week' ? this.toISOWeek(date).toString() : Datepicker.formatDate(date, this.dateFormat)
        },
        beforeShowDay: (date: Date) => (this.shouldHighlightAsToday(date) ? 'today' : null),
        beforeShowMonth: (date: Date) => (this.shouldHighlightAsToday(date) ? 'today' : null),
        beforeShowYear: (date: Date) => (this.shouldHighlightAsToday(date) ? 'today' : null)
      });

      if (this.type === 'week') {
        this.datepicker.pickerElement.classList.add('weekly');
      }

      this.input.addEventListener('show', this.handleWeekDays.bind(this));
      this.input.addEventListener('changeDate', this.handleDateChange.bind(this) as EventListener);
      this.input.addEventListener('changeMonth', this.handleWeekDays.bind(this));
      this.input.addEventListener('changeView', this.handleWeekDays.bind(this));
      this.input.addEventListener('keydown', this.focusAllWeekDays.bind(this));
    }
  }

  disconnectedCallback() {
    this.input.removeEventListener('show', this.handleWeekDays.bind(this));
    this.input.removeEventListener('changeDate', this.handleDateChange.bind(this) as EventListener);
    this.input.removeEventListener('changeMonth', this.handleWeekDays.bind(this));
    this.input.removeEventListener('changeView', this.handleWeekDays.bind(this));
    this.input.removeEventListener('keydown', this.focusAllWeekDays.bind(this));
  }

  private handleDateChange(event: CustomEvent) {
    this.selectAllWeekDays(event.detail.date);
    this.value = this.input.value;
    this.catChange.emit();
  }

  private handleWeekDays(event: Event | Date) {
    this.selectAllWeekDays(event);
    this.focusAllWeekDays();
  }

  private selectAllWeekDays(event: Event | Date) {
    const date = event instanceof Date ? event : (event as CustomEvent).detail?.date;
    if (this.type !== 'week') {
      return;
    }
    if (this.input?.value) {
      const firstDayOfWeek = dayjs(date).startOf('isoWeek');

      if (!firstDayOfWeek.isSame(dayjs(date).startOf('day'))) {
        this.datepicker.setDate(firstDayOfWeek.toDate());
      } else {
        this.addClassToAllWeekDays('selected');
      }
    }
  }

  private focusAllWeekDays() {
    const date = dayjs(this.datepicker.picker.viewDate);
    if (this.type !== 'week' || !date) {
      return;
    }

    const firstDayOfWeek = dayjs(date).startOf('isoWeek');

    if (!firstDayOfWeek.isSame(dayjs(date).startOf('day'))) {
      this.datepicker.setFocusedDate(firstDayOfWeek.toDate());
    }

    this.addClassToAllWeekDays('focused');
  }

  private addClassToAllWeekDays(className: string) {
    let weekdaysCount = 7;
    const pickerElement = this.datepicker.pickerElement as HTMLElement;
    let selected = pickerElement.querySelector(`.datepicker-cell:not(.month):not(.year).${className}`);
    while (weekdaysCount > 1) {
      if (selected) {
        selected = selected.nextElementSibling;
        selected?.classList.add(className);
        weekdaysCount--;
      } else {
        break;
      }
    }
  }

  private onCatChange(event: unknown) {
    this.value = this.input.value;
    this.catChange.emit(event as InputEvent);
  }

  private onCatFocus(event: FocusEvent) {
    this.catFocus.emit(event);
  }

  private onCatBlur(event: FocusEvent) {
    this.catBlur.emit(event);
  }

  private shouldHighlightAsToday(date: Date) {
    const now = new Date();
    const isSameYear = now.getFullYear() === date.getFullYear();
    const isSameMonth = now.getMonth() === date.getMonth();
    const isSameDay = now.getDate() === date.getDate();
    switch (this.type) {
      case 'date':
        return isSameYear && isSameMonth && isSameDay;
      case 'week':
        return isSameYear && this.toISOWeek(now) === this.toISOWeek(date);
      case 'month':
        return isSameYear && isSameMonth;
      case 'year':
        return isSameYear;
      default:
        return false;
    }
  }

  // ----- Date handling

  private get dateFormat(): string {
    const date = new Date(Date.UTC(3333, 10, 22));
    const dateStr = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: this.type !== 'year' ? 'numeric' : undefined,
      day: this.type === 'date' || this.type === 'week' ? 'numeric' : undefined
    }).format(date);
    return dateStr.replace('22', 'dd').replace('11', 'mm').replace('3333', 'yyyy');
  }

  private fromISOWeek(week: string | Date | number): Date {
    if (typeof week === 'string' || typeof week === 'number') {
      const weekNumber = parseInt(week.toString(), 10);
      return isNaN(weekNumber) ? new Date() : this.fromISOWeekNumber(weekNumber);
    }
    return week;
  }

  private fromISOWeekNumber(weekNumber: number, year = new Date().getFullYear()): Date {
    const refDate = new Date(Date.UTC(year, 0, 4)); // January 4th
    const diffDays = (weekNumber - 1) * 7 - (refDate.getUTCDay() || 7) + 1;
    const date = new Date(refDate);
    date.setUTCDate(date.getUTCDate() + diffDays);
    return date;
  }

  private toISOWeek(date: Date): number {
    const currentDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    currentDate.setUTCDate(currentDate.getUTCDate() + 4 - (currentDate.getUTCDay() || 7));
    const firstDayOfYear = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));
    return Math.ceil(((currentDate.getTime() - firstDayOfYear.getTime()) / 86400000 + 1) / 7);
  }
}
