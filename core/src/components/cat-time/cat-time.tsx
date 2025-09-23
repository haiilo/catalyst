import { Placement } from '@floating-ui/dom';
import { Component, Element, Event, EventEmitter, Host, Listen, Method, Prop, State, Watch, h } from '@stencil/core';
import { ErrorMap } from '../cat-form-hint/cat-form-hint';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';
import { formatIso, getLocale } from './cat-time-locale';
import { clampTime, isAfter, isBefore } from './cat-time-math';
import { FormatTimeOptions } from 'cleave-zen';

/**
 * A time input component to select a time in a dropdown.
 */
@Component({
  tag: 'cat-time',
  styleUrl: 'cat-time.scss'
})
export class CatTime {
  private readonly language = i18n.getLocale();
  private readonly locale = getLocale(this.language);
  private readonly timeMaskOptions: FormatTimeOptions = { timeFormat: this.locale.timeFormat, timePattern: ['h', 'm'] };
  private input?: HTMLCatInputElement;
  private localizedDayPeriods = this.getLocalizedDayPeriods(this.language);

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  @State() hasSlottedHint = false;

  @State() selectionTime: Date | null = null;

  @State() isAm = true;

  @State() valueChangedBySelection = false;

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
   * A maximum time value given in HH:mm format.
   */
  @Prop() max?: string;

  /**
   * A minimum value given in HH:mm format.
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
   * The value of the control given in HH:mm format
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

  /**
   * The step size for times in minutes.
   */
  @Prop() step = 30;

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

  @Watch('value')
  onValueChanged(value: string, oldValue: string) {
    if (this.valueChangedBySelection) {
      this.valueChangedBySelection = false;
    } else if (value !== oldValue) {
      this.set12hFormat();
      this.syncValue(value ?? '');
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

  componentWillLoad() {
    this.set12hFormat();
    this.syncValue(this.value ?? '');
  }

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
  }

  @Listen('catOpen')
  onOpen() {
    const query = (selector: string) => this.hostElement.shadowRoot?.querySelector<HTMLCatButtonElement>(selector);
    const time = clampTime(this.min ?? null, this.selectionTime ?? new Date(2000, 5, 1, 8), this.max ?? null);
    const elem1 = query(`[data-time="${formatIso(time)}"]`);
    time.setMinutes(Math.floor(time.getMinutes() / this.step) * this.step);
    const elem2 = query(`[data-time="${formatIso(time)}"]`);
    setTimeout(() => {
      (elem2 ?? elem1)?.doFocus();
      (elem2 ?? elem1)?.scrollIntoView(this.selectionTime ? { block: 'center' } : undefined);
    }); // not entirely sure why this is necessary
  }

  /**
   * Select a time in the picker.
   *
   * @param date The time to select.
   */
  @Method()
  async select(date: Date | null): Promise<void> {
    const oldValue = this.value;
    let newValue: string | undefined;
    if (!date) {
      this.selectionTime = null;
      newValue = undefined;
    } else {
      const time = clampTime(this.min ?? null, date, this.max ?? null);
      this.isAm = this.format(time).toLowerCase().includes(this.localizedDayPeriods.am.toLowerCase());
      this.selectionTime = time;
      newValue = formatIso(time);
    }
    // we need to set the input explicitly to sync the input even without a
    // rerender (if the value is not changed)
    if (this.input) {
      this.input.value = this.format(this.selectionTime, false);
    }
    if (oldValue !== newValue) {
      this.valueChangedBySelection = true;
      this.value = newValue;
      this.catChange.emit(this.value);
    } else {
      this.valueChangedBySelection = false;
    }
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
    return (
      <Host>
        <cat-input
          class="cat-time-input"
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
          label={this.label}
          labelHidden={this.labelHidden}
          name={this.name}
          placeholder={this.placeholder}
          textPrefix={this.textPrefix}
          textSuffix={this.textSuffix}
          readonly={this.readonly}
          required={this.required}
          value={this.format(this.selectionTime, false)}
          errors={this.errors}
          errorUpdate={this.errorUpdate}
          testId={this.testId}
          nativeAttributes={this.nativeAttributes}
          timeMaskOptions={this.timeMaskOptions}
          onCatFocus={e => this.catFocus.emit(e.detail)}
          onCatBlur={e => this.onInputBlur(e.detail)}
        >
          <span slot="label">
            {this.hasSlottedLabel && <slot name="label"></slot>}
            {!this.hasSlottedLabel && this.label}
            <span class="label-aria"> (HH:mm)</span>
          </span>
          <div slot="addon" class="cat-time-addon">
            {this.locale.timeFormat === '12' && (
              <cat-button
                class="cat-time-format"
                disabled={this.disabled || this.readonly}
                onCatClick={() => this.toggleAm()}
              >
                {this.isAm ? this.localizedDayPeriods.am : this.localizedDayPeriods.pm}
              </cat-button>
            )}
            <cat-dropdown slot="addon" placement={this.placement}>
              <cat-button
                slot="trigger"
                class="cat-time-toggle"
                disabled={this.disabled || this.readonly}
                icon="$cat:timepicker-clock"
                iconOnly
                a11yLabel={
                  this.selectionTime ? `${this.locale.change}, ${this.format(this.selectionTime)}` : this.locale.choose
                }
              ></cat-button>
              <nav slot="content" class="cat-nav">
                <ul>
                  {this.timeArray().map(time => {
                    const isoTime = formatIso(time);
                    const disabled = isBefore(time, this.min ?? null) || isAfter(time, this.max ?? null);
                    return (
                      <li>
                        <cat-button
                          class={{
                            'cat-nav-item': true,
                            'time-disabled': disabled
                          }}
                          disabled={disabled}
                          active={isoTime === this.value}
                          color={isoTime === this.value ? 'primary' : 'secondary'}
                          variant={isoTime === this.value ? 'filled' : 'outlined'}
                          onCatClick={() => this.select(time)}
                          data-time={isoTime}
                        >
                          {this.format(time)}
                        </cat-button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </cat-dropdown>
          </div>
          {this.hasSlottedHint && (
            <span slot="hint">
              <slot name="hint"></slot>
            </span>
          )}
        </cat-input>
      </Host>
    );
  }

  private timeArray() {
    const result = [];
    const start = new Date(2000, 5, 1, 0, 0, 0);
    let time = new Date(start.getTime());
    while (time.getDate() === start.getDate()) {
      result.push(time);
      time = new Date(time.getTime() + this.step * 60000);
    }
    return result;
  }

  private syncValue(value: string) {
    const [, hh, mm] = value.match(/(\d{2}):(\d{2})/)?.map(Number) ?? [];
    if (hh === undefined || mm === undefined) {
      this.select(null);
      return;
    }

    this.select(
      this.locale.timeFormat === '24'
        ? new Date(2000, 5, 1, hh, mm, 0)
        : new Date(2000, 5, 1, (hh % 12) + (this.isAm ? 0 : 12), mm, 0)
    );
  }

  private set12hFormat() {
    const [, hh] = this.value?.match(/(\d{2}):(\d{2})/)?.map(Number) ?? [];
    if (this.locale.timeFormat === '12') {
      this.isAm = hh === 0 || hh < 12;
    }
  }

  private toggleAm() {
    if (this.selectionTime) {
      this.select(new Date(this.selectionTime.getTime() + (this.isAm ? 12 : -12) * 3600000));
    } else {
      this.isAm = !this.isAm;
    }
  }

  private onInputBlur(e: FocusEvent) {
    this.syncValue(this.input?.value ?? '');
    this.catBlur.emit(e);
  }

  private format(date: Date | null, includeAmPm = true) {
    const str = date
      ? new Intl.DateTimeFormat(this.language, {
          hour: '2-digit',
          minute: '2-digit'
        }).format(date)
      : '';
    const reg = new RegExp(
      `\\s?(${this.localizedDayPeriods.am.toLowerCase()}|${this.localizedDayPeriods.pm.toLowerCase()})`,
      'i'
    );
    return includeAmPm ? str : str.replace(reg, '');
  }

  private reclamp(mode: 'min' | 'max', limit: string | undefined) {
    if (!this.value) return;
    const min = (mode === 'min' ? limit : this.min) ?? null;
    const max = (mode === 'max' ? limit : this.max) ?? null;
    const [match, hh, mm] = this.value.match(/(\d{2}):(\d{2})/) ?? [];
    const newValue = match ? formatIso(clampTime(min, new Date(2000, 5, 1, Number(hh), Number(mm)), max)) : undefined;
    if (this.value !== newValue) {
      this.syncValue(newValue ?? '');
      this.catChange.emit(newValue);
    }
  }

  private getLocalizedDayPeriods(language: string): { am: string; pm: string } {
    const format = new Intl.DateTimeFormat(language, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const extractDayPeriod = (hour: number): string => {
      const parts = format.formatToParts(new Date(2025, 0, 1, hour));
      return parts.find(p => p.type === 'dayPeriod')?.value ?? '';
    };

    return {
      am: extractDayPeriod(9), // Morning
      pm: extractDayPeriod(15) // Afternoon
    };
  }
}
