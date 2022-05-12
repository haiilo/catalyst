import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import log from 'loglevel';
import { CatI18nRegistry } from '../cat-i18n/cat-i18n-registry';
import { CatFormFieldHintSection } from '../cat-form-field-hint-section/cat-form-field-hint-section';

let nextUniqueId = 0;

/**
 * Inputs are used to allow users to provide text input when the expected input
 * is short. As well as plain text, Input supports various types of text,
 * including passwords and numbers.
 *
 * @part label - The label content.
 * @part prefix - The text prefix.
 * @part suffix - The text suffix.
 */
@Component({
  tag: 'cat-input',
  styleUrl: 'cat-input.scss',
  shadow: true
})
export class CatInput {
  private readonly i18n = CatI18nRegistry.getInstance();
  private readonly id = `cat-input-${nextUniqueId++}`;
  private input!: HTMLInputElement;
  @Element() hostElement!: HTMLElement;

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
   * Optional hint text(s) to be displayed with the input.
   */
  @Prop() hint?: string | string[];

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

  /**
   * Emitted when the value is changed.
   */
  @Event() catChange!: EventEmitter;

  /**
   * Emitted when the input received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  @Watch('value')
  onValueChange(value?: string | number) {
    this.inputValue = '' + (value ?? '');
  }

  componentWillLoad() {
    this.onValueChange(this.value);
  }

  componentWillRender(): void {
    if (!this.label) {
      log.error('[A11y] Missing ARIA label on input', this);
    }
  }

  /**
   * Sets focus on the input. Use this method instead of `input.focus()`.
   *
   * @param options An optional object providing options to control aspects of
   * the focusing process.
   */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    this.input.focus(options);
  }

  /**
   * Clear the input.
   */
  @Method()
  async clear(): Promise<void> {
    this.inputValue = '';
  }

  render() {
    return (
      <Host>
        {this.label && (
          <label htmlFor={this.id} class={{ hidden: this.labelHidden }}>
            <span part="label">
              {this.label}
              {!this.required && (
                <span class="input-optional" aria-hidden="true">
                  ({this.i18n.getMessage('input.optional')})
                </span>
              )}
            </span>
          </label>
        )}
        <div
          class={{
            'input-wrapper': true,
            'input-round': this.round,
            'input-disabled': this.disabled
          }}
          onClick={() => this.input.focus()}
        >
          {this.textPrefix && (
            <span class="text-prefix" part="prefix">
              {this.textPrefix}
            </span>
          )}
          {this.icon && !this.iconRight && <cat-icon icon={this.icon} class="icon-prefix" size="l"></cat-icon>}
          <div class="input-inner-wrapper">
            <input
              ref={el => (this.input = el as HTMLInputElement)}
              id={this.id}
              class={{
                'has-clearable': this.clearable && !this.disabled
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
              onInput={this.onInput.bind(this)}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
            ></input>
            {this.clearable && !this.disabled && this.inputValue && (
              <cat-button
                class="clearable"
                icon="cross-circle-outlined"
                icon-only="true"
                size="s"
                variant="text"
                a11y-label={this.i18n.getMessage('input.clear')}
                onClick={this.clear.bind(this)}
              ></cat-button>
            )}
          </div>
          {this.icon && this.iconRight && <cat-icon icon={this.icon} class="icon-suffix" size="l"></cat-icon>}
          {this.textSuffix && (
            <span class="text-suffix" part="suffix">
              {this.textSuffix}
            </span>
          )}
        </div>
        {this.hintSection}
      </Host>
    );
  }

  private get hintSection() {
    const hasSlottedHint = this.hostElement.children.length > 0;

    return hasSlottedHint || this.hint ? (
      <CatFormFieldHintSection hint={this.hint} slottedHint={hasSlottedHint && <slot name="hint"></slot>} />
    ) : null;
  }

  private onInput(event: Event) {
    this.inputValue = this.input.value;
    this.catChange.emit(event);
  }

  private onFocus(event: FocusEvent) {
    this.catFocus.emit(event);
  }

  private onBlur(event: FocusEvent) {
    this.catBlur.emit(event);
  }
}
