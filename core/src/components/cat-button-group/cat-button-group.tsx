import { Component, Element, h, Host, Prop } from '@stencil/core';

/**
 * Button groups are designed to bring together button controls that are of a
 * similar nature. For example text formatting controls.
 */
@Component({
  tag: 'cat-button-group',
  styleUrl: 'cat-button-group.scss',
  shadow: true
})
export class CatButtonGroup {
  private formElements: HTMLCatButtonElement[] = [];

  @Element() hostElement!: HTMLElement;

  /**
   * Adds an accessible label for the button group that
   * it is only shown in assistive technologies, like screen readers.
   */
  @Prop({ attribute: 'a11y-label' }) a11yLabel?: string;

  render() {
    return (
      <Host role="group" aria-label={this.a11yLabel}>
        <slot onSlotchange={this.onSlotChange.bind(this)}></slot>
      </Host>
    );
  }

  private onSlotChange(): void {
    this.formElements = Array.from(this.hostElement.querySelectorAll('cat-button'));
    this.formElements.forEach((element, index) => {
      element.buttonGroupPosition = index === 0 ? 'first' : index === this.formElements.length - 1 ? 'last' : 'middle';
    });
  }
}
