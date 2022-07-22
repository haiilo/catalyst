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
  private readonly mapIcon: Map<string, string> = new Map([
    ['primary', 'star-circle-filled'],
    ['secondary', 'clock-filled'],
    ['success', 'check-circle-filled'],
    ['warning', 'danger-filled'],
    ['danger', 'cross-circle-filled']
  ]);

  /**
   * The color palette of the alert.
   */
  @Prop() color: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' = 'primary';

  /**
   * The name of an icon to be displayed in the alert.
   */
  @Prop() icon?: string;

  /**
   * Whether the icon of the alert  is deactivated.
   */
  @Prop() iconDeactivated = false;

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
          {!this.iconDeactivated && (
            <cat-icon size="l" icon={this.icon ? this.icon : this.mapIcon.get(this.color)}></cat-icon>
          )}
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
