import { Component, Element, h, Prop } from '@stencil/core';

/**
 * Badges are used to inform users of the status of an object or of an action
 * that’s been taken.
 */
@Component({
  tag: 'cat-badge',
  styleUrl: 'cat-badge.scss',
  shadow: { delegatesFocus: true }
})
export class CatBadge {
  @Element() hostElement!: HTMLElement;

  /**
   * The rendering style of the badge.
   */
  @Prop({ reflect: true }) variant: 'filled' | 'outlined' = 'filled';

  /**
   * The color palette of the badge.
   */
  @Prop({ reflect: true }) color: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' = 'primary';

  /**
   * The size of the badge.
   */
  @Prop({ reflect: true }) size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';

  /**
   * Use round badge edges.
   */
  @Prop() round = false;

  /**
   * Draw attention to the badge with a subtle animation.
   */
  @Prop() pulse = false;

  render() {
    return <slot></slot>;
  }
}
