import { Component, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import flatpickr from 'flatpickr';
import { getConfig } from '../cat-datepicker/cat-datepicker.config';
import { getFormat } from '../cat-datepicker/cat-datepicker.format';
import { getLocale } from '../cat-datepicker/cat-datepicker.locale';
import { CatDatepickerMode } from '../cat-datepicker/cat-datepicker.mode';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

@Component({
  tag: 'cat-datepicker-inline',
  styleUrl: 'cat-datepicker-inline.scss',
  shadow: true
})
export class CatDatepickerInline {
  private pickr?: flatpickr.Instance;
  private input?: HTMLInputElement;

  /**
   * Whether the input is disabled.
   */
  @Prop() disabled = false;

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
   * The value is not editable.
   */
  @Prop() readonly = false;

  /**
   * The step size to use when changing the time.
   */
  @Prop() step = 5;

  /**
   * The value as ISO Date string, e.g. 2017-03-04T01:23:43.000Z or as a week number string.
   */
  @Prop({ mutable: true }) value?: string;

  /**
   * Attributes that will be added to the rendered HTML datepicker element.
   */
  @Prop() nativePickerAttributes?: { [key: string]: string };

  /**
   * Emitted when the value is changed.
   */
  @Event() catChange!: EventEmitter<string>;

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
  @Watch('readonly')
  onDisabledChanged() {
    // Dynamically unsetting 'enabled' value to undefined is not working due to
    // a bug in the library. We thus need to fully recreate the date picker
    // after the value has been updated.
    this.pickr?.destroy();
    this.pickr = undefined;
    setTimeout(() => (this.pickr = this.initDatepicker(this.input)));
  }

  componentDidLoad() {
    this.pickr = this.initDatepicker(this.input);
  }

  render() {
    return (
      <Host>
        <div
          tabIndex={this.disabled || this.readonly ? -1 : undefined}
          class={{
            'datepicker-wrapper': true,
            'datepicker-disabled': this.disabled,
            'datepicker-readonly': this.readonly
          }}
        >
          <input
            ref={el => (this.input = el)}
            value={this.value}
            disabled={this.disabled}
            readonly={this.readonly}
          ></input>
        </div>
      </Host>
    );
  }

  private initDatepicker(input?: HTMLInputElement): flatpickr.Instance | undefined {
    if (!input) {
      return;
    }

    return flatpickr(
      input,
      getConfig(
        {
          locale: getLocale(i18n.getLocale()),
          format: getFormat(i18n.getLocale(), this.mode),
          mode: this.mode,
          min: this.min,
          max: this.max,
          step: this.step,
          disabled: this.disabled,
          readonly: this.readonly,
          nativePickerAttributes: this.nativePickerAttributes ?? {},
          applyChange: value => (this.value = value)
        },
        {
          ...(this.disabled ? { enable: [] } : {}),
          inline: true
        }
      )
    );
  }
}
