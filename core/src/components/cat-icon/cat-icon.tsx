import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { CatIconRequestDetail } from './cat-icon-request';

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

    const event = new CustomEvent<CatIconRequestDetail>('cat-icon-request', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.icon,
        resolve: (svg: string) => {
          this.resolvedSvg = svg;
        }
      }
    });

    this.el.dispatchEvent(event);
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
