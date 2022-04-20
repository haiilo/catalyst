import { Component, Element, h, Host, Prop } from '@stencil/core';

let nextUniqueId = 0;

@Component({
  tag: 'cat-input',
  styleUrl: 'cat-input.scss',
  shadow: true
})
export class CatInput {
  private readonly id = `cat-input-${nextUniqueId++}`;
  private input!: HTMLInputElement;

  @Element() host!: HTMLElement;

  /**
   * Hint for form autofill feature.
   */
  @Prop() autoComplete = 'on';

  @Prop() clearable = false;

  /**
   * Whether the form control is disabled.
   */
  @Prop() disabled = false;

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
   * Maximum value for numeric values.
   */
   @Prop() max?: number;

   /**
    * Maximum length (number of characters) for textual values.
    */
   @Prop() maxLength?: number;

   /**
    * Minimum value for numeric values.
    */
    @Prop() min?: number;

    /**
     * Minimum length (number of characters) for textual values.
     */
    @Prop() minLength?: number;

    /**
     * Name of the form control. Submitted with the form as part of a name/value pair.
     */
    @Prop() name = '';

    /**
     * Text that appears in the form control when it has no value set
     */
  @Prop() placeholder?: string;

  @Prop() textPrefix?: string;
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
  @Prop() type: "text" | "email" | "password" | "tel" | "url" | "search" | "number" = 'text';

  /**
   * The initial value of the control.
   */
  @Prop() value?: string | number;

  render() {
    return (
      <Host>
        <div>
        <label htmlFor={this.id}>Do you like peas?Do you like peas?Do you like peas?<span class="cat-input-optional">Optional</span></label>
        <div class="cat-input-wrapper"
          onClick={() => this.input.focus()}
          >
        {this.textPrefix && <span class="cat-text-prefix">{this.textPrefix}</span>}
        {this.icon && !this.iconRight && <cat-icon icon={this.icon} class="cat-icon-prefix"></cat-icon>}

        <input
        ref={el => (this.input = el as HTMLInputElement)}
          id={this.id}
          class={{
            'cat-input-round': this.round
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
          value={this.value}
        ></input>

{this.icon && this.iconRight && <cat-icon icon={this.icon} class="cat-icon-suffix"></cat-icon>}
{this.textSuffix && <span class="cat-text-suffix">{this.textSuffix}</span>}
</div>
{this.hint && <p class="cat-input-hint">{this.hint}</p>}
        </div>
      </Host>
    );
  }
}
