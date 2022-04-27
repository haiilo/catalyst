import {Component, Event, EventEmitter, h, Prop} from '@stencil/core';

@Component({
  tag: 'cat-radio',
  styleUrl: 'cat-radio.scss',
  shadow: true
})
export class CatRadio {
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
  @Prop() disabled?: boolean;

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
      <div class="cat-radio-wrapper">
        <input
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
        <i/>
        <label
          part="label"
          class="cat-radio-label"
          aria-label={this.label}>
          {!this.hideLabel && this.label}
        </label>
      </div>
    );
  }

  private onChange(event: Event) {
    this.catChange.emit(event);
  }
}
