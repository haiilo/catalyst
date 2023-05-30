import { Component, Element, h, Host, Prop } from '@stencil/core';
import { setAttributeDefault } from '../../utils/setDefault';

/**
 * Informs user about important changes or conditions in the interface. Use this
 * component if you need to capture user’s attention in a prominent way.
 */
@Component({
  tag: 'cat-alert',
  styleUrl: 'cat-alert.scss',
  shadow: true
})
export class CatAlert {
  private readonly mapIcon: Map<string, string> = new Map([
    ['primary', '$cat:alert-primary'],
    ['secondary', '$cat:alert-secondary'],
    ['success', '$cat:alert-success'],
    ['warning', '$cat:alert-warning'],
    ['danger', '$cat:alert-danger']
  ]);
  private readonly mapRole: Map<string, string> = new Map([
    ['primary', 'status'],
    ['secondary', 'status'],
    ['success', 'status'],
    ['warning', 'alert'],
    ['danger', 'alert']
  ]);

  @Element() hostElement!: HTMLElement;

  /**
   * The color palette of the alert.
   */
  @Prop({ reflect: true }) color: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' = 'primary';

  /**
   * The name of an icon to be displayed in the alert.
   */
  @Prop() icon?: string;

  /**
   * Whether the icon of the alert is deactivated.
   */
  @Prop() noIcon = false;

  connectedCallback() {
    setAttributeDefault(this, 'tabindex', 0);
    setAttributeDefault(this, 'role', this.mapRole.get(this.color));
  }

  render() {
    return (
      <Host>
        {!this.noIcon && <cat-icon size="l" icon={this.icon ? this.icon : this.mapIcon.get(this.color)}></cat-icon>}
        <div class="content">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
