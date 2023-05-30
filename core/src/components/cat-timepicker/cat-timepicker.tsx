import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { ErrorMap } from '../cat-form-hint/cat-form-hint';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';
import { Placement } from '@floating-ui/dom';
import { of } from 'rxjs';
import { CatSelectConnector, CatSelectState, Item } from '../cat-select/cat-select';

type Time = Item;

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
   * The placement of the select.
   */
  @Prop() placement: Placement = 'bottom-start';

  /**
   * The value of the timepicker given as "HH:mm".
   */
  @Prop({ mutable: true }) value?: string;

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
   * Whether the timepicker should show a clear button.
   */
  @Prop() clearable = false;

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
   * A maximum value given as "HH:mm".
   */
  @Prop() max?: string;

  /**
   * A minimum value given as "HH:mm".
   */
  @Prop() min?: string;

  /**
   * The step size in minutes.
   */
  @Prop() step = 30;

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
   * Emitted when the timepicker loses the focus.
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
          placeholder={this.placeholder}
          placement={this.placement}
          required={this.required}
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

  private get timeConnector(): CatSelectConnector<Time> {
    return {
      resolve: ids => of(ids.map(id => ({ id }))),
      retrieve: () => {
        const content: Time[] = [];
        const min = this.min ? this.timeToMins({ id: this.min }) : 0;
        const max = this.max ? this.timeToMins({ id: this.max }) : 24 * 60 - 1;
        for (let i = min; i <= max; i += this.step) {
          const hh = Math.floor(i / 60);
          const mm = i % 60;
          content.push({ id: `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}` });
        }
        return of({ content, last: true, totalElements: content.length });
      },
      render: time => ({ label: this.timeToStr(time) })
    };
  }

  private timeToMins(time: Time): number {
    const [hours, minutes] = time.id.split(':');
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  }

  private timeToStr(time: Time): string {
    if (i18n.hour12) {
      const [hours, minutes] = time.id.split(':');
      let hh = parseInt(hours, 10);
      const period = hh >= 12 ? 'PM' : 'AM';
      hh = hh % 12 || 12;
      return `${hh}:${minutes} ${period}`;
    }
    return time.id;
  }

  private onCatChange(event: unknown) {
    (event as CustomEvent).stopPropagation();
    this.value = this.timeSelect?.value as string; //TODO
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
