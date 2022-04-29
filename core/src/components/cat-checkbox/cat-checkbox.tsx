import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import log from 'loglevel';

let nextUniqueId = 0;

@Component({
  tag: 'cat-checkbox',
  styleUrls: ['cat-checkbox.scss'],
  shadow: true
})
export class CatCheckbox {
  private readonly id = `cat-checkbox-${nextUniqueId++}`;
  private inputRef?: HTMLInputElement;

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
  @Prop() value?: string;

  /**
   * Emitted when the checked status of the checkbox is changed
   */
  @Event() checkboxChange!: EventEmitter;

  componentDidLoad() {
    if (this.inputRef && this.indeterminate) {
      this.inputRef.indeterminate = true;
    }
  }

  componentWillRender(): void {
    if (!this.label) {
      log.error('[A11y] Missing ARIA label on checkbox', this);
    }
  }

  render() {
    return (
      <label htmlFor={this.id} class={{ 'is-hidden': this.labelHidden, 'is-disabled': this.disabled }}>
        <input
          ref={el => (this.inputRef = el)}
          id={this.id}
          type="checkbox"
          name={this.name}
          value={this.value}
          checked={this.checked}
          required={this.required}
          disabled={this.disabled}
          onInput={this.handleChange.bind(this)}
        />
        <span class="box" aria-hidden="true">
          <svg class="check" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
          <svg class="dash" viewBox="0 0 12 10">
            <polyline points="1.5 5 10.5 5"></polyline>
          </svg>
        </span>
        <span class="label">{this.label}</span>
      </label>
    );
  }

  private handleChange(event: Event) {
    this.checkboxChange.emit(event);
  }
}
