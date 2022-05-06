import { Component, h, Prop } from '@stencil/core';
import { CatIconRegistry } from './cat-icon-registry';

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
  private readonly iconRegistry = CatIconRegistry.getInstance();

  /**
   * The name of the icon.
   */
  @Prop() icon = '';

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
        innerHTML={this.iconRegistry.getIcon(this.icon)}
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
