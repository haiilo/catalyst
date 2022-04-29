import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import log from 'loglevel';

let nextUniqueId = 0;

@Component({
  tag: 'cat-radio',
  styleUrl: 'cat-radio.scss',
  shadow: true
})
export class CatRadio {
  private readonly id = `cat-radio-${++nextUniqueId}`;

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

  componentWillRender(): void {
    if (!this.label) {
      log.error('[A11y] Missing ARIA label on radio', this);
    }
  }

  render() {
    return (
      <label htmlFor={this.id} class={{ 'is-hidden': this.labelHidden, 'is-disabled': this.disabled }}>
        <span class="radio">
          <input
            id={this.id}
            type="radio"
            name={this.name}
            value={this.value}
            checked={this.checked}
            required={this.required}
            disabled={this.disabled}
            onChange={this.onChange.bind(this)}
          />
          <span class="circle"></span>
        </span>
        <span class="label">{this.label}</span>
      </label>
    );
  }

  private onChange(event: Event) {
    this.catChange.emit(event);
  }
}
