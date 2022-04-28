import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import log from 'loglevel';

let nextUniqueId = 0;
/**
 *
 * @part radio - The input type radio element.
 * @part label - The label of the input.
 */
@Component({
  tag: 'cat-radio',
  styleUrl: 'cat-radio.scss',
  shadow: true
})
export class CatRadio {
  private readonly id = `cat-radio-${++nextUniqueId}`;

  /**
   * Whether this radio is checked.
   * */
  @Prop() checked = false;

  /**
   * Whether the radio is required.
   * */
  @Prop() required = false;

  /**
   *  Whether this radio is disabled.
   *  */
  @Prop() disabled = false;

  /**
   * The name of the radio component.
   */
  @Prop() name?: string;

  /**
   * The value of the radio component.
   */
  @Prop() value?: string;

  /**
   * The label of the radio that is visible.
   */
  @Prop() label = '';

  /**
   * Hides the visibility of the label but still shows it to users
   * who use assistive technology.
   */
  @Prop() hideLabel = false;

  /**
   * Emitted when the radio is changed.
   */
  @Event() catChange!: EventEmitter;

  componentWillRender(): void {
    if (!this.label) {
      log.error('Missing label on radio element', this);
    }
  }

  render() {
    return (
      <div
        class={{
          'cat-radio-wrapper': true,
          'cat-radio-disabled': this.disabled
        }}
      >
        <input
          id={this.id}
          part="radio"
          type="radio"
          class="cat-radio-input"
          checked={this.checked}
          required={this.required}
          disabled={this.disabled}
          name={this.name}
          value={this.value}
          onChange={this.onChange.bind(this)}
        />
        <span class="cat-radio-checked-circle" />
        <label
          htmlFor={this.id}
          part="label"
          class={{ 'cat-radio-label': true, 'cat-radio-hidden-label': this.hideLabel }}
        >
          {this.label}
        </label>
      </div>
    );
  }

  private onChange(event: Event) {
    this.catChange.emit(event);
  }
}
