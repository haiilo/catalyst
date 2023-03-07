import { Component, h } from '@stencil/core';

/**
 * Cards are surfaces that display content and actions on a single topic. They
 * should be easy to scan for relevant and actionable information.
 */
@Component({
  tag: 'cat-card',
  styleUrl: 'cat-card.scss',
  shadow: { delegatesFocus: true }
})
export class CatCard {
  render() {
    return <slot></slot>;
  }
}
