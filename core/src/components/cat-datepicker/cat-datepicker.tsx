import { Component, Event, EventEmitter, Method, Prop, Watch, h } from '@stencil/core';
import flatpickr from 'flatpickr';
import weekSelectPlugin from 'flatpickr/dist/plugins/weekSelect/weekSelect';
import { ErrorMap } from '../cat-form-hint/cat-form-hint';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';
import { getFormat } from './cat-datepicker.config';
import { getLocale } from './cat-datepicker.locale';

@Component({
  tag: 'cat-datepicker',
  styleUrl: 'cat-datepicker.scss',
  shadow: true
})
export class CatDatepickerFlat {
  private pickr?: flatpickr.Instance;
  private _input?: HTMLCatInputElement;
  private get input(): HTMLInputElement | undefined {
    return this._input?.shadowRoot?.querySelector('input') ?? undefined;
  }

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
   * Display the icon on the right.
   */
  @Prop() iconRight = false;

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
   * A maximum value as ISO Date string, e.g. 2017-03-04T01:23:43.000Z.
   */
  @Prop() max?: string;

  /**
   * A minimum value as ISO Date string, e.g. 2017-03-04T01:23:43.000Z.
   */
  @Prop() min?: string;

  /**
   * The mode of the datepicker, to select a date, time, both, a date range or a week number.
   */
  @Prop() mode: 'date' | 'time' | 'datetime' | 'daterange' | 'week' = 'date';

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
   * The step size to use when changing the time.
   */
  @Prop() step = 5;

  /**
   * The value as ISO Date string, e.g. 2017-03-04T01:23:43.000Z or as a week number string.
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
  @Event() catChange!: EventEmitter<string>;

  /**
   * Emitted when the input received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  @Watch('value')
  onValueChanged(value: string) {
    if (value) {
      this.pickr?.setDate(value, false);
      this.catChange.emit(value);
    } else {
      this.pickr?.clear(false);
      this.catChange.emit(undefined);
    }
  }

  @Watch('disabled')
  onDisabledChaned(value: boolean) {
    this.pickr?.set('clickOpens', !value);
  }

  componentDidLoad() {
    if (this.input) {
      this.pickr = this.initDatepicker(this.input);
    }
  }

  /**
   * Programmatically move focus to the datepicker. Use this method instead of
   * `input.focus()`.
   *
   * @param options An optional object providing options to control aspects of
   * the focusing process.
   */
  @Method()
  async doFocus(options?: FocusOptions): Promise<void> {
    this._input?.doFocus(options);
  }

  /**
   * Programmatically remove focus from the datepicker. Use this method instead of
   * `input.blur()`.
   */
  @Method()
  async doBlur(): Promise<void> {
    this._input?.doBlur();
  }

  render() {
    return (
      <cat-input
        ref={el => (this._input = el)}
        requiredMarker={this.requiredMarker}
        horizontal={this.horizontal}
        autoComplete={this.autoComplete}
        clearable={this.clearable}
        disabled={this.disabled}
        hint={this.hint}
        icon={this.icon}
        iconRight={this.iconRight}
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
        onCatChange={e => {
          e.stopPropagation();
          this.value = e.detail || undefined;
        }}
        onCatFocus={e => {
          e.stopPropagation();
          this.catFocus.emit(e.detail);
        }}
        onCatBlur={e => {
          e.stopPropagation();
          this.catBlur.emit(e.detail);
        }}
      ></cat-input>
    );
  }

  private initDatepicker(input: HTMLInputElement): flatpickr.Instance {
    const locale = getLocale(i18n.getLocale());
    const format = getFormat(i18n.getLocale(), this.mode);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plugins = this.mode === 'week' ? [new (weekSelectPlugin as any)({})] : [];
    return flatpickr(input, {
      locale,
      plugins,
      altInput: true,
      prevArrow: '←',
      nextArrow: '→',
      dateFormat: this.dateFormat,
      altFormat: format,
      ariaDateFormat: format,
      mode: this.mode === 'daterange' ? 'range' : 'single',
      minDate: this.min,
      maxDate: this.max,
      enableTime: this.mode === 'time' || this.mode === 'datetime',
      noCalendar: this.mode === 'time',
      weekNumbers: true,
      minuteIncrement: this.step,
      clickOpens: !this.disabled,
      onChange: (dates, dateStr, flatpickr) => {
        if (this.mode === 'week') {
          this.value = dates[0] ? flatpickr.config.getWeek(dates[0]).toString() : undefined;
        } else {
          this.value = dateStr || undefined;
        }
      }
    });
  }

  private get dateFormat(): string {
    if (this.mode === 'week') {
      return 'W';
    } else if (this.mode === 'time') {
      return 'H:i';
    } else {
      return 'Z';
    }
  }
}
