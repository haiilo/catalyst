import { Component, h, Host, Method, Prop, State, Watch } from '@stencil/core';

let nextUniqueId = 0;

/**
 * Inputs are used to allow users to provide text input when the expected input
 * is short. As well as plain text, Input supports various types of text,
 * including passwords and numbers.
 */
@Component({
  tag: 'cat-input',
  styleUrl: 'cat-input.scss',
  shadow: true
})
export class CatInput {
  private readonly id = `cat-input-${nextUniqueId++}`;
  private input!: HTMLInputElement;

  @State() private inputValue = '';

  /**
   * Hint for form autofill feature.
   */
  @Prop() autoComplete?: string;

  /**
   * Whether the input should show a clear button.
   */
  @Prop() clearable = false;

  /**
   * Whether the input is disabled.
   */
  @Prop() disabled = false;

  /**
   * Optional hint text to be displayed with the input.
   */
  @Prop() hint?: string;

  /**
   * The name of an icon to be displayed in the input.
   */
  @Prop() icon?: string;

  /**
   * Display the icon on the right.
   */
  @Prop() iconRight = false;

  /**
   * The label for the input.
   */
  @Prop() label = '';

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * A maximum value for numeric values.
   */
  @Prop() max?: number;

  /**
   * A maximum length (number of characters) for textual values.
   */
  @Prop() maxLength?: number;

  /**
   * A minimum value for numeric values.
   */
  @Prop() min?: number;

  /**
   * A minimum length (number of characters) for textual values.
   */
  @Prop() minLength?: number;

  /**
   * The name of the form control. Submitted with the form as part of a name/value pair.
   */
  @Prop() name = '';

  /**
   * The placeholder text to display within the input.
   */
  @Prop() placeholder?: string;

  /**
   * A textual prefix to be displayed in the input.
   */
  @Prop() textPrefix?: string;

  /**
   * A textual suffix to be displayed in the input.
   */
  @Prop() textSuffix?: string;

  /**
   * The value is not editable.
   */
  @Prop() readonly = false;

  /**
   * A value is required or must be check for the form to be submittable.
   */
  @Prop() required = false;

  /**
   * Use round input edges.
   */
  @Prop() round = false;

  /**
   * Type of form control.
   */
  @Prop() type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number' = 'text';

  /**
   * The initial value of the control.
   */
  @Prop() value?: string | number;

  handleChange() {
    this.inputValue = this.input.value;
  }

  @Watch('value')
  onValueChange(value?: string | number) {
    this.inputValue = '' + (value ?? '');
  }

  componentWillLoad() {
    this.onValueChange(this.value);
  }

  @Method()
  async clear(): Promise<void> {
    this.inputValue = '';
  }

  render() {
    return (
      <Host>
        {this.label && (
          <label htmlFor={this.id} class={{ hidden: this.labelHidden }}>
            {this.label}
            {!this.required && (
              <span class="cat-input-optional" aria-hidden="true">
                (Optional)
              </span>
            )}
          </label>
        )}
        <div
          class={{
            'cat-input-wrapper': true,
            'cat-input-round': this.round,
            'cat-input-disabled': this.disabled
          }}
          onClick={() => this.input.focus()}
        >
          {this.textPrefix && <span class="cat-text-prefix">{this.textPrefix}</span>}
          {this.icon && !this.iconRight && <cat-icon icon={this.icon} class="cat-icon-prefix"></cat-icon>}
          <div class="cat-input-inner-wrapper">
            <input
              ref={el => (this.input = el as HTMLInputElement)}
              id={this.id}
              class={{
                'cat-has-clearable': this.clearable && !this.disabled
              }}
              autocomplete={this.autoComplete}
              disabled={this.disabled}
              max={this.max}
              maxlength={this.maxLength}
              min={this.max}
              minlength={this.minLength}
              name={this.name}
              placeholder={this.placeholder}
              readonly={this.readonly}
              required={this.required}
              type={this.type}
              value={this.inputValue}
              onInput={() => this.handleChange()}
            ></input>
            {this.clearable && !this.disabled && this.inputValue && (
              <cat-button
                class="cat-clearable"
                icon="cross-circle-outlined"
                icon-only="true"
                size="s"
                variant="text"
                round
                a11y-label="sdf"
                onClick={this.clear.bind(this)}
              >
                Reset
              </cat-button>
            )}
          </div>
          {this.icon && this.iconRight && <cat-icon icon={this.icon} class="cat-icon-suffix"></cat-icon>}
          {this.textSuffix && <span class="cat-text-suffix">{this.textSuffix}</span>}
        </div>
        {this.hint && <p class="cat-input-hint">{this.hint}</p>}
      </Host>
    );
  }
}
