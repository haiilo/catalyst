import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

let nextUniqueId = 0;

@Component({
  tag: 'cat-checkbox',
  styleUrls: ['../form-check.scss', 'cat-checkbox.scss'],
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
   * The value of the checkbox
   */
  @Prop() value?: string;

  /**
   * Label of the checkbox which is presented in the UI
   */
  @Prop() label = '';

  /**
   * Flag to show/hide the label
   */
  @Prop() hideLabel = false;

  /**
   * The name of the input
   */
  @Prop() name?: string;

  /**
   * Indeterminate state of the checkbox
   */
  @Prop() indeterminate = false;

  /**
   * Required state of the checkbox
   */
  @Prop() required = false;

  /**
   * Disabled state of the checkbox
   */
  @Prop() disabled = false;

  /**
   * Emitted when the checked status of the checkbox is changed
   */
  @Event() checkboxChange!: EventEmitter;

  componentDidLoad() {
    if (this.inputRef && this.indeterminate) {
      this.inputRef.indeterminate = true;
    }
  }

  render() {
    return (
      <div class="form-check">
        <input
          ref={el => (this.inputRef = el)}
          onInput={event => this.handleChange(event)}
          id={this.id}
          type="checkbox"
          name={this.name}
          value={this.value}
          required={this.required}
          checked={this.checked}
          disabled={this.disabled}
          class="form-check-input"
        />
        {!this.hideLabel && (
          <label class="form-check-label" htmlFor={this.id}>
            {this.label}
          </label>
        )}
      </div>
    );
  }

  private handleChange(event: Event) {
    this.checkboxChange.emit(event);
  }
}
