import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch } from '@stencil/core';
import { coerceBoolean, coerceNumber } from '../../utils/coerce';
import { CatFormHint, ErrorMap } from '../cat-form-hint/cat-form-hint';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

let nextUniqueId = 0;

/**
 * An input that allows multiple values to be entered as tags.
 *
 * @part input - The native input element.
 * @part label - The native label element.
 */
@Component({
  tag: 'cat-tag',
  styleUrl: 'cat-tag.scss',
  shadow: true
})
export class CatTag {
  private readonly _id = `cat-input-${nextUniqueId++}`;
  private get id() {
    return this.identifier || this._id;
  }

  private input!: HTMLInputElement;
  private errorMapSrc?: ErrorMap | true;

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  @State() hasSlottedHint = false;

  @State() tags: string[] = [];

  @State() errorMap?: ErrorMap | true;

  /**
   * Whether the label need a marker to shown if the select is required or optional.
   */
  @Prop() requiredMarker?: 'none' | 'required' | 'optional' | 'none!' | 'optional!' | 'required!' = 'optional';

  /**
   * Whether the select is disabled.
   */
  @Prop() disabled = false;

  /**
   * The placeholder text to display within the select.
   */
  @Prop() placeholder?: string;

  /**
   * Optional hint text(s) to be displayed with the select.
   */
  @Prop() hint?: string | string[];

  /**
   * A unique identifier for the input.
   */
  @Prop() identifier?: string;

  /**
   * The label for the select.
   */
  @Prop() label = '';

  /**
   * The name of the form control. Submitted with the form as part of a name/value pair.
   */
  @Prop() name?: string;

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * A value is required or must be checked for the form to be submittable.
   */
  @Prop() required = false;

  /**
   * Attributes that will be added to the native HTML input element.
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  /**
   * The value of the control.
   */
  @Prop({ mutable: true }) value?: string[];

  /**
   * Whether the input should show a clear button.
   */
  @Prop() clearable = false;

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
   * List of characters that should create a new tag. This need to be comparable to `keydownEvent.key`.
   * Pasted values will also be split by those chars.
   * Defaults to `[' ']`.
   */
  @Prop() tagCreationChars: string[] = [' '];

  /**
   * Whether the catChange event will be emitted when the input is blurred.
   */
  @Prop() addOnBlur = false;

  /**
   * Emitted when the value is changed.
   */
  @Event() catChange!: EventEmitter<string[]>;

  /**
   * Emitted when the input received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  componentWillLoad(): void {
    this.onErrorsChanged(this.errors, undefined, false);
  }

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    const isInputFocused = this.hostElement.shadowRoot?.activeElement === this.input;
    if (['Enter', ...this.tagCreationChars].includes(event.key) && isInputFocused) {
      event.preventDefault();
      this.addInputValue();
    } else if (
      ['Backspace'].includes(event.key) &&
      this.input?.selectionStart === 0 &&
      (this.value?.length ?? 0) > 0 &&
      isInputFocused
    ) {
      this.value = this.value?.slice(0, -1) ?? [];
      this.catChange.emit(this.value);
    }
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
    return (
      <Host>
        <div class={{ 'label-container': true, hidden: this.labelHidden }}>
          {(this.hasSlottedLabel || this.label) && (
            <label htmlFor={`tags-${this.id}-input`} part="label">
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
                </div>
              </span>
            </label>
          )}
        </div>
        <div class={{ 'input-wrapper': true, 'input-disabled': this.disabled, 'input-invalid': this.invalid }}>
          {this.value?.map(value => (
            <div class="tag-pill">
              <span>{value}</span>
              {!this.disabled && (
                <cat-button
                  size="xs"
                  variant="text"
                  icon="$cat:select-clear"
                  iconOnly
                  a11yLabel={i18n.t('select.deselect')}
                  onClick={() => this.deselect(value)}
                  tabIndex={-1}
                ></cat-button>
              )}
            </div>
          ))}
          <div class="input-inner-wrapper">
            <input
              {...this.nativeAttributes}
              part="input"
              id={`tags-${this.id}-input`}
              class="tags-input"
              role="combobox"
              ref={el => (this.input = el as HTMLInputElement)}
              aria-invalid={this.invalid ? 'true' : undefined}
              aria-describedby={this.hasHint ? this.id + '-hint' : undefined}
              onInput={this.onInput.bind(this)}
              onBlur={this.onBlur.bind(this)}
              placeholder={this.placeholder}
              disabled={this.disabled}
            ></input>
            {this.clearable && !this.disabled && (this.value?.length ?? 0) > 0 && (
              <cat-button
                class="clearable"
                icon="$cat:input-close"
                icon-only="true"
                size="s"
                variant="text"
                a11y-label={i18n.t('input.clear')}
                onClick={this.clear.bind(this)}
                data-dropdown-no-close
              ></cat-button>
            )}
            {this.invalid && <cat-icon icon="$cat:input-error" class="icon-suffix cat-text-danger" size="l"></cat-icon>}
          </div>
        </div>
        {this.hasHint && (
          <CatFormHint
            id={this.id}
            hint={this.hint}
            slottedHint={this.hasSlottedHint && <slot name="hint"></slot>}
            errorMap={this.errorMap}
          />
        )}
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
    const currentValue = [
      ...new Set(this.input?.value?.split(this.createSplitRegex(this.tagCreationChars)) ?? [])
    ].filter(value => !!value && !this.value?.includes(value));
    if (currentValue.length > 1) {
      this.value = [...(this.value ?? []), ...currentValue];
      this.catChange.emit(this.value);
      if (this.input) {
        this.input.value = '';
      }
    }
  }

  private onBlur() {
    if (this.addOnBlur) {
      this.addInputValue();
    }
  }

  private addInputValue() {
    const inputValue = this.input?.value.trim();
    if (inputValue && !this.value?.includes(inputValue)) {
      this.value = [...(this.value ?? []), inputValue];
      this.catChange.emit(this.value);
    }
    if (this.input) {
      this.input.value = '';
    }
  }

  private clear() {
    this.value = [];
    this.catChange.emit(this.value);
    if (this.input) {
      this.input.value = '';
    }
  }

  private deselect(value: string) {
    this.value = this.value?.filter(element => element !== value);
    this.catChange.emit(this.value);
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
    const hasFocus = document.activeElement === this.hostElement || document.activeElement === this.input;
    if (!hasFocus) {
      this.showErrors();
    }
  }

  private createSplitRegex(delimiters: string[]): RegExp {
    // Escape special regex characters in the array
    const escapedDelimiters = delimiters.map(delimiter => delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    // Add newline characters to the list of delimiters
    escapedDelimiters.push('\\n', '\\r');

    // Join the escaped delimiters to create a character class
    const regexPattern = `[${escapedDelimiters.join('')}]`;

    return new RegExp(regexPattern, 'g');
  }
}
