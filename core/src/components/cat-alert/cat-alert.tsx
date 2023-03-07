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
  private static readonly MAP_SVG: Map<string, string> = new Map([
    [
      'primary',
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-7.82-3.001L12 5 9.82 8.999l-4.477.838 3.129 3.31-.587 4.516L12 15.71l4.114 1.953-.586-4.517 3.13-3.31L14.18 9Z"/></svg>'
    ],
    [
      'secondary',
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm1-15a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 1 0 0-2h-4V7Z"/></svg>'
    ],
    [
      'success',
      '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm3.547-9.487a.75.75 0 1 0-1.094-1.026l-3.25 3.467L5.497 7.44a.75.75 0 1 0-.996 1.122l2.25 2a.75.75 0 0 0 1.045-.048l3.75-4Z"/></svg>'
    ],
    [
      'warning',
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.25c-.429 0-.85.113-1.22.328a2.5 2.5 0 0 0-.899.891L2.577 16.981a2.554 2.554 0 0 0-.007 2.491c.212.381.519.7.891.926a2.44 2.44 0 0 0 1.234.352h14.61a2.44 2.44 0 0 0 1.233-.352 2.5 2.5 0 0 0 .892-.926 2.553 2.553 0 0 0-.007-2.491L14.119 4.469a2.494 2.494 0 0 0-.899-.891A2.439 2.439 0 0 0 12 3.25ZM12 8a1 1 0 0 1 1 1v3.5a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Zm1 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>'
    ],
    [
      'danger',
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM8.293 8.293a1 1 0 0 1 1.414 0L12 10.586l2.293-2.293a1 1 0 1 1 1.414 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12 8.293 9.707a1 1 0 0 1 0-1.414Z"/></svg>'
    ]
  ]);
  private static readonly MAP_ROLE: Map<string, string> = new Map([
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
   * The SVG source of an icon to be displayed in the alert. This takes
   * precenedence over the `icon` name.
   */
  @Prop() iconSrc?: string;

  /**
   * Whether the icon of the alert is deactivated.
   */
  @Prop() noIcon = false;

  connectedCallback() {
    setAttributeDefault(this, 'tabindex', 0);
    setAttributeDefault(this, 'role', CatAlert.MAP_ROLE.get(this.color));
  }

  render() {
    return (
      <Host>
        {!this.noIcon && (
          <cat-icon
            size="l"
            icon={this.icon}
            iconSrc={this.getIconSrc(this.icon, this.iconSrc, CatAlert.MAP_SVG.get(this.color))}
          ></cat-icon>
        )}
        <div class="content">
          <slot></slot>
        </div>
      </Host>
    );
  }

  private getIconSrc(icon: string | undefined, iconSrc: string | undefined, iconDefault: string | undefined) {
    if (icon) {
      return undefined;
    } else if (iconSrc) {
      return iconSrc;
    }
    return iconDefault;
  }
}
