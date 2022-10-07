import { Component, Element, h, Prop } from '@stencil/core';
import { setPropertyDefault } from '../../utils/setDefault';

/**
 * Badges are used to inform users of the status of an object or of an action
 * that’s been taken.
 */
@Component({
  tag: 'cat-badge',
  styleUrl: 'cat-badge.scss',
  shadow: true
})
export class CatBadge {
  @Element() hostElement!: HTMLElement;

  /**
   * The rendering style of the badge.
   */
  @Prop() variant: 'filled' | 'outlined' = 'filled';

  /**
   * The color palette of the badge.
   */
  @Prop() color: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' = 'primary';

  /**
   * The size of the badge.
   */
  @Prop() size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';

  /**
   * Use round badge edges.
   */
  @Prop() round = false;

  /**
   * Draw attention to the badge with a subtle animation.
   */
  @Prop() pulse = false;

  connectedCallback() {
    setPropertyDefault(this, 'variant');
    setPropertyDefault(this, 'color');
    setPropertyDefault(this, 'size');
  }

  render() {
    return <slot></slot>;
  }
}
