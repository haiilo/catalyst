import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import autosize from 'autosize';
import log from 'loglevel';
import { CatFormHint } from '../cat-form-hint/cat-form-hint';

let nextUniqueId = 0;

/**
 * Textarea specifies a control that allows user to write text over multiple
 * rows. Used when the expected user input is long. For shorter input, use the
 * input component.
 *
 * @slot hint - Optional hint element to be displayed with the textarea.
 * @slot label - The slotted label. If both the label property and the label slot are present, only the label slot will be displayed.
 * @part label - The label content.
 */
@Component({
  tag: 'cat-textarea',
  styleUrl: 'cat-textarea.scss',
  shadow: true
})
export class CatTextarea {
  private readonly id = `cat-textarea-${nextUniqueId++}`;
  private textarea!: HTMLTextAreaElement;

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  /**
   * Whether the textarea is disabled.
   */
  @Prop() disabled = false;

  /**
   * Optional hint text(s) to be displayed with the textarea.
   */
  @Prop() hint?: string | string[];

  /**
   * The label for the textarea.
   */
  @Prop() label = '';

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * A maximum length (number of characters) for textual values.
   */
  @Prop() maxLength?: number;

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
   * The value is not editable.
   */
  @Prop() readonly = false;

  /**
   * A value is required or must be check for the form to be submittable.
   */
  @Prop() required = false;

  /**
   * Specifies the initial number of lines in the textarea.
   */
  @Prop() rows = 3;

  /**
   * The initial value of the control.
   */
  @Prop({ mutable: true }) value?: string | number;

  /**
   * Emitted when the value is changed.
   */
  @Event() catChange!: EventEmitter;

  /**
   * Emitted when the textarea received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the textarea loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    if (!this.label && !this.hasSlottedLabel) {
      log.warn('[A11y] Missing ARIA label on textarea', this);
    }
  }

  componentDidLoad(): void {
    autosize(this.textarea);
  }

  /**
   * Programmatically move focus to the textarea. Use this method instead of
   * `textarea.focus()`.
   *
   * @param options An optional object providing options to control aspects of
   * the focusing process.
   */
  @Method()
  async doFocus(options?: FocusOptions): Promise<void> {
    this.textarea.focus(options);
  }

  /**
   * Programmatically remove focus from the textarea. Use this method instead of
   * `textarea.blur()`.
   */
  @Method()
  async doBlur(): Promise<void> {
    this.textarea.blur();
  }

  /**
   * Programmatically simulate a click on the textarea.
   */
  @Method()
  async doClick(): Promise<void> {
    this.textarea.click();
  }

  render() {
    return (
      <Host>
        {(this.hasSlottedLabel || this.label) && (
          <label htmlFor={this.id} class={{ hidden: this.labelHidden }}>
            <span part="label">
              {(this.hasSlottedLabel && <slot name="label"></slot>) || this.label}
              {!this.required && (
                <span class="input-optional" aria-hidden="true">
                  (Optional)
                </span>
              )}
            </span>
          </label>
        )}
        <textarea
          ref={el => (this.textarea = el as HTMLTextAreaElement)}
          id={this.id}
          disabled={this.disabled}
          maxlength={this.maxLength}
          minlength={this.minLength}
          name={this.name}
          placeholder={this.placeholder}
          readonly={this.readonly}
          required={this.required}
          rows={this.rows}
          value={this.value}
          onInput={this.onInput.bind(this)}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
        ></textarea>
        {this.hintSection}
      </Host>
    );
  }

  private get hintSection() {
    const hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    return (
      (this.hint || hasSlottedHint) && (
        <CatFormHint hint={this.hint} slottedHint={hasSlottedHint && <slot name="hint"></slot>} />
      )
    );
  }

  private onInput(event: Event) {
    this.value = this.textarea.value;
    this.catChange.emit(event);
  }

  private onFocus(event: FocusEvent) {
    this.catFocus.emit(event);
  }

  private onBlur(event: FocusEvent) {
    this.catBlur.emit(event);
  }
}
