import { Component, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import flatpickr from 'flatpickr';
import { CatDatepickerMode } from '../cat-datepicker/cat-datepicker.mode';
import { getConfig } from '../cat-datepicker/cat-datepicker.config';
import { getLocale } from '../cat-datepicker/cat-datepicker.locale';
import { getFormat } from '../cat-datepicker/cat-datepicker.format';
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
  onDisabledChanged(value: boolean) {
    // Dynamically unsetting 'enabled' value to undefined is not working due to
    // a bug in the library. We thus need to fully recreate the date picker.
    this.pickr?.destroy();
    if (this.input) {
      this.pickr = this.initDatepicker(this.input, value);
    }
  }

  componentDidLoad() {
    if (this.input) {
      this.pickr = this.initDatepicker(this.input, this.disabled);
    }
  }

  render() {
    return (
      <Host>
        <input ref={el => (this.input = el)} value={this.value}></input>
      </Host>
    );
  }

  private initDatepicker(input: HTMLInputElement, disabled: boolean): flatpickr.Instance {
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
          disabled,
          readonly: this.readonly,
          applyChange: (value?: string) => (this.value = value)
        },
        {
          ...(disabled ? { enable: [] } : {}),
          inline: true
        }
      )
    );
  }
}
