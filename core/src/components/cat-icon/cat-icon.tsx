import { Component, h, Prop } from '@stencil/core';
import { catIconRegistry as icons } from './cat-icon-registry';

/**
 * Icons are used to provide additional meaning or in places where text label
 * doesn't fit.
 *
 * @part icon - The span element wrapping the SVG icon.
 */
@Component({
  tag: 'cat-icon',
  styleUrl: 'cat-icon.scss',
  shadow: true
})
export class CatIcon {
  /**
   * The name of the icon.
   */
  @Prop() icon?: string;

  /**
   * The SVG source of the icon. This takes precenedence over the `icon` name.
   */
  @Prop() iconSrc?: string;

  /**
   * The size of the icon.
   */
  @Prop() size: 'xs' | 's' | 'm' | 'l' | 'xl' | 'inline' = 'm';

  /**
   * Adds accessible label for the icon that is only shown for screen
   * readers. The `aria-hidden` attribute will be set if no label is present.
   */
  @Prop({ attribute: 'a11y-label' }) a11yLabel?: string;

  render() {
    return (
      <span
        innerHTML={this.iconSrc || (this.icon ? icons.getIcon(this.icon) : '')}
        aria-label={this.a11yLabel}
        aria-hidden={this.a11yLabel ? null : 'true'}
        part="icon"
        class={{
          icon: true,
          [`icon-${this.size}`]: this.size !== 'inline'
        }}
      ></span>
    );
  }
}
