import { Component, Host, h, State, Prop, Event, EventEmitter, Listen, Element, Watch } from '@stencil/core';
import { coerceBoolean, coerceNumber } from '../../utils/coerce';
import { CatFormHint, ErrorMap } from '../cat-form-hint/cat-form-hint';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

let nextUniqueId = 0;

@Component({
  tag: 'cat-tag',
  styleUrl: 'cat-tag.scss',
  shadow: true,
})
export class CatTag {

  private readonly _id = `cat-input-${nextUniqueId++}`;

  private input?: HTMLInputElement;
  private errorMapSrc?: ErrorMap;

  private get id() {
    return this.identifier || this._id;
  }

  private get invalid() {
    return !!Object.keys(this.errorMap || {}).length;
  }

  private get hasHint() {
    return !!this.hint || this.invalid;
  }

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;
  @State() hasSlottedHint = false;

  @State() tags: string[] = [];

  @State() errorMap?: ErrorMap;


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
   * errors on change with the given delay in milliseconds.
   */
  @Prop() errorUpdate: boolean | number = 0;

  /**
   * List of characters that should create a new tag. This need to be comparable to `keydownEvent.key`.
   * Pasted values will also be split by those chars.
   * Defaults to `[' ']`.
   */
  @Prop() tagCreationChars: string[] = [' ']


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

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    if (['Enter', ...this.tagCreationChars].includes(event.key)) {
      event.preventDefault();
      if (this.input?.value.trim() && !this.value?.includes(this.input?.value.trim())) {
        this.value = [...(this.value ?? []), this.input.value.trim()]
        this.catChange.emit(this.value);
      }
      if(this.input) {
        this.input.value = ''
      }
    } else if (['Backspace'].includes(event.key) && this.input?.selectionStart === 0 && (this.value?.length ?? 0) > 0) {
      this.value = this.value?.slice(0, -1) ?? [];
      this.catChange.emit(this.value);
    }
  }

  @Watch('errors')
  onErrorsChanged(value?: boolean | string[] | ErrorMap) {
    console.log('error changed', value, this.errors)
    if (!coerceBoolean(this.errorUpdate)) {
      this.errorMap = undefined;
    } else {
      this.errorMapSrc = Array.isArray(value)
        ? (value as string[]).reduce((acc, err) => ({ ...acc, [err]: undefined }), {})
        : value === true
          ? {}
          : value || undefined;
      this.showErrorsIfTimeout() || this.showErrorsIfNoFocus();
    }
  }

  componentWillRender(): void {
    this.onErrorsChanged(this.errors);
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
  }

  render() {
    return (
      <Host>
        <div class={ { 'label-container': true, hidden: this.labelHidden } }>
          { (this.hasSlottedLabel || this.label) && (
            <label htmlFor={ `tags-${ this.id }-input` } part="label">
                <span class="label-wrapper">
                  { (this.hasSlottedLabel && <slot name="label"></slot>) || this.label }
                  <div class="label-metadata">
                    { !this.required && (this.requiredMarker ?? 'optional').startsWith('optional') && (
                      <span class="label-optional" aria-hidden="true">
                        ({ i18n.t('input.optional') })
                      </span>
                    ) }
                    { this.required && this.requiredMarker?.startsWith('required') && (
                      <span class="label-optional" aria-hidden="true">
                        ({ i18n.t('input.required') })
                      </span>
                    ) }
                  </div>
                </span>
            </label>
          ) }
        </div>
        <div class={{ 'input-wrapper': true, 'input-disabled': this.disabled, 'input-invalid': this.invalid }}>
          { this.value?.map(value => (
            <div class="tag-pill">
              <span>{ value }</span>
              { !this.disabled && (<cat-button
                size="xs"
                variant="text"
                icon="$cat:select-clear"
                iconOnly
                a11yLabel={ i18n.t('select.deselect') }
                onClick={ () => this.deselect(value) }
                tabIndex={ -1 }
              ></cat-button>)}
            </div>)
          ) }
          <input
            { ...this.nativeAttributes }
            part="input"
            id={ `tags-${ this.id }-input` }
            class="tags-input"
            role="combobox"
            ref={ el => (this.input = el) }
            aria-invalid={ this.invalid ? 'true' : undefined }
            aria-describedby={ this.hasHint ? this.id + '-hint' : undefined }
            onInput={ this.onInput.bind(this) }
            placeholder={ this.placeholder }
            disabled={ this.disabled }
          ></input>
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

  private onInput() {
    const currentValue =  [...new Set((this.input?.value?.split(this.createSplitRegex(this.tagCreationChars)) ?? []))].filter(value =>
      !!value &&
      !this.value?.includes(value)
    );
    if (currentValue.length > 1) {
      this.value = [...(this.value ?? []), ...currentValue]
      console.log(this.input?.value, this.value);
      this.catChange.emit(this.value);
      if(this.input) {
        this.input.value = ''
      }
    }
  }

  private deselect(value: string) {
    this.value = this.value?.filter(element => element !== value);
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
    const escapedDelimiters = delimiters.map(delimiter =>
      delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );

    // Join the escaped delimiters to create a character class
    const regexPattern = `[${escapedDelimiters.join('')}]`;

    // Return a new RegExp object with the global flag for splitting
    return new RegExp(regexPattern, 'g');
  }
}
