import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import log from 'loglevel';
import { CatFormHint } from '../cat-form-hint/cat-form-hint';

let nextUniqueId = 0;

/**
 * Radio Buttons are graphical interface elements that allow user to choose
 * only one of a predefined set of mutually exclusive options.
 *
 * @slot hint - Optional hint element to be displayed with the radio.
 * @slot label - The slotted label. If both the label property and the label slot are present, only the label slot will be displayed.
 * @part label - The label content.
 */
@Component({
  tag: 'cat-radio',
  styleUrl: 'cat-radio.scss',
  shadow: true
})
export class CatRadio {
  private readonly id = `cat-radio-${++nextUniqueId}`;
  private input!: HTMLInputElement;
  private catRadioGroup!: HTMLCatRadioElement[];

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  /**
   * Whether this radio is checked.
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * Whether this radio is disabled.
   */
  @Prop() disabled = false;

  /**
   * The label of the radio that is visible.
   */
  @Prop() label = '';

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * The name of the radio component.
   */
  @Prop() name?: string;

  /**
   * Whether the radio is required.
   */
  @Prop() required = false;

  /**
   * The value of the radio component.
   */
  @Prop({ mutable: true }) value?: string;

  /**
   * Optional hint text(s) to be displayed with the radio.
   */
  @Prop() hint?: string | string[];

  @Watch('checked')
  onCheckedChanged(newValue: boolean) {
    if (this.catRadioGroup.length && newValue) {
      const catRadioSiblingGroup = this.catRadioGroup.filter(catRadio => catRadio !== this.hostElement);
      catRadioSiblingGroup.forEach(catRadio => (catRadio.checked = false));
    }
  }

  /**
   * Emitted when the radio is changed.
   */
  @Event() catChange!: EventEmitter;

  /**
   * Emitted when the radio received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the radio loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  componentWillLoad() {
    this.catRadioGroup = Array.from(document.querySelectorAll(`cat-radio[name="${this.name}"]`));
    this.onCheckedChanged(this.checked);
  }

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    if (!this.label && !this.hasSlottedLabel) {
      log.error('[A11y] Missing ARIA label on radio', this);
    }
  }

  componentDidRender(): void {
    if (this.catRadioGroup.length) {
      let tabIndex;
      if (this.catRadioGroup.some(value1 => value1.checked)) {
        tabIndex = this.checked ? '0' : '-1';
      } else {
        tabIndex = this.catRadioGroup[0] === this.hostElement ? '0' : '-1';
      }
      this.input.setAttribute('tabindex', tabIndex);
    }
  }

  /**
   * Sets focus on the radio. Use this method instead of `radio.focus()`.
   *
   * @param options An optional object providing options to control aspects of
   * the focusing process.
   */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    this.input.focus(options);
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key) && this.catRadioGroup.length) {
      const targetElements = this.catRadioGroup;
      const activeIdx = this.catRadioGroup.findIndex(value1 => value1 === this.hostElement);
      const activeOff = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
      const targetIdx = activeIdx < 0 ? 0 : (activeIdx + activeOff + targetElements.length) % targetElements.length;
      targetElements[targetIdx].setFocus();
      targetElements[targetIdx].shadowRoot?.querySelector('input')?.click();
      event.preventDefault();
    }
  }

  render() {
    return (
      <Host>
        <label
          htmlFor={this.id}
          class={{ 'is-hidden': this.labelHidden, 'is-disabled': this.disabled }}
          role="radio"
          aria-checked={this.checked ? 'true' : 'false'}
        >
          <span class="radio">
            <input
              ref={el => (this.input = el as HTMLInputElement)}
              id={this.id}
              type="radio"
              name={this.name}
              value={this.value}
              checked={this.checked}
              required={this.required}
              disabled={this.disabled}
              onClick={this.onClick.bind(this)}
              onInput={this.onChange.bind(this)}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
            />
            <span class="circle"></span>
          </span>
          <span class="label" part="label">
            {(this.hasSlottedLabel && <slot name="label"></slot>) || this.label}
          </span>
        </label>
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

  private onClick() {
    this.checked = true;
  }

  private onChange(event: Event) {
    this.value = this.input.value;
    this.catChange.emit(event);
  }

  private onFocus(event: FocusEvent) {
    this.catFocus.emit(event);
  }

  private onBlur(event: FocusEvent) {
    this.catBlur.emit(event);
  }
}
