import { Component, h, Prop } from '@stencil/core';

/**
 * Badges are used to draw attention and display statuses or counts.
 *
 * @part badge - The content of the badge.
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
          'cat-badge': true,
          'cat-badge-round': this.round,
          'cat-badge-pulse': this.pulse,
          [`cat-badge-${this.variant}`]: Boolean(this.variant),
          [`cat-badge-${this.color}`]: Boolean(this.color),
          [`cat-badge-${this.size}`]: Boolean(this.size)
        }}
      >
        <slot></slot>
      </span>
    );
  }
}
