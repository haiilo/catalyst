import { Component, Element, h, Host, Prop } from '@stencil/core';
import log from 'loglevel';

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

  componentWillRender(): void {
    if (!this.a11yLabel) {
      log.warn('[A11y] Missing ARIA label on button group', this);
    }
  }

  render() {
    return (
      <Host role="group" aria-label={this.a11yLabel}>
        <slot></slot>
      </Host>
    );
  }

  componentDidLoad() {
    this.formElements = Array.from(this.hostElement.querySelectorAll('cat-button')) as HTMLCatButtonElement[];

    this.formElements.forEach((element, index) => {
      element.buttonGroupPosition = index === 0 ? 'first' : index === this.formElements.length - 1 ? 'last' : 'middle';
    });
  }
}
