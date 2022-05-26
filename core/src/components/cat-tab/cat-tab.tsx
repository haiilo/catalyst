import { Component, h, Prop, Event, EventEmitter, Listen, Host } from '@stencil/core';
import { Breakpoint } from '../../utils/breakpoints';

@Component({
  tag: 'cat-tab',
  styleUrl: 'cat-tab.scss',
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

  /**
   * A destination to link to, rendered in the href attribute of a link.
   */
  @Prop() url?: string;

  /**
   * Specifies where to open the linked document.
   */
  @Prop() urlTarget?: '_blank' | '_self';

  /**
   * Emitted when tab is clicked.
   */
  @Event() tabClick!: EventEmitter<MouseEvent>;

  @Listen('click')
  onClick(event: MouseEvent) {
    this.tabClick.emit(event);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
