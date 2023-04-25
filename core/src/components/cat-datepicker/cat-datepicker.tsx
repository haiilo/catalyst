import { Component, Element, EventEmitter, Event, h, Prop, State, Method, Host } from '@stencil/core';
import log from 'loglevel';
import { Datepicker } from 'vanillajs-datepicker';
import { ErrorMap } from '../cat-form-hint/cat-form-hint';
import { DatepickerType } from './datepicker-type';
import { getDatepickerOptions } from './vanillajs-datepicker.config';
import dayjs, { today } from './dayjs.config';

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
  @Prop() format?: string = 'DD.MM.YYYY';

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

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
  }

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

  render() {
    return (
      <Host>
        <cat-input
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
          onCatChange={this.onCatChange.bind(this)}
          onCatFocus={this.onCatFocus.bind(this)}
          onCatBlur={this.onCatBlur.bind(this)}
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
      this.catInput = this.hostElement?.shadowRoot?.querySelector('cat-input') as HTMLCatInputElement;
      const inputWrapper = this.catInput.shadowRoot?.querySelector('.input-wrapper') as HTMLElement;
      const inputElement = inputWrapper.querySelector('input');
      const catDatepickerStyle = this.hostElement.shadowRoot?.querySelector('style') as HTMLStyleElement;
      const catInputStyle = this.catInput.shadowRoot?.querySelector('style') as HTMLStyleElement;

      catInputStyle?.append(catDatepickerStyle);

      if (inputElement) {
        this.input = inputElement;
      } else {
        log.error('[CatInput] Missing input element', this);
        return;
      }

      const config = {
        ...getDatepickerOptions(this.type, this.value),
        container: inputWrapper,
        maxDate: this.max,
        minDate: this.min,
        datesDisabled: this.datesDisabled,
        prevArrow: '←',
        nextArrow: '→',
        weekNumbers: this.weekNumbers === true ? 4 : 0, // TO-DO weeknumbers logic
        format: {
          toValue: (date: string) => {
              return date;
          },
          toDisplay: (date: Date) => {
            this.value = dayjs(date).format(this.format);
            switch (this.type) {
              case 'week':
                return `${dayjs(date).isoWeek()}/${dayjs(date).year()}`;
              case 'month':
                return `${dayjs(date).month() + 1}/${dayjs(date).year()}`;
              case 'year':
                return dayjs(date).year();
              default:
                return dayjs(date).format(this.format);
            }              
          },
        },
        beforeShowDay: (date: Date) => {
          if (this.type === 'week' && this.shouldBeHighlightedAsToday(date)) {
            return 'today';
          }
        },
        beforeShowMonth: (date: Date) => {
          if (this.type === 'month' && this.shouldBeHighlightedAsToday(date)) return 'today';
        },
        beforeShowYear: (date: Date) => {
          if (this.type === 'year' && this.shouldBeHighlightedAsToday(date)) return 'today';
        }
      };

      this.datepicker = new Datepicker(inputElement, config);
      if (this.type === 'week') {
        const pickerElement = this.datepicker.pickerElement as HTMLElement;
        pickerElement.classList.add('weekly');
      } 
      this.input.addEventListener('changeDate', this.handleDateChange.bind(this) as EventListener);
      this.input.addEventListener('show', this.handleShowPicker.bind(this) as EventListener);
      this.input.addEventListener('changeMonth', this.handleChangeMonth.bind(this) as EventListener);
      this.input.addEventListener('changeView', this.handleChangeView.bind(this) as EventListener);
    }
  }

  disconnectedCallback() {
    this.input.removeEventListener('changeDate', this.handleDateChange.bind(this) as EventListener);
    this.input.removeEventListener('show', this.handleShowPicker.bind(this) as EventListener);
    this.input.removeEventListener('changeMonth', this.handleChangeMonth.bind(this) as EventListener);
    this.input.removeEventListener('changeView', this.handleChangeView.bind(this) as EventListener);
  }

  private handleDateChange(event: CustomEvent) { 
    if (this.type === 'week') {
      this.selectAllWeekDays(event.detail.date);
    }
    // this.catChange.emit(event);
  }

  private handleShowPicker(event: CustomEvent) { 
    if (this.type === 'week') {
      this.selectAllWeekDays(event.detail.date);
    }
  }

  private handleChangeMonth(event: CustomEvent) { 
    if (this.type === 'week') {
      this.selectAllWeekDays(event.detail.date);
    }
  }

  private handleChangeView(event: CustomEvent) { 
    if (this.type === 'week') {
      this.selectAllWeekDays(event.detail.date);
    }
  }

  private selectAllWeekDays(date: Date) {    
    if (this.value) {
      const firstDayOfWeek = dayjs(date).startOf('isoWeek');
  
      if (!firstDayOfWeek.isSame(dayjs(date).startOf('day'))) {
        this.datepicker.setDate(firstDayOfWeek.toDate())
      } else {
        let weekdaysCount = 7;
        const pickerElement = this.datepicker.pickerElement as HTMLElement;
        let selected = pickerElement.querySelector('.datepicker-cell:not(.month):not(.year).selected')
        while (weekdaysCount > 1) {
          if (selected) {
            selected = selected.nextElementSibling;
            selected?.classList.add('selected')
            weekdaysCount--;
          } else {
            break;
          }
        }
      }
    }
  }

  private shouldBeHighlightedAsToday(date: Date) {
    switch (this.type) {
      case 'date':
        return today().getFullYear() === date.getFullYear() && today().getMonth() === date.getMonth() && today().getDate() === date.getDate();
      case 'week':
        return today().getFullYear() === date.getFullYear() && dayjs(today()).isoWeek() === dayjs(date).isoWeek()
      case 'month':
        return today().getFullYear() === date.getFullYear() && today().getMonth() === date.getMonth();  
      case 'year':
        return today().getFullYear() === date.getFullYear();
      default:
        return false;
    }
  }

  private onCatChange(event: unknown) {
    this.value = this.input.value;
    // this.catChange.emit(event);
  }

  private onCatFocus(event: unknown) {
    this.catFocus.emit(event as FocusEvent);
  }

  private onCatBlur(event: unknown) {
    this.catBlur.emit(event as FocusEvent);
  }
}
