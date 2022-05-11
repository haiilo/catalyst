import { Component, Event, EventEmitter, h, Prop, Method, Host, Element } from '@stencil/core';
import log from 'loglevel';
import { CatFormFieldHintSection } from '../cat-form-field-hint-section/cat-form-field-hint-section';

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
   * Optional hint text to be displayed with the radio.
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
    if (!this.label) {
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
            {this.label}
          </span>
        </label>
        {this.hintSection}
      </Host>
    );
  }

  private get hintSection() {
    const hasSlottedHint = this.hostElement.children.length > 0;

    return hasSlottedHint || this.hint ? (
      <CatFormFieldHintSection hint={this.hint} slot={hasSlottedHint && <slot name="hint"></slot>} />
    ) : null;
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
