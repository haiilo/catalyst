import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import { CatFormHint } from '../cat-form-hint/cat-form-hint';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';

let nextUniqueId = 0;

/**
 * Checkboxes are used to let a user choose one or more options from a limited
 * number of options.
 *
 * @slot hint - Optional hint element to be displayed with the checkbox.
 * @slot label - The slotted label. If both the label property and the label slot are present, only the label slot will be displayed.
 * @part label - The label content.
 * @part input - The native input element.
 */
@Component({
  tag: 'cat-checkbox',
  styleUrls: ['cat-checkbox.scss'],
  shadow: true
})
export class CatCheckbox {
  private readonly _id = `cat-checkbox-${nextUniqueId++}`;
  private get id() {
    return this.identifier || this._id;
  }

  private input!: HTMLInputElement;

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  @State() hasSlottedHint = false;

  /**
   * Checked state of the checkbox
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * Indeterminate state of the checkbox
   */
  @Prop({ mutable: true }) indeterminate = false;

  /**
   * Disabled state of the checkbox
   */
  @Prop() disabled = false;

  /**
   * A unique identifier for the input.
   */
  @Prop() identifier?: string;

  /**
   * Label of the checkbox which is presented in the UI
   */
  @Prop() label = '';

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * The name of the input.
   */
  @Prop() name?: string;

  /**
   * Required state of the checkbox.
   */
  @Prop() required = false;

  /**
   * The value of the checked checkbox.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop() value?: any;

  /**
   * The value of the unchecked checkbox.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop() noValue?: any;

  /**
   * The resolved value of the checkbox, based on the checked state and value.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop({ mutable: true }) resolvedValue: any = null;

  /**
   * Optional hint text(s) to be displayed with the checkbox.
   */
  @Prop() hint?: string | string[];

  /**
   * Whether the label should appear to the left of the checkbox.
   */
  @Prop() labelLeft = false;

  /**
   * The alignment of the checkbox.
   */
  @Prop() alignment: 'center' | 'top' | 'bottom' = 'top';

  /**
   * Attributes that will be added to the native HTML input element.
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  /**
   * Whether the label need a marker to shown if the input is required or optional.
   */
  @Prop() requiredMarker?: 'none' | 'required' | 'optional' | 'none!' | 'optional!' | 'required!' = 'none';

  /**
   * Emitted when the checked status of the checkbox is changed.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Event() catChange!: EventEmitter<any>;

  /**
   * Emitted when the checkbox received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the checkbox loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  componentWillLoad() {
    this.updateResolved();
  }

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
  }

  /**
   * Programmatically move focus to the checkbox. Use this method instead of
   * `input.focus()`.
   *
   * @param options An optional object providing options to control aspects of
   * the focusing process.
   */
  @Method()
  async doFocus(options?: FocusOptions): Promise<void> {
    this.input.focus(options);
  }

  /**
   * Programmatically remove focus from the checkbox. Use this method instead of
   * `input.blur()`.
   */
  @Method()
  async doBlur(): Promise<void> {
    this.input.blur();
  }

  render() {
    return (
      <Host>
        <label
          htmlFor={this.id}
          class={{
            'is-hidden': this.labelHidden,
            'is-disabled': this.disabled,
            'label-left': this.labelLeft,
            'align-center': this.alignment === 'center',
            'align-end': this.alignment === 'bottom'
          }}
        >
          <input
            {...this.nativeAttributes}
            part="input"
            ref={el => (this.input = el as HTMLInputElement)}
            id={this.id}
            type="checkbox"
            name={this.name}
            value={this.value}
            checked={this.checked}
            required={this.required}
            disabled={this.disabled}
            indeterminate={this.indeterminate}
            onInput={this.onInput.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            aria-describedby={this.hasHint ? this.id + '-hint' : undefined}
          />
          <span class="box" aria-hidden="true">
            <svg class="check" viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
            <svg class="dash" viewBox="0 0 12 10">
              <polyline points="1.5 5 10.5 5"></polyline>
            </svg>
          </span>
          <span class={{ 'label': true, 'label-wrapper': !this.hasSlottedLabel }} part="label">
            {(this.hasSlottedLabel && <slot name="label"></slot>) || this.label}
            <span class="label-metadata">
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
            </span>
          </span>
        </label>
        {this.hasHint && (
          <div class={{ 'hint-wrapper': true, 'label-left': this.labelLeft }}>
            <div class="box-placeholder"></div>
            <CatFormHint id={this.id} hint={this.hint} slottedHint={this.hasSlottedHint && <slot name="hint"></slot>} />
          </div>
        )}
      </Host>
    );
  }

  private get hasHint() {
    return !!this.hint || !!this.hasSlottedHint;
  }

  private onInput() {
    this.checked = this.input.checked;
    this.indeterminate = this.input.indeterminate;
    this.updateResolved();
    this.catChange.emit(this.resolvedValue);
  }

  private onFocus(event: FocusEvent) {
    this.catFocus.emit(event);
  }

  private onBlur(event: FocusEvent) {
    this.catBlur.emit(event);
  }

  private updateResolved() {
    this.resolvedValue = this.checked ? this.value ?? true : this.noValue ?? false;
  }
}
