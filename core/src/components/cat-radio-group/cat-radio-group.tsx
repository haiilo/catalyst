import { Component, Host, h, Prop, Element, Listen } from '@stencil/core';

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

  componentDidLoad(): void {
    this.catRadioGroup = Array.from(this.hostElement.querySelectorAll(`cat-radio`));
    this.catRadioGroup.forEach(catRadio => {
      if (this.disabled) {
        catRadio.disabled = this.disabled;
      }
      catRadio.name = this.name;
    });
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

  @Listen('click')
  onClick(event: MouseEvent): void {
    const catRadioElement = this.catRadioGroup.find(value => value === event.target);
    if (catRadioElement && catRadioElement.checked) {
      const catRadioElements = this.catRadioGroup.filter(value => value !== catRadioElement);
      catRadioElements.forEach(value => (value.checked = false));
      this.updateTabIndex();
    }
  }

  render() {
    return (
      <Host role="radiogroup">
        <slot></slot>
      </Host>
    );
  }

  private updateTabIndex() {
    if (this.catRadioGroup.length) {
      this.catRadioGroup.forEach(value => value.shadowRoot?.querySelector('input')?.setAttribute('tabindex', '-1'));
      const checkedRadioIndex = this.catRadioGroup.findIndex(value => value.checked);
      this.catRadioGroup[checkedRadioIndex >= -1 ? checkedRadioIndex : 0].shadowRoot
        ?.querySelector('input')
        ?.setAttribute('tabindex', '0');
    }
  }
}
