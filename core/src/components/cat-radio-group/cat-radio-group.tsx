import { Component, h, Prop, Element, Listen, Watch } from '@stencil/core';

@Component({
  tag: 'cat-radio-group',
  styleUrl: 'cat-radio-group.scss',
  shadow: true
})
export class CatRadioGroup {
  private catRadioGroup: HTMLCatRadioElement[] = [];

  @Element() hostElement!: HTMLElement;

  /**
   * The name of the radio group component.
   */
  @Prop() name?: string;

  /**
   * Whether this radio group is disabled.
   */
  @Prop() disabled = false;

  /**
   * Adds an accessible label for the radio group that
   * it is only shown in assistive technologies, like screen readers.
   */
  @Prop({ attribute: 'a11y-label' }) a11yLabel?: string;

  @Prop() labelLeft = false;

  @Watch('name')
  onNameChanged(newName?: string) {
    this.catRadioGroup.forEach(catRadio => {
      catRadio.name = newName;
    });
  }

  @Watch('disabled')
  onDisabledChanged(disabled: boolean) {
    this.catRadioGroup.forEach(catRadio => {
      if (disabled) {
        catRadio.disabled = disabled;
      }
    });
  }

  @Watch('labelLeft')
  onLabelLeftChanged(labelLeft: boolean) {
    this.catRadioGroup.forEach(catRadio => {
      if (labelLeft) {
        catRadio.labelLeft= labelLeft;
      }
    });
  }

  componentDidLoad(): void {
    this.catRadioGroup = Array.from(this.hostElement.querySelectorAll(`cat-radio`));
    this.onNameChanged(this.name);
    this.onDisabledChanged(this.disabled);
    this.onLabelLeftChanged(this.labelLeft);
    this.updateTabIndex();
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key) && this.catRadioGroup.length) {
      const targetElements = this.catRadioGroup.filter(catRadio => !catRadio.disabled);
      const activeElement = document.activeElement as HTMLCatRadioElement;
      const activeIdx = this.catRadioGroup.findIndex(catRadio => catRadio === activeElement);
      const activeOff = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
      const targetIdx = activeIdx < 0 ? 0 : (activeIdx + activeOff + targetElements.length) % targetElements.length;
      targetElements[targetIdx].setFocus();
      targetElements[targetIdx].shadowRoot?.querySelector('input')?.click();
      this.updateTabIndex();
      event.preventDefault();
    }
  }

  @Listen('input')
  onInput(event: MouseEvent): void {
    const catRadioElement = this.catRadioGroup.find(value => value === event.target);
    if (catRadioElement && catRadioElement.checked) {
      const catRadioElements = this.catRadioGroup.filter(value => value !== catRadioElement);
      catRadioElements.forEach(value => (value.checked = false));
      this.updateTabIndex();
    }
  }

  render() {
    return (
        <div role="radiogroup" aria-label={this.a11yLabel}>
          <slot></slot>
        </div>
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
