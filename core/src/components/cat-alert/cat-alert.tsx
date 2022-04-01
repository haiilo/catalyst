import { Component, h, Prop } from '@stencil/core';

/**
 * Alerts are used to display important messages inline.
 */
@Component({
  tag: 'cat-alert',
  styleUrl: 'cat-alert.scss',
  shadow: true
})
export class CatAlert {
  /**
   * The color palette of the alert.
   */
  @Prop() color: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' = 'primary';

  render() {
    return (
      <div
        part="alert"
        class={{
          'cat-alert': true,
          [`cat-alert-${this.color}`]: Boolean(this.color)
        }}
      >
        <slot></slot>
      </div>
    );
  }
}
