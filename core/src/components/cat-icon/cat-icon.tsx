import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { CatIconRequestDetail } from './cat-icon-request';
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
  @Element() el!: HTMLElement;

  @State() private resolvedSvg?: string;

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

  componentWillLoad() {
    this.resolveIcon();
  }

  @Watch('icon')
  @Watch('iconSrc')
  resolveIcon() {
    if (this.iconSrc || !this.icon) {
      this.resolvedSvg = undefined;
      return;
    }

    const name = this.icon;
    let resolved = false;

    const event = new CustomEvent<CatIconRequestDetail>('cat-icon-request', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        name,
        resolve: (svg: string) => {
          this.resolvedSvg = svg;
          resolved = true;
        }
      }
    });

    const notCancelled = this.el.dispatchEvent(event);

    if (notCancelled) {
      // No cat-icon-provider in the ancestry — use the global registry directly
      // (preserves the pre-existing behavior for apps that don't use providers).
      this.resolvedSvg = icons.getIcon(name);
    } else if (!resolved) {
      // A provider took ownership but could not find the icon in any registry.
      this.resolvedSvg = undefined;
    }
  }

  render() {
    return (
      <span
        innerHTML={this.iconSrc || this.resolvedSvg || ''}
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
