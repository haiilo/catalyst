import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import log from 'loglevel';

let nextUniqueId = 0;

@Component({
  tag: 'cat-toggle',
  styleUrls: ['cat-toggle.scss'],
  shadow: true
})
export class CatToggle {
  private readonly id = `cat-toggle-${nextUniqueId++}`;

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
   * Emitted when the checked status of the toggle is changed
   */
  @Event() toggleChange!: EventEmitter;

  componentWillRender(): void {
    if (!this.label) {
      log.error('[A11y] Missing ARIA label on toggle', this);
    }
  }

  render() {
    return (
      <label htmlFor={this.id} class={{ 'is-hidden': this.labelHidden, 'is-disabled': this.disabled }}>
        <input
          id={this.id}
          type="checkbox"
          name={this.name}
          value={this.value}
          checked={this.checked}
          required={this.required}
          disabled={this.disabled}
          class="form-check-input"
          role="switch"
          onInput={event => this.handleChange(event)}
        />
        <span class="toggle"></span>
        <span class="label">{this.label}</span>
      </label>
    );
  }

  private handleChange(event: Event) {
    this.toggleChange.emit(event);
  }
}
