import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import log from 'loglevel';
import { CatFormHint } from '../cat-form-hint/cat-form-hint';

let nextUniqueId = 0;

/**
 * Toggles are graphical interface switches that give user control over a
 * feature or option that can be turned on or off.
 *
 * @slot hint - Optional hint element to be displayed with the toggle.
 * @slot label - The slotted label. If both the label property and the label slot are present, only the label slot will be displayed.
 * @part toggle - The toggle element.
 * @part label - The label content.
 */
@Component({
  tag: 'cat-toggle',
  styleUrls: ['cat-toggle.scss'],
  shadow: true
})
export class CatToggle {
  private readonly _id = `cat-toggle-${nextUniqueId++}`;
  private get id() {
    return this.identifier || this._id;
  }

  private input!: HTMLInputElement;

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  @State() hasSlottedHint = false;

  /**
   * Checked state of the toggle.
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * Disabled state of the toggle.
   */
  @Prop() disabled = false;

  /**
   * A unique identifier for the input.
   */
  @Prop() identifier?: string;

  /**
   * The label of the toggle that is visible.
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
   * Required state of the toggle.
   */
  @Prop() required = false;

  /**
   * The value of the toggle.
   */
  @Prop() value?: string;

  /**
   * The resolved value of the toggle, based on the checked state and value.
   */
  @Prop({ mutable: true }) resolvedValue: string | boolean | null = null;

  /**
   * Optional hint text(s) to be displayed with the toggle.
   */
  @Prop() hint?: string | string[];

  /**
   * Whether the label should appear to the left of the toggle.
   */
  @Prop() labelLeft = false;

  /**
   * Attributes that will be added to the native HTML input element.
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  /**
   * Emitted when the checked status of the toggle is changed.
   */
  @Event() catChange!: EventEmitter<boolean | string | null>;

  /**
   * Emitted when the toggle received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the toggle loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  componentWillLoad() {
    this.updateResolved();
  }

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    if (!this.label && !this.hasSlottedLabel) {
      log.warn('[A11y] Missing ARIA label on toggle', this);
    }
  }

  /**
   * Programmatically move focus to the toggle. Use this method instead of
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
   * Programmatically remove focus from the toggle. Use this method instead of
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
          class={{ 'is-hidden': this.labelHidden, 'is-disabled': this.disabled, 'label-left': this.labelLeft }}
        >
          <input
            {...this.nativeAttributes}
            ref={el => (this.input = el as HTMLInputElement)}
            id={this.id}
            type="checkbox"
            name={this.name}
            value={this.value}
            checked={this.checked}
            required={this.required}
            disabled={this.disabled}
            class="form-check-input"
            role="switch"
            onInput={this.onInput.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            aria-describedby={(this.hint || this.hasSlottedHint)
              ? this.id + '-hint'
              : undefined}
          />
          <span class="toggle" part="toggle"></span>
          <span class="label" part="label">
            {(this.hasSlottedLabel && <slot name="label"></slot>) || this.label}
          </span>
        </label>
        {(this.hint || this.hasSlottedHint) && (
          <div class={{ 'hint-wrapper': true, 'label-left': this.labelLeft }}>
            <div class="toggle-placeholder"></div>
            <CatFormHint id={this.id} hint={this.hint} slottedHint={this.hasSlottedHint && <slot name="hint"></slot>} />
          </div>
        )}
      </Host>
    );
  }

  private onInput() {
    this.checked = this.input.checked;
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
    this.resolvedValue = this.value == null ? this.checked : this.checked ? this.value : null;
  }
}
