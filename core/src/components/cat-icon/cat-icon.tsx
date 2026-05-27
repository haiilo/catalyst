import { Component, Element, h, Prop } from '@stencil/core';
import { CAT_ICON_SET_ATTR, catIconRegistry as icons } from './cat-icon-registry';
import { findClosest } from '../../utils/find-closest';

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
  @Element() el!: HTMLElement;

  private setName: string | null = null;

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

  connectedCallback() {
    this.setName = this.findSetName();
  }

  render() {
    const svg =
      this.iconSrc ||
      (this.icon
        ? this.setName && icons.hasIcon(this.icon, this.setName)
          ? icons.getIcon(this.icon, this.setName)
          : icons.getIcon(this.icon)
        : '');
    return (
      <span
        innerHTML={svg}
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

  private findSetName(): string | null {
    return findClosest(`[${CAT_ICON_SET_ATTR}]`, this.el)?.getAttribute(CAT_ICON_SET_ATTR) ?? null;
  }
}
