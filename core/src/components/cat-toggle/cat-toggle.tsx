import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import { CatFormHint } from '../cat-form-hint/cat-form-hint';

let nextUniqueId = 0;

/**
 * Toggles are graphical interface switches that give user control over a
 * feature or option that can be turned on or off.
 *
 * @slot hint - Optional hint element to be displayed with the toggle.
 * @slot label - The slotted label. If both the label property and the label slot are present, only the label slot will be displayed.
 * @part label - The label content.
 * @part input - The native input element.
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
   * The value of the checked toggle.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop() value?: any;

  /**
   * The value of the unchecked toggle.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop() noValue?: any;

  /**
   * The resolved value of the toggle, based on the checked state, value and noValue.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop({ mutable: true }) resolvedValue: any = null;

  /**
   * Optional hint text(s) to be displayed with the toggle.
   */
  @Prop() hint?: string | string[];

  /**
   * Whether the label should appear to the left of the toggle.
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
   * Emitted when the checked status of the toggle is changed.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Event() catChange!: EventEmitter<any>;

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
            class="form-check-input"
            role="switch"
            onInput={this.onInput.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            aria-describedby={this.hasHint ? this.id + '-hint' : undefined}
          />
          <span class="toggle"></span>
          <span class="label" part="label">
            {(this.hasSlottedLabel && <slot name="label"></slot>) || this.label}
          </span>
        </label>
        {this.hasHint && (
          <div class={{ 'hint-wrapper': true, 'label-left': this.labelLeft }}>
            <div class="toggle-placeholder"></div>
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
    this.resolvedValue = this.checked ? (this.value ?? true) : (this.noValue ?? false);
  }
}
