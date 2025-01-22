import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import autosize from 'autosize';
import { coerceBoolean, coerceNumber } from '../../utils/coerce';
import { CatFormHint, ErrorMap } from '../cat-form-hint/cat-form-hint';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

let nextUniqueId = 0;

/**
 * Textarea specifies a control that allows user to write text over multiple
 * rows. Used when the expected user input is long. For shorter input, use the
 * input component.
 *
 * @slot hint - Optional hint element to be displayed with the textarea.
 * @slot label - The slotted label. If both the label property and the label slot are present, only the label slot will be displayed.
 * @part label - The native label element.
 * @part textarea - The native textarea element.
 */
@Component({
  tag: 'cat-textarea',
  styleUrl: 'cat-textarea.scss',
  shadow: {
    delegatesFocus: true
  }
})
export class CatTextarea {
  private readonly _id = `cat-textarea-${nextUniqueId++}`;
  private get id() {
    return this.identifier || this._id;
  }

  private textarea!: HTMLTextAreaElement;
  private errorMapSrc?: ErrorMap | true;

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  @State() hasSlottedHint = false;

  @State() errorMap?: ErrorMap | true;

  /**
   * Whether the label need a marker to shown if the textarea is required or optional.
   */
  @Prop() requiredMarker?: 'none' | 'required' | 'optional' | 'none!' | 'optional!' | 'required!' = 'optional';

  /**
   * Whether the label is on top or left.
   */
  @Prop() horizontal = false;

  /**
   * Whether the textarea is disabled.
   */
  @Prop() disabled = false;

  /**
   * Custom function to count the number of characters in the textarea.
   * It may be needed when certain character patterns are counted differently,
   * for example URLs if they are processed by URL shortener later.
   * Passing it will also disable enforcing maxLength and minLength.
   */
  @Prop() countFunction?: (value: string) => number;

  /**
   * Optional hint text(s) to be displayed with the textarea.
   */
  @Prop() hint?: string | string[];

  /**
   * A unique identifier for the input.
   */
  @Prop() identifier?: string;

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
  @Prop() name?: string;

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
  @Prop({ mutable: true }) value?: string;

  /**
   * The validation errors for this input. Will render a hint under the input
   * with the translated error message(s) `error.${key}`. If an object is
   * passed, the keys will be used as error keys and the values translation
   * parameters.
   * If the value is `true`, the input will be marked as invalid without any
   * hints under the input.
   */
  @Prop() errors?: boolean | string[] | ErrorMap;

  /**
   * Fine-grained control over when the errors are shown. Can be `false` to
   * never show errors, `true` to show errors on blur, or a number to show
   * errors change with the given delay in milliseconds or immediately on blur.
   */
  @Prop() errorUpdate: boolean | number = 0;

  /**
   * Attributes that will be added to the native HTML textarea element.
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  /**
   * Emitted when the value is changed.
   */
  @Event() catChange!: EventEmitter<string>;

  /**
   * Emitted when the textarea received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the textarea loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  componentWillLoad(): void {
    this.onErrorsChanged(this.errors, undefined, false);
  }

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
  }

  componentDidLoad(): void {
    autosize(this.textarea);
    console.debug("countFunction", this.countFunction);
  }

  getCount: () => number = () => {
    if (this.countFunction && typeof this.countFunction === 'function') {
      return this.countFunction(this.value ?? '');
    }
    return this.value?.length ?? 0;
  };

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
   * Clear the textarea.
   */
  @Method()
  async clear(): Promise<void> {
    this.value = '';
    this.catChange.emit(this.value);
  }

  @Watch('errors')
  onErrorsChanged(newValue?: boolean | string[] | ErrorMap, _oldValue?: unknown, update: boolean = true) {
    if (!coerceBoolean(this.errorUpdate)) {
      this.errorMap = undefined;
    } else {
      this.errorMapSrc = Array.isArray(newValue)
        ? (newValue as string[]).reduce((acc, err) => ({ ...acc, [err]: undefined }), {})
        : newValue || undefined;
      if (update) {
        this.showErrorsIfTimeout() || this.showErrorsIfNoFocus();
      }
    }
  }

  render() {
    this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
    return (
      <Host>
        <div
          class={{
            'textarea-field': true,
            'textarea-horizontal': this.horizontal
          }}
        >
          <div class={{ 'label-container': true, hidden: this.labelHidden }}>
            {(this.hasSlottedLabel || this.label) && (
              <label htmlFor={this.id} part="label">
                <span class="label-wrapper">
                  {(this.hasSlottedLabel && <slot name="label"></slot>) || this.label}
                  <div class="label-metadata">
                    {!this.required && (this.requiredMarker ?? 'optional').startsWith('optional') && (
                      <span class="label-optional" aria-hidden="true">
                        ({i18n.t('input.optional')})
                      </span>
                    )}
                    {this.required && this.requiredMarker?.startsWith('required') && (
                      <span class="label-optional" aria-hidden="true">
                        ({i18n.t('input.required')})
                      </span>
                    )}
                    {(this.maxLength || this.countFunction) && (
                      <div class="label-character-count" aria-hidden="true">
                        {this.getCount()}/{this.maxLength}
                      </div>
                    )}
                  </div>
                </span>
              </label>
            )}
          </div>
          <div class="textarea-container">
            <div
              class={{
                'textarea-wrapper': true,
                'textarea-readonly': this.readonly,
                'textarea-disabled': this.disabled,
                'textarea-invalid': this.invalid
              }}
            >
              <textarea
                {...this.nativeAttributes}
                part="textarea"
                ref={el => (this.textarea = el as HTMLTextAreaElement)}
                id={this.id}
                disabled={this.disabled}
                maxlength={!this.countFunction ? this.maxLength : undefined}
                minlength={!this.countFunction ? this.minLength : undefined}
                name={this.name}
                placeholder={this.placeholder}
                readonly={this.readonly}
                required={this.required}
                rows={this.rows}
                value={this.value}
                onInput={this.onInput.bind(this)}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
                aria-invalid={this.invalid ? 'true' : undefined}
                aria-describedby={this.hasHint ? this.id + '-hint' : undefined}
              ></textarea>
              {this.invalid && (
                <cat-icon
                  icon="$cat:input-error"
                  class="icon-suffix cat-text-danger"
                  size="l"
                  onClick={() => this.textarea.focus()}
                ></cat-icon>
              )}
            </div>
            {this.hasHint && (
              <CatFormHint
                id={this.id}
                hint={this.hint}
                slottedHint={this.hasSlottedHint && <slot name="hint"></slot>}
                errorMap={this.errorMap}
              />
            )}
          </div>
        </div>
      </Host>
    );
  }

  private get hasHint() {
    return !!this.hint || !!this.hasSlottedHint || this.invalid;
  }

  private get invalid() {
    return this.errorMap === true || !!Object.keys(this.errorMap || {}).length;
  }

  private onInput() {
    this.value = this.textarea.value;
    this.catChange.emit(this.value);
    this.showErrorsIfTimeout();
  }

  private onFocus(event: FocusEvent) {
    this.catFocus.emit(event);
  }

  private onBlur(event: FocusEvent) {
    this.catBlur.emit(event);
    if (coerceBoolean(this.errorUpdate)) {
      this.showErrors();
    }
  }

  private showErrors() {
    this.errorMap = this.errorMapSrc;
  }

  private errorUpdateTimeoutId?: number;
  private showErrorsIfTimeout() {
    const errorUpdate = coerceNumber(this.errorUpdate, null);
    if (errorUpdate !== null) {
      typeof this.errorUpdateTimeoutId === 'number' && window.clearTimeout(this.errorUpdateTimeoutId);
      this.errorUpdateTimeoutId = window.setTimeout(() => this.showErrors(), errorUpdate);
      return true;
    }
    return false;
  }

  private showErrorsIfNoFocus() {
    const hasFocus = document.activeElement === this.hostElement || document.activeElement === this.textarea;
    if (!hasFocus) {
      this.showErrors();
    }
  }
}
