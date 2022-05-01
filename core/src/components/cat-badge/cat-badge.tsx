import { Component, h, Prop } from '@stencil/core';

/**
 * Badges are used to inform users of the status of an object or of an action
 * that’s been taken.
 *
 * @part badge - The badge element.
 */
@Component({
  tag: 'cat-badge',
  styleUrl: 'cat-badge.scss',
  shadow: true
})
export class CatBadge {
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

  render() {
    return (
      <span
        part="badge"
        class={{
          badge: true,
          'badge-round': this.round,
          'badge-pulse': this.pulse,
          [`badge-${this.variant}`]: Boolean(this.variant),
          [`badge-${this.color}`]: Boolean(this.color),
          [`badge-${this.size}`]: Boolean(this.size)
        }}
      >
        <slot></slot>
      </span>
    );
  }
}
