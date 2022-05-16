import { Component, h, Host, Prop } from '@stencil/core';

/**
 * Informs user about important changes or conditions in the interface. Use this
 * component if you need to capture user’s attention in a prominent way.
 *
 * @part alert - The alert element.
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
      <Host tabindex="0" role={this.role}>
        <div
          part="alert"
          class={{
            alert: true,
            [`alert-${this.color}`]: Boolean(this.color)
          }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }

  private get role() {
    switch (this.color) {
      case 'danger':
      case 'warning':
        return 'alert';
      default:
        return 'status';
    }
  }
}
