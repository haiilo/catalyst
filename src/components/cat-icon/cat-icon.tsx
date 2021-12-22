import { Component, h, Host, Prop } from '@stencil/core';
import { CatIconRegistry } from './cat-icon-registry';

/**
 * Icons are used to provide additional meaning or in places where text label
 * doesn't fit.
 */
@Component({
  tag: 'cat-icon',
  styleUrl: 'cat-icon.scss'
})
export class CatIcon {
  private static readonly iconRegistry = CatIconRegistry.getInstance();

  /**
   * The name of the icon.
   */
  @Prop() name: string = '';

  /**
   * The size of the icon.
   */
  @Prop() size: 'xs' | 's' | 'm' | 'l' | 'xl' | 'inline' = 'm';

  /**
   * Adds accessible label for the spinner that is only shown for screen
   * readers. The `aria-hidden` attribute will be set if no label is present.
   */
  @Prop() a11yLabel?: string;

  render() {
    return (
      <Host
        innerHTML={CatIcon.iconRegistry.getIcon(this.name)}
        aria-label={this.a11yLabel}
        aria-hidden={this.a11yLabel ? null : 'true'}
        class={{
          'cat-icon': true,
          [`cat-icon-${this.size}`]: this.size !== 'inline'
        }}
      ></Host>
    );
  }
}
