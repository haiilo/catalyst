import { Component, Host, h } from '@stencil/core';

/**
 * Cards are surfaces that display content and actions on a single topic. They
 * should be easy to scan for relevant and actionable information.
 */
@Component({
  tag: 'cat-card',
  styleUrl: 'cat-card.scss',
  shadow: true
})
export class CatCard {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
