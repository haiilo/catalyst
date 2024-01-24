import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import log from 'loglevel';
import { CatFormHint } from '../cat-form-hint/cat-form-hint';

let nextUniqueId = 0;

/**
 * Radio Buttons are graphical interface elements that allow user to choose
 * only one of a predefined set of mutually exclusive options.
 *
 * @slot hint - Optional hint element to be displayed with the radio.
 * @slot label - The slotted label. If both the label property and the label slot are present, only the label slot will be displayed.
 * @part label - The label content.
 * @part input - The native input element.
 */
@Component({
  tag: 'cat-radio',
  styleUrl: 'cat-radio.scss',
  shadow: true
})
export class CatRadio {
  private readonly _id = `cat-radio-${++nextUniqueId}`;
  private get id() {
    return this.identifier || this._id;
  }

  private input!: HTMLInputElement;

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  @State() hasSlottedHint = false;

  /**
   * Whether this radio is checked.
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * Whether this radio is disabled.
   */
  @Prop() disabled = false;

  /**
   * A unique identifier for the input.
   */
  @Prop() identifier?: string;

  /**
   * The label of the radio that is visible.
   */
  @Prop() label = '';

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * The name of the radio component.
   */
  @Prop() name?: string;

  /**
   * Whether the radio is required.
   */
  @Prop() required = false;

  /**
   * The value of the radio component.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop() value: any = '';

  /**
   * Optional hint text(s) to be displayed with the radio.
   */
  @Prop() hint?: string | string[];

  /**
   * Whether the label should appear to the left of the radio component.
   */
  @Prop() labelLeft = false;

  /**
   * Attributes that will be added to the native HTML input element.
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  /**
   * Emitted when the radio is changed.
   */
  @Event() catChange!: EventEmitter<boolean | string>;

  /**
   * Emitted when the radio received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the radio loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    if (!this.label && !this.hasSlottedLabel) {
      log.warn('[A11y] Missing ARIA label on radio', this);
    }
  }

  /**
   * Programmatically move focus to the radio button. Use this method instead of
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
   * Programmatically remove focus from the radio button. Use this method
   * instead of `input.blur()`.
   */
  @Method()
  async doBlur(): Promise<void> {
    this.input.blur();
  }

  render() {
    return (
      <Host>
        <label
          htmlFor={this.id}
          class={{ 'is-hidden': this.labelHidden, 'is-disabled': this.disabled, 'label-left': this.labelLeft }}
          role="radio"
          aria-checked={this.checked ? 'true' : 'false'}
        >
          <span class="radio">
            <input
              {...this.nativeAttributes}
              part="input"
              ref={el => (this.input = el as HTMLInputElement)}
              id={this.identifier || this.id}
              type="radio"
              name={this.name}
              value={this.value}
              checked={this.checked}
              required={this.required}
              disabled={this.disabled}
              onInput={this.onInput.bind(this)}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
              aria-describedby={this.hasHint ? this.id + '-hint' : undefined}
            />
            <span class="circle"></span>
          </span>
          <span class="label" part="label">
            {(this.hasSlottedLabel && <slot name="label"></slot>) || this.label}
          </span>
        </label>
        {this.hasHint && (
          <div class={{ 'hint-wrapper': true, 'label-left': this.labelLeft }}>
            <div class="circle-placeholder"></div>
            <CatFormHint id={this.id} hint={this.hint} slottedHint={this.hasSlottedHint && <slot name="hint"></slot>} />
          </div>
        )}
      </Host>
    );
  }

  private get hasHint() {
    return !!this.hint || !!this.hasSlottedHint;
  }

  private onInput() {
    this.checked = true;
    console.log('onInput', this.value);
    this.catChange.emit(this.value);
  }

  private onFocus(event: FocusEvent) {
    this.catFocus.emit(event);
  }

  private onBlur(event: FocusEvent) {
    this.catBlur.emit(event);
  }
}
