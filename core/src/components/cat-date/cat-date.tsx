import { Placement } from '@floating-ui/dom';
import { Component, Element, Event, EventEmitter, Host, Method, Prop, Watch, h, State } from '@stencil/core';
import { getLocale } from '../cat-date-inline/cat-date-locale';
import { clampDate } from '../cat-date-inline/cat-date-math';
import { ErrorMap } from '../cat-form-hint/cat-form-hint';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';
import { DateUnit, FormatDateOptions } from 'cleave-zen';

/**
 * A date input component to select a date from a calendar in a dropdown.
 */
@Component({
  tag: 'cat-date',
  styleUrl: 'cat-date.scss',
  shadow: {
    delegatesFocus: true
  }
})
export class CatDate {
  private readonly language = i18n.getLocale();
  private readonly locale = getLocale(this.language);
  private input?: HTMLCatInputElement;
  private dateInline?: HTMLCatDateInlineElement;
  private inputFocused = false;

  @Element() hostElement!: HTMLElement;

  @State() dateMaskOptions?: FormatDateOptions;

  /**
   * Whether the label need a marker to shown if the input is required or optional.
   */
  @Prop() requiredMarker?: 'none' | 'required' | 'optional' | 'none!' | 'optional!' | 'required!' = 'optional';

  /**
   * Whether the label is on top or left.
   */
  @Prop() horizontal = false;

  /**
   * Hint for form autofill feature.
   */
  @Prop() autoComplete = 'off';

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
   * A maximum value for the date, given in local ISO 8601 date format YYYY-MM-DD.
   */
  @Prop() max?: string;

  /**
   * A minimum value for the date, given in local ISO 8601 date format YYYY-MM-DD.
   */
  @Prop() min?: string;

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
   * The value of the control, given in local ISO 8601 date format YYYY-MM-DD.
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
   * errors change with the given delay in milliseconds or immediately on blur.
   */
  @Prop() errorUpdate: boolean | number = 0;

  /**
   * Attributes that will be added to the native HTML input element.
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  /**
   * A unique identifier for the underlying native element that is used for
   * testing purposes. The attribute is added as `data-test` attribute and acts
   * as a shorthand for `nativeAttributes={ 'data-test': 'test-Id' }`.
   */
  @Prop() testId?: string;

  /**
   * The placement of the dropdown.
   */
  @Prop() placement: Placement = 'bottom-end';

  @Watch('min')
  onMinChanged(min?: string, oldMin?: string) {
    if (min !== oldMin) {
      this.reclamp('min', min);
    }
  }

  @Watch('max')
  onMaxChanged(max?: string, oldMax?: string) {
    if (max !== oldMax) {
      this.reclamp('max', max);
    }
  }

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

  private get inputValue() {
    const [match, year, month, day] = this.value?.match(/^(\d{4})-(\d{2})-(\d{2})/) ?? [];
    if (match) {
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      const format = new Intl.DateTimeFormat(this.language, { year: 'numeric', month: '2-digit', day: '2-digit' });
      return format.format(date);
    }
    return '';
  }

  componentDidLoad() {
    const format = this.locale.formatStr.replace('YYYY', 'Y').replace('YY', 'y').replace('MM', 'm').replace('DD', 'd');
    const [, p1, d1, p2, p3] = /(\w+)([^\w]+)(\w+)[^\w]+(\w+)/.exec(format) || [];
    this.dateMaskOptions = {
      dateMin: this.min,
      dateMax: this.max,
      delimiter: d1,
      datePattern: [p1 as DateUnit, p2 as DateUnit, p3 as DateUnit]
    };
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
    this.input?.doFocus(options);
  }

  /**
   * Programmatically remove focus from the input. Use this method instead of
   * `input.blur()`.
   */
  @Method()
  async doBlur(): Promise<void> {
    this.input?.doBlur();
  }

  /**
   * Clear the input.
   */
  @Method()
  async clear(): Promise<void> {
    this.input?.clear();
  }

  render() {
    this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
    return (
      <Host>
        <cat-input
          class="cat-date-input"
          ref={el => (this.input = el as HTMLCatInputElement)}
          requiredMarker={this.requiredMarker}
          horizontal={this.horizontal}
          autoComplete={this.autoComplete}
          clearable={this.clearable}
          disabled={this.disabled}
          hint={this.hint}
          icon={this.icon}
          iconRight={this.iconRight}
          identifier={this.identifier}
          labelHidden={this.labelHidden}
          name={this.name}
          placeholder={this.placeholder}
          textPrefix={this.textPrefix}
          textSuffix={this.textSuffix}
          readonly={this.readonly}
          required={this.required}
          errors={this.errors}
          errorUpdate={this.errorUpdate}
          testId={this.testId}
          nativeAttributes={this.nativeAttributes}
          value={this.inputValue}
          dateMaskOptions={this.dateMaskOptions}
          onCatFocus={e => {
            this.inputFocused = e.target === this.input;
            e.stopPropagation();
            this.catFocus.emit(e.detail);
          }}
          onCatBlur={e => {
            e.stopPropagation();
            this.onInputBlur(e.detail);
          }}
        >
          <span slot="label">
            {this.label}
            <span class="label-aria"> ({this.locale.formatStr})</span>
          </span>
          <cat-dropdown
            slot="addon"
            placement={this.placement}
            arrowNavigation="none"
            noResize
            onCatOpen={() => this.dateInline?.resetView()}
          >
            <cat-button
              slot="trigger"
              icon="$cat:datepicker-calendar"
              iconOnly
              class="cat-date-toggle"
              disabled={this.disabled}
              a11yLabel={this.getTriggerA11yLabel()}
            ></cat-button>
            <div slot="content">
              <cat-date-inline
                ref={el => (this.dateInline = el as HTMLCatDateInlineElement)}
                min={this.min}
                max={this.max}
                value={this.value}
                hint
                weeks
                noClear
                onCatChange={this.onDateChange.bind(this)}
              ></cat-date-inline>
            </div>
          </cat-dropdown>
        </cat-input>
      </Host>
    );
  }

  private getTriggerA11yLabel() {
    const date = this.locale.fromLocalISO(this.value);
    return date ? `${this.locale.change}, ${this.locale.toLocalStr(date)}` : this.locale.choose;
  }

  private onInputBlur(e: FocusEvent) {
    if (!this.input || !this.inputFocused) {
      return;
    }
    this.inputFocused = false;
    const oldValue = this.value;
    const dateParsed = this.parse(this.input.value ?? '');
    const dateMin = this.locale.fromLocalISO(this.min);
    const dateMax = this.locale.fromLocalISO(this.max);
    const date = dateParsed ? clampDate(dateMin, dateParsed, dateMax) : null;
    this.value = date ? this.locale.toLocalISO(date) : undefined;
    if (oldValue !== this.value) {
      if (date) {
        this.dateInline?.select(date);
      } else {
        this.dateInline?.clear();
      }
      this.catChange.emit(this.value);
    }
    this.input.value = this.inputValue;
    this.catBlur.emit(e);
  }

  private onDateChange(e: CustomEvent<string>) {
    e.stopPropagation();
    const oldValue = this.value;
    const date = e.detail ? this.locale.fromLocalISO(e.detail) : null;
    this.value = date ? this.locale.toLocalISO(date) : undefined;
    if (oldValue !== this.value) {
      this.catChange.emit(this.value);
    }
  }

  private parse(value: string) {
    const [, p1, d1, p2, p3] = /(\w+)([^\w]+)(\w+)[^\w]+(\w+)/.exec(this.locale.formatStr) || [];
    const formatParts = [p1, p2, p3];
    const parts = value.split(d1).map(s => Number(s || 'x'));
    let year = parts[formatParts.indexOf('YYYY') || formatParts.indexOf('YY')] || this.locale.now().getFullYear();
    const month = parts[formatParts.indexOf('MM')];
    const day = parts[formatParts.indexOf('DD')];
    if (!Number.isInteger(month) || !Number.isInteger(day)) {
      return null;
    } else if (year < 100) {
      year += year < 50 ? 2000 : 1900;
    }
    return new Date(year, month - 1, day);
  }

  private reclamp(mode: 'min' | 'max', limit: string | undefined) {
    const oldValue = this.value;
    const oldDate = this.locale.fromLocalISO(oldValue);
    const limitDate = this.locale.fromLocalISO(limit);
    if (!oldDate || !limitDate) {
      return;
    }
    const newDate = clampDate(mode === 'min' ? limitDate : null, oldDate, mode === 'max' ? limitDate : null);
    const newValue = this.locale.toLocalISO(newDate);
    if (oldValue !== newValue) {
      this.value = newValue;
      this.catChange.emit(newValue);
    }
  }
}
