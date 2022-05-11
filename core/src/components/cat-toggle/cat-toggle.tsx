import { Component, Event, EventEmitter, h, Prop, Method, Host } from '@stencil/core';
import log from 'loglevel';

let nextUniqueId = 0;

/**
 * Toggles are graphical interface switches that give user control over a
 * feature or option that can be turned on or off.
 *
 * @part toggle - The toggle element.
 * @part label - The label content.
 */
@Component({
  tag: 'cat-toggle',
  styleUrls: ['cat-toggle.scss'],
  shadow: true
})
export class CatToggle {
  private readonly id = `cat-toggle-${nextUniqueId++}`;
  private input!: HTMLInputElement;

  /**
   * Checked state of the toggle.
   */
  @Prop() checked = false;

  /**
   * Disabled state of the toggle.
   */
  @Prop() disabled = false;

  /**
   * The label of the toggle that is visible.
   */
  @Prop() label = '';

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * The name of the input
   */
  @Prop() name?: string;

  /**
   * Required state of the toggle
   */
  @Prop() required = false;

  /**
   * The value of the toggle
   */
  @Prop() value?: string;

  /**
   * Optional hint text to be displayed with the toggle.
   */
  @Prop() hint?: string | string[];

  /**
   * Emitted when the checked status of the toggle is changed.
   */
  @Event() catChange!: EventEmitter;

  /**
   * Emitted when the toggle received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  componentWillRender(): void {
    if (!this.label) {
      log.error('[A11y] Missing ARIA label on toggle', this);
    }
  }

  /**
   * Sets focus on the toggle. Use this method instead of `toggle.focus()`.
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
          <input
            ref={el => (this.input = el as HTMLInputElement)}
            id={this.id}
            type="checkbox"
            name={this.name}
            value={this.value}
            checked={this.checked}
            required={this.required}
            disabled={this.disabled}
            class="form-check-input"
            role="switch"
            onInput={this.onInput.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
          />
          <span class="toggle" part="toggle"></span>
          <span class="label" part="label">
            {this.label}
          </span>
        </label>
        {this.hintSection}
      </Host>
    );
  }

  private get hintSection() {
    return this.hint && Array.isArray(this.hint) ? (
      this.hint.map(item => <p class="input-hint">{item}</p>)
    ) : (
      <p class="input-hint">{this.hint}</p>
    );
  }


  private onInput(event: Event) {
    this.catChange.emit(event);
  }

  private onFocus(event: FocusEvent) {
    this.catFocus.emit(event);
  }

  private onBlur(event: FocusEvent) {
    this.catBlur.emit(event);
  }
}
