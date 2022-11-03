import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import log from 'loglevel';
import { CatFormHint } from '../cat-form-hint/cat-form-hint';

let nextUniqueId = 0;

/**
 * Checkboxes are used to let a user choose one or more options from a limited
 * number of options.
 *
 * @slot hint - Optional hint element to be displayed with the checkbox.
 * @slot label - The slotted label. If both the label property and the label slot are present, only the label slot will be displayed.
 * @part checkbox - The checkbox element.
 * @part label - The label content.
 */
@Component({
  tag: 'cat-checkbox',
  styleUrls: ['cat-checkbox.scss'],
  shadow: true
})
export class CatCheckbox {
  private readonly id = `cat-checkbox-${nextUniqueId++}`;
  private input!: HTMLInputElement;

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  /**
   * Checked state of the checkbox
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * Disabled state of the checkbox
   */
  @Prop() disabled = false;

  /**
   * Indeterminate state of the checkbox
   */
  @Prop() indeterminate = false;

  /**
   * Label of the checkbox which is presented in the UI
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
   * Required state of the checkbox
   */
  @Prop() required = false;

  /**
   * The value of the checkbox
   */
  @Prop({ mutable: true }) value?: string | boolean;

  /**
   * Optional hint text(s) to be displayed with the checkbox.
   */
  @Prop() hint?: string | string[];

  /**
   * Whether the label should appear to the left of the checkbox.
   */
  @Prop() labelLeft = false;

  /**
   * Emitted when the checked status of the checkbox is changed.
   */
  @Event() catChange!: EventEmitter;

  /**
   * Emitted when the checkbox received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the checkbox loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  componentDidLoad() {
    if (this.input && this.indeterminate) {
      this.input.indeterminate = true;
    }
  }

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    if (!this.label && !this.hasSlottedLabel) {
      log.warn('[A11y] Missing ARIA label on checkbox', this);
    }
  }

  /**
   * Sets focus on the checkbox. Use this method instead of `checkbox.focus()`.
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
            value={this.value !== undefined ? String(this.value) : this.value}
            checked={this.checked}
            required={this.required}
            disabled={this.disabled}
            onInput={this.onInput.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
          />
          <span class="box" aria-hidden="true" part="checkbox">
            <svg class="check" viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
            <svg class="dash" viewBox="0 0 12 10">
              <polyline points="1.5 5 10.5 5"></polyline>
            </svg>
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

  private onInput(event: Event) {
    this.checked = this.input.checked;

    if (!this.value || typeof this.value === 'boolean') {
      this.value = this.checked;
    }
    this.catChange.emit(event);
  }

  private onFocus(event: FocusEvent) {
    this.catFocus.emit(event);
  }

  private onBlur(event: FocusEvent) {
    this.catBlur.emit(event);
  }
}
