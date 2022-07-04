import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import log from 'loglevel';
import { CatFormHint } from '../cat-form-hint/cat-form-hint';

let nextUniqueId = 0;

/**
 * Toggles are graphical interface switches that give user control over a
 * feature or option that can be turned on or off.
 *
 * @slot hint - Optional hint element to be displayed with the toggle.
 * @slot label - The slotted label. If both the label property and the label slot are present, only the label slot will be displayed.
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

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

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
   * Required state of the toggle.
   */
  @Prop() required = false;

  /**
   * The value of the toggle
   */
  @Prop({ mutable: true }) value?: string;

  /**
   * Optional hint text(s) to be displayed with the toggle.
   */
  @Prop() hint?: string | string[];

  /**
   * Whether the label should appear to the left of the toggle.
   */
  @Prop() labelLeft = false;

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
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    if (!this.label && !this.hasSlottedLabel) {
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
        <label
          htmlFor={this.id}
          class={{ 'is-hidden': this.labelHidden, 'is-disabled': this.disabled, 'label-left': this.labelLeft }}
        >
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

  private onInput(event: Event) {
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
