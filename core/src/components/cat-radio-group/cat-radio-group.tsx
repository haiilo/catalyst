import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, Watch } from '@stencil/core';

/**
 * A group of radio buttons.
 */
@Component({
  tag: 'cat-radio-group',
  styleUrl: 'cat-radio-group.scss',
  shadow: { delegatesFocus: true }
})
export class CatRadioGroup {
  private catRadioGroup: HTMLCatRadioElement[] = [];
  private tabIndex: string | null = null;

  @Element() hostElement!: HTMLElement;

  /**
   * The name of the radio group component.
   */
  @Prop() name?: string;

  /**
   * The value of the radio group.
   */
  @Prop({ mutable: true }) value?: string;

  /**
   * Whether this radio group is disabled.
   */
  @Prop() disabled = false;

  /**
   * Adds an accessible label for the radio group that
   * it is only shown in assistive technologies, like screen readers.
   */
  @Prop({ attribute: 'a11y-label' }) a11yLabel?: string;

  /**
   * Whether the label of the radios should appear to the left of them.
   */
  @Prop() labelLeft = false;

  /**
   * Emitted when the value is changed.
   */
  @Event() catChange!: EventEmitter<boolean | string>;

  /**
   * Emitted when the radio group received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the radio group loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  @Watch('name')
  onNameChanged(newName?: string) {
    this.catRadioGroup.forEach(catRadio => (catRadio.name = newName));
  }

  @Watch('value')
  onValueChanged(newValue?: string) {
    this.catRadioGroup.forEach(catRadio => (catRadio.checked = catRadio.value === newValue));
    this.updateTabIndex();
  }

  @Watch('disabled')
  onDisabledChanged(disabled: boolean) {
    this.catRadioGroup.forEach(catRadio => (catRadio.disabled = disabled));
  }

  @Watch('labelLeft')
  onLabelLeftChanged(labelLeft: boolean) {
    this.catRadioGroup.forEach(catRadio => {
      if (labelLeft) {
        catRadio.labelLeft = labelLeft;
      }
    });
  }

  componentWillLoad(): void {
    this.tabIndex = this.hostElement.getAttribute('tabindex');
  }

  componentDidLoad(): void {
    this.catRadioGroup = Array.from(this.hostElement.querySelectorAll(`cat-radio`));
    this.onNameChanged(this.name);
    this.onValueChanged(this.value);
    this.onDisabledChanged(this.disabled);
    this.onLabelLeftChanged(this.labelLeft);
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key) && this.catRadioGroup.length) {
      const targetElements = this.catRadioGroup.filter(catRadio => !catRadio.disabled);
      const activeElement = document.activeElement as HTMLCatRadioElement;
      const activeIdx = this.catRadioGroup.findIndex(catRadio => catRadio === activeElement);
      const activeOff = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
      const targetIdx = activeIdx < 0 ? 0 : (activeIdx + activeOff + targetElements.length) % targetElements.length;
      targetElements[targetIdx].doFocus();
      targetElements[targetIdx].shadowRoot?.querySelector('input')?.click();
      this.updateTabIndex();
      event.preventDefault();
    }
  }

  @Listen('input')
  onInput(event: MouseEvent): void {
    const radio = this.catRadioGroup.find(radio => radio === event.target);
    this.value = radio?.checked ? radio?.value : undefined;
    this.catChange.emit(this.value);
  }

  @Listen('focus', { capture: true })
  onFocus(event: FocusEvent): void {
    if (!event.relatedTarget) {
      this.catBlur.emit(event);
    }
  }

  @Listen('blur', { capture: true })
  onBlur(event: FocusEvent): void {
    if (!event.relatedTarget) {
      this.catBlur.emit(event);
    }
  }

  render() {
    return (
      <Host tabIndex={this.disabled ? '-1' : this.tabIndex || '0'}>
        <div role="radiogroup" aria-label={this.a11yLabel}>
          <slot></slot>
        </div>
      </Host>
    );
  }

  private updateTabIndex() {
    if (this.catRadioGroup.length) {
      this.catRadioGroup.forEach(value => value.shadowRoot?.querySelector('input')?.setAttribute('tabindex', '-1'));
      const checkedRadioIndex = this.catRadioGroup.findIndex(value => value.checked);
      this.catRadioGroup[checkedRadioIndex >= 0 ? checkedRadioIndex : 0].shadowRoot
        ?.querySelector('input')
        ?.setAttribute('tabindex', '0');
    }
  }
}
