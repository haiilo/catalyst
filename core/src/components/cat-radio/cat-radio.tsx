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
 */
@Component({
  tag: 'cat-radio',
  styleUrl: 'cat-radio.scss',
  shadow: true
})
export class CatRadio {
  private readonly id = `cat-radio-${++nextUniqueId}`;
  private input!: HTMLInputElement;

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  /**
   * Whether this radio is checked.
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * Whether this radio is disabled.
   */
  @Prop() disabled = false;

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
  @Prop({ mutable: true }) value?: string;

  /**
   * Optional hint text(s) to be displayed with the radio.
   */
  @Prop() hint?: string | string[];

  /**
   * Emitted when the radio is changed.
   */
  @Event() catChange!: EventEmitter;

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
    if (!this.label && !this.hasSlottedLabel) {
      log.error('[A11y] Missing ARIA label on radio', this);
    }
  }

  /**
   * Sets focus on the radio. Use this method instead of `radio.focus()`.
   *
   * @param options An optional object providing options to control aspects of
   * the focusing process.
   */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    this.input.focus(options);
  }

  render() {
    return (
      <Host>
        <label
          htmlFor={this.id}
          class={{ 'is-hidden': this.labelHidden, 'is-disabled': this.disabled }}
          role="radio"
          aria-checked={this.checked ? 'true' : 'false'}
        >
          <span class="radio">
            <input
              ref={el => (this.input = el as HTMLInputElement)}
              id={this.id}
              type="radio"
              name={this.name}
              value={this.value}
              checked={this.checked}
              required={this.required}
              disabled={this.disabled}
              onClick={this.onClick.bind(this)}
              onInput={this.onChange.bind(this)}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
            />
            <span class="circle"></span>
          </span>
          <span class="label" part="label">
            {(this.hasSlottedLabel && <slot name="label"></slot>) || this.label}
          </span>
        </label>
        {this.hintSection}
      </Host>
    );
  }

  private get hintSection() {
    const hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    return (
      (this.hint || hasSlottedHint) && (
        <CatFormHint hint={this.hint} slottedHint={hasSlottedHint && <slot name="hint"></slot>} />
      )
    );
  }

  private onClick() {
    this.checked = true;
  }

  private onChange(event: Event) {
    this.value = this.input.value;
    this.catChange.emit(event);
  }

  private onFocus(event: FocusEvent) {
    this.catFocus.emit(event);
  }

  private onBlur(event: FocusEvent) {
    this.catBlur.emit(event);
  }
}
