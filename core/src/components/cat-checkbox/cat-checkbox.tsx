import { Component, Event, EventEmitter, h, Method, Prop } from '@stencil/core';
import log from 'loglevel';

let nextUniqueId = 0;

/**
 * Checkboxes are used to let a user choose one or more options from a limited
 * number of options.
 *
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

  /**
   * Checked state of the checkbox
   */
  @Prop() checked = false;

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
  @Prop({ mutable: true }) value?: string;

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
    if (!this.label) {
      log.error('[A11y] Missing ARIA label on checkbox', this);
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
          {this.label}
        </span>
      </label>
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
