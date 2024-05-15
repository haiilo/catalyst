import { Component, Event, EventEmitter, h } from '@stencil/core';

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
  /**
   * Emitted when the card and all the children are fully loaded.
   */
  @Event() catLoad!: EventEmitter<FocusEvent>;

  render() {
    return <slot></slot>;
  }

  componentDidLoad() {
    this.catLoad.emit();
  }
}
