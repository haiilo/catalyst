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
  private buttonElements: HTMLCatButtonElement[] = [];

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
    this.buttonElements = Array.from(
      this.hostElement.querySelectorAll(
        ':scope > cat-button, :scope > cat-tooltip > cat-button, :scope > cat-dropdown cat-button[slot="trigger"]'
      )
    );
    this.buttonElements.forEach((element, index) => {
      element.buttonGroupPosition =
        index === 0 ? 'first' : index === this.buttonElements.length - 1 ? 'last' : 'middle';
    });
  }
}
