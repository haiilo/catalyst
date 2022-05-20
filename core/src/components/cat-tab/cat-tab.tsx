import { Component, Host, h, Prop } from '@stencil/core';
import { Breakpoint } from '../../utils/breakpoints';

@Component({
  tag: 'cat-tab',
  styleUrl: 'cat-tab.css',
  shadow: true
})
export class CatTab {
  /**
   * The label of the tab
   */
  @Prop() label = '';

  /**
   * Activate the tab
   */
  @Prop() active = false;

  /**
   * The name of an icon to be displayed in the tab.
   */
  @Prop() icon?: string;

  /**
   * Hide the actual button content and only display the tab.
   */
  @Prop() iconOnly: boolean | Breakpoint = false;

  /**
   * Display the icon on the right.
   */
  @Prop() iconRight = false;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
