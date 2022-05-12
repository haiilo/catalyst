import { Component, Event, EventEmitter, h, Prop, Method, Element } from '@stencil/core';
import log from 'loglevel';

let nextUniqueId = 0;

/**
 * Radio Buttons are graphical interface elements that allow user to choose
 * only one of a predefined set of mutually exclusive options.
 *
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

  /**
   * Whether this radio is checked.
   */
  @Prop() checked = false;

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
  @Prop() value?: string;

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
    if (!this.label && !this.hasSlottedLabel()) {
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
      <label htmlFor={this.id} class={{ 'is-hidden': this.labelHidden, 'is-disabled': this.disabled }}>
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
            onInput={this.onChange.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
          />
          <span class="circle"></span>
        </span>
        <span class="label" part="label">
          {this.label || <slot name="label"></slot>}
        </span>
      </label>
    );
  }

  private hasSlottedLabel() {
    return (
      this.hostElement.children &&
      Array.from(this.hostElement.children).some(value1 => value1.getAttribute('slot') === 'label')
    );
  }

  private onChange(event: Event) {
    this.catChange.emit(event);
  }

  private onFocus(event: FocusEvent) {
    this.catFocus.emit(event);
  }

  private onBlur(event: FocusEvent) {
    this.catBlur.emit(event);
  }
}
