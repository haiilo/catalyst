import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';
import flatpickr from 'flatpickr';
import { findClosest } from '../../utils/find-closest';
import { ErrorMap } from '../cat-form-hint/cat-form-hint';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';
import { getConfig } from './cat-datepicker.config';
import { getFormat } from './cat-datepicker.format';
import { getLocale } from './cat-datepicker.locale';
import { CatDatepickerMode } from './cat-datepicker.mode';
import { autoUpdate, computePosition, flip, Placement, ReferenceElement } from '@floating-ui/dom';
import { BaseOptions } from 'flatpickr/dist/types/options';

@Component({
  tag: 'cat-datepicker',
  styleUrl: 'cat-datepicker.scss',
  shadow: true
})
export class CatDatepickerFlat {
  private pickr?: flatpickr.Instance;
  private _input?: HTMLCatInputElement;
  private _calendarWrapper?: HTMLDivElement;
  private get input(): HTMLInputElement | undefined {
    return this._input?.shadowRoot?.querySelector('input') ?? undefined;
  }

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  @State() hasSlottedHint = false;

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
  @Prop() mode: CatDatepickerMode = 'date';

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
   * Instead of body, appends the calendar to the cat-datepicker element instead
   */
  @Prop() attachToElement = false;

  /**
   * Where the calendar is rendered relative to the input vertically and horizontally.
   * In the format of "[vertical] [horizontal]". Vertical can be auto, above or below (required).
   * Horizontal can be left, center or right.
   * If @attachToElement is passed the value should be in Placement format
   */
  @Prop() position?: BaseOptions['position'] | Placement;

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
   * errors change with the given delay in milliseconds or immediately on blur.
   */
  @Prop() errorUpdate: boolean | number = 0;

  /**
   * Attributes that will be added to the native HTML input element.
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  /**
   * Attributes that will be added to the rendered HTML datepicker element.
   */
  @Prop() nativePickerAttributes?: { [key: string]: string };

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
      if (this.mode !== 'daterange' || value.includes(' - ')) {
        this.catChange.emit(value);
      }
    } else {
      this.pickr?.clear(false);
      this.catChange.emit(undefined);
    }
  }

  @Watch('disabled')
  @Watch('readonly')
  @Watch('mode')
  onDisabledChanged() {
    // Dynamically changing config value is not working due to a bug in the
    // library. We thus need to fully recreate the date picker after the value
    // has been updated.
    this.pickr?.destroy();
    this.pickr = undefined;
    setTimeout(() => {
      this.input ? (this.input.disabled = this.disabled) : null;
      this.pickr = this.initDatepicker(this.input);
    });
  }

  componentDidLoad() {
    this.pickr = this.initDatepicker(this.input);
  }

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
  }

  @Watch('min')
  @Watch('max')
  onMinChanged() {
    this.pickr?.set('minDate', this.min);
    this.pickr?.set('maxDate', this.max);
    if (this.value && !this.pickr?.selectedDates?.length) {
      // Dynamically changing 'minDate' or 'maxDate' does not emit a change if
      // the value is cleared due to an invalid date.
      this.pickr?.clear();
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
    return [
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
      </cat-input>,
      <div ref={el => (this._calendarWrapper = el)} class="datepicker-wrapper"></div>
    ];
  }

  private initDatepicker(input?: HTMLInputElement): flatpickr.Instance | undefined {
    if (!input) {
      return;
    }

    // avoid dropdown closing if datepicker is part of a dropdown
    const withinDropdown = !!findClosest('cat-dropdown', input);
    const nativePickerAttributes: { [key: string]: string } = withinDropdown ? { 'data-dropdown-no-close': '' } : {};

    return flatpickr(
      input,
      getConfig({
        locale: getLocale(i18n.getLocale()),
        format: getFormat(i18n.getLocale(), this.mode),
        mode: this.mode,
        min: this.min,
        max: this.max,
        step: this.step,
        disabled: this.disabled,
        readonly: this.readonly,
        appendTo: this.attachToElement ? this._calendarWrapper : undefined,
        nativePickerAttributes: { ...nativePickerAttributes, ...this.nativePickerAttributes },
        // flatpickr has open bug about incorrect positioning when appendTo is used,
        // we have to use custom logic to calculate position
        // https://github.com/flatpickr/flatpickr/issues/1619
        position: this.attachToElement
          ? (flatpickr, positionElement) => {
              this.updatePosition(flatpickr, positionElement);
            }
          : (this.position as BaseOptions['position']) || undefined,
        onReady: (_dates, _dateStr, flatpickr) => {
          autoUpdate(input, flatpickr.calendarContainer, () => this.updatePosition(flatpickr, flatpickr._input));
        },
        applyChange: value => (this.value = value)
      })
    );
  }

  private updatePosition(flatpickr: flatpickr.Instance, positionElement: HTMLElement | undefined): void {
    if (positionElement) {
      computePosition(positionElement as ReferenceElement, flatpickr.calendarContainer, {
        strategy: 'fixed',
        placement: (this.position as Placement) || 'bottom-start',
        middleware: [flip()]
      }).then(({ x, y, placement }) => {
        if (flatpickr.calendarContainer) {
          flatpickr.calendarContainer.dataset.placement = placement;
          Object.assign(flatpickr.calendarContainer.style, {
            left: `${x}px`,
            top: `${y}px`,
            position: 'fixed'
          });
        }
      });
    }
  }
}
