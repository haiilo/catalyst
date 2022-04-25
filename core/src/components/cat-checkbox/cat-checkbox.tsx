import {Component, Event, EventEmitter, h, Prop} from '@stencil/core';

let nextUniqueId = 0;

@Component({
  tag: 'cat-checkbox',
  styleUrl: 'cat-checkbox.scss',
  shadow: true,
})
export class CatCheckbox {
  private readonly id = `cat-checkbox-${nextUniqueId++}`;
  private inputRef?: HTMLInputElement;

  @Prop() checked?: boolean;
  @Prop() value?: string;
  @Prop() label?: string;
  @Prop() hideLabel = false;
  @Prop() name?: string;
  @Prop() indeterminate = false;
  @Prop() required?: boolean;
  @Prop() disabled?: boolean;

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
          ref={(el) => this.inputRef = el}
          onInput={(event) => this.handleChange(event)}
          id={this.id}
          name={this.name}
          value={this.value}
          required={this.required}
          checked={this.checked}
          disabled={this.disabled}
          class="form-check-input"
          type="checkbox"
        />
        {!this.hideLabel && <label class="form-check-label" htmlFor={this.id}>{this.label}</label>}
      </div>
    );
  }

  private handleChange(event: Event) {
    this.checkboxChange.emit(event);
  }

}
