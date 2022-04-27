import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

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
  private radioRef?: HTMLInputElement;

  /**
   * Whether this radio is checked.
   * */
  @Prop() checked?: boolean;

  /**
   * Whether the radio is required.
   * */
  @Prop() required?: boolean;

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
  @Prop() label?: string;

  /**
   * Hides the visibility of the label but still shows it to users
   * who use assistive technology.
   */
  @Prop() hideLabel?: boolean;

  /**
   * Emitted when the radio is changed.
   */
  @Event() catChange!: EventEmitter;

  render() {
    return (
      <div
        class={{
          'cat-radio-wrapper': true,
          'cat-radio-disabled': this.disabled
        }}
        onClick={this.checkRadio.bind(this)}
      >
        <input
          ref={el => (this.radioRef = el)}
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
        <label part="label" class="cat-radio-label" aria-label={this.label}>
          {!this.hideLabel && this.label}
        </label>
      </div>
    );
  }

  private onChange(event: Event) {
    this.catChange.emit(event);
  }

  private checkRadio() {
    this.radioRef?.click();
  }
}
