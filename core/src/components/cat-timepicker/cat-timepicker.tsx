import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
// import log from 'loglevel';
import { ErrorMap } from '../cat-form-hint/cat-form-hint';
// import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';
import { of } from 'rxjs';
import { CatSelectMultipleTaggingValue, CatSelectState, CatSelectTaggingValue, Item } from '../cat-select/cat-select';
import { Placement } from '@floating-ui/dom';
// import IMask from 'imask';

interface Time extends Item {
  hour: number;
  minutes: number;
}

/**
 * Inputs are used to allow users to provide text input when the expected input
 * is short. As well as plain text, Input supports various types of text,
 * including passwords and numbers.
 *
 * @slot hint - Optional hint element to be displayed with the input.
 * @slot label - The slotted label. If both the label property and the label slot are present, only the label slot will be displayed.
 * @part label - The label content.
 * @part prefix - The text prefix.
 * @part suffix - The text suffix.
 */
@Component({
  tag: 'cat-timepicker',
  styleUrl: 'cat-timepicker.scss',
  shadow: true
})
export class CatTimepicker {
  private timeSelect?: HTMLCatSelectElement;
  // private timeMask?: IMask.InputMask<IMask.AnyMaskedOptions>;

  @Element() hostElement!: HTMLElement;

  @State() state?: CatSelectState;

  @State() hasSlottedLabel = false;

  @State() hasSlottedHint = false;

  @State() errorMap?: ErrorMap;

  /**
   * Whether the label need a marker to shown if the input is required or optional.
   */
  @Prop() requiredMarker: 'none' | 'required' | 'optional' | 'none!' | 'optional!' | 'required!' = 'optional';

  /**
   * Whether the label is on top or left.
   */
  @Prop() horizontal = false;

  /**
   * Enable multiple selection.
   */
  @Prop() multiple = false;

  /**
   * The placement of the select.
   */
  @Prop() placement: Placement = 'bottom-start';

  /**
   * The value of the select. <br />
   * <br />
   * The value of the select depends on whether it is allowed to choose a single item or several items. <br />
   * When only one item can be selected, the value is the id of the item, in case several items can be selected, the value is an array of ids of the selected items. <br />
   * <br />
   * In case the user can add new items to the select (tags activated), the value in the single select is an object (CatSelectTaggingValue) with the id of the item or the name of the created item,
   * in the case of multiple select, it is an object (CatSelectMultipleTaggingValue) with the array of the ids of the items selected and the array of the names of the items created
   */
  @Prop({ mutable: true }) value?: string | string[] | CatSelectTaggingValue | CatSelectMultipleTaggingValue;

  /**
   * Whether the input is disabled.
   */
  @Prop() disabled = false;

  /**
   * The placeholder text to display within the select.
   */
  @Prop() placeholder?: string;

  /**
   * Optional hint text(s) to be displayed with the input.
   */
  @Prop() hint?: string | string[];

  /**
   * A unique identifier for the input.
   */
  @Prop() identifier?: string;

  /**
   * The label for the input.
   */
  @Prop() label = '';

  /**
   * The name of the form control. Submitted with the form as part of a name/value pair.
   */
  @Prop() name?: string;

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * A value is required or must be checked for the form to be submittable.
   */
  @Prop() required = false;

  /**
   * Whether the select should show a clear button.
   */
  @Prop() clearable = false;

  /**
   * A maximum value for date, time and numeric values.
   */
  @Prop() max?: string;

  /**
   * A minimum value for date, time and numeric values.
   */
  @Prop() min?: string;

  /**
   * The text to display in the dropdown if no results are found.
   */
  @Prop() noItems?: string;

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
   * Attributes that will be added to the native HTML input element.
   */
  @Prop() minutesStep = 30;

  /**
   * Attributes that will be added to the native HTML input element.
   */
  @Prop() hourShort = this.isBrowserHour12();

  /**
   * Emitted when the select dropdown is opened.
   */
  @Event() catOpen!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the select dropdown is closed.
   */
  @Event() catClose!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the value is changed.
   */
  @Event() catChange!: EventEmitter;

  /**
   * Emitted when the select loses the focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
  }

  componentDidLoad(): void {
    this.timeSelect?.connect(this.timeConnector);

    // IMask spike
    // const input = this.hostElement.shadowRoot?.querySelector('cat-select')?.shadowRoot?.querySelector('input');
    // if (input) {
    //   this.timeMask = this.getTimeMask(input);
    // }
  }

  render() {
    return (
      <Host>
        <cat-select
          requiredMarker={this.requiredMarker}
          horizontal={this.horizontal}
          clearable={this.clearable}
          disabled={this.disabled}
          hint={this.hint}
          identifier={this.identifier}
          label={this.label}
          labelHidden={this.labelHidden}
          name={this.name}
          multiple={this.multiple}
          placeholder={this.placeholder}
          placement={this.placement}
          required={this.required}
          noItems={this.noItems}
          ref={el => (this.timeSelect = el)}
          value={this.value}
          errors={this.errors}
          errorUpdate={this.errorUpdate}
          nativeAttributes={this.nativeAttributes}
          onCatChange={event => this.onCatChange(event)}
          onCatOpen={this.onCatOpen.bind(this)}
          onCatClose={this.onCatClose.bind(this)}
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
        </cat-select>
      </Host>
    );
  }

  private get timeConnector() {
    return {
      resolve: (times: string[]) => {
        return of(
          times.map(t =>
            this.timeArray.find(time => time.hour === this.getHour(t) && time.minutes === this.getMinutes(t))
          )
        );
      },
      retrieve: (term: string) => {
        const filteredTimeArray = this.timeArray.filter(t => {
          if (!term) return true;
          const formatedTime = this.hourShort ? this.formatAMPM(t.hour, t.minutes) : this.formatTime(t.hour, t.minutes);
          return formatedTime.toUpperCase().includes(term.toUpperCase());
        });
        return of({
          last: true,
          totalElements: filteredTimeArray.length,
          content: filteredTimeArray
        });
      },
      render: ({ hour, minutes }: Time) => ({
        label: this.hourShort ? this.formatAMPM(hour, minutes) : this.formatTime(hour, minutes)
      })
    };
  }

  private get timeArray() {
    const times: Time[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minutes = 0; minutes < 60; minutes += this.minutesStep) {
        if (this.isHigherThanMinValue(hour, minutes) && this.isLowerThanMaxValue(hour, minutes)) {
          times.push({
            id: this.hourShort ? this.formatAMPM(hour, minutes) : this.formatTime(hour, minutes),
            hour,
            minutes
          });
        }
      }
    }
    return times;
  }

  private isBrowserHour12() {
    const browserLanguage = window?.navigator?.language ?? 'en';
    const hour = new Intl.DateTimeFormat(browserLanguage, { hour: 'numeric' }).format(new Date().setHours(16));
    return hour.toLowerCase().includes('pm' || 'am');
  }

  private getHour(time: string) {
    let hour = Number(time.split(':')[0]);
    if (time.toLowerCase().includes('pm') && hour < 12) hour = hour + 12;
    if (time.toLowerCase().includes('am') && hour == 12) hour = hour - 12;

    return hour;
  }

  private getMinutes(time: string) {
    const minutes = time.match(/:(\d+)/);
    return Number(minutes ? minutes[1] : 0);
  }

  private isHigherThanMinValue(hour: number, minutes: number) {
    if (this.min) {
      const minHour = this.getHour(this.min);
      const minMinutes = this.getMinutes(this.min);

      return hour > minHour || (hour === minHour && minutes >= minMinutes);
    }

    return true;
  }

  private isLowerThanMaxValue(hour: number, minutes: number) {
    if (this.max) {
      const maxHour = this.getHour(this.max);
      const maxMinutes = this.getMinutes(this.max);

      return hour < maxHour || (hour === maxHour && minutes <= maxMinutes);
    }

    return true;
  }

  private formatAMPM(hour: number, minutes: number) {
    if (hour === 0) {
      return `12:${minutes < 10 ? `0${minutes}` : minutes} AM`;
    } else if (hour < 12) {
      return `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes} AM`;
    } else {
      return `${hour % 12 < 10 ? `0${hour % 12}` : hour % 12}:${minutes < 10 ? `0${minutes}` : minutes} PM`;
    }
  }

  private formatTime(hour: number, minutes: number) {
    return `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`;
  }

  private onCatChange(event: unknown) {
    (event as CustomEvent).stopPropagation();
    this.value = this.timeSelect?.value;
    this.catChange.emit(event);
  }

  private onCatOpen(event: unknown) {
    (event as CustomEvent).stopPropagation();
    this.catOpen.emit(event as FocusEvent);
  }

  private onCatClose(event: unknown) {
    (event as CustomEvent).stopPropagation();
    this.catClose.emit(event as FocusEvent);
  }

  private onCatBlur(event: unknown) {
    (event as CustomEvent).stopPropagation();
    this.catBlur.emit(event as FocusEvent);
  }

  // IMask spike

  // private getTimeMask(element: HTMLInputElement): IMask.InputMask<IMask.AnyMaskedOptions> {
  //   return IMask(element, {
  //     mask: 'HH:MM[ PM]',
  //     lazy: true,
  //     blocks: {
  //       HH: {
  //         mask: IMask.MaskedRange,
  //         from: 0,
  //         to: 23
  //       },

  //       MM: {
  //         mask: IMask.MaskedRange,
  //         from: 0,
  //         to: 59
  //       },

  //       PM: {
  //         mask: IMask.MaskedEnum,
  //         enum: ['AM', 'PM', 'am', 'pm']
  //       }
  //     }
  //   });
  // }
}
