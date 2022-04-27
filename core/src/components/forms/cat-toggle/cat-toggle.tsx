import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

let nextUniqueId = 0;

@Component({
  tag: 'cat-toggle',
  styleUrls: ['../form-check.scss', 'cat-toggle.scss'],
  shadow: true
})
export class CatToggle {
  private readonly id = `cat-toggle-${nextUniqueId++}`;

  /**
   * Checked state of the checkbox
   */
  @Prop() checked?: boolean;

  /**
   *
   */
  @Prop() value?: string;

  /**
   * Label of the checkbox which is presented in the UI
   */
  @Prop() label?: string;

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
  @Prop() required?: boolean;

  /**
   * Disabled state of the checkbox
   */
  @Prop() disabled?: boolean;

  /**
   * Emitted when the checked status of the checkbox is changed
   */
  @Event() toggleChange!: EventEmitter;

  render() {
    return (
      <div class="form-check form-switch">
        <input
          onInput={event => this.handleChange(event)}
          id={this.id}
          type="checkbox"
          name={this.name}
          value={this.value}
          required={this.required}
          checked={this.checked}
          disabled={this.disabled}
          class="form-check-input"
          role="switch"
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
    this.toggleChange.emit(event);
  }
}
