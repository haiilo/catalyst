import { Component, h, Prop, Event, EventEmitter, Listen, Host, Element } from '@stencil/core';
import { Breakpoint } from '../../utils/breakpoints';

let nextUniqueId = 0;

@Component({
  tag: 'cat-tab',
  styleUrl: 'cat-tab.scss',
  shadow: true
})
export class CatTab {
  @Element() hostElement!: HTMLElement;

  /**
   * The label of the tab.
   */
  @Prop() label = '';

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
   * Specifies that the tab should be deactivated.
   */
  @Prop() deactivated = false;

  /**
   * Emitted when tab is clicked.
   */
  @Event() tabClick!: EventEmitter<MouseEvent>;

  connectedCallback() {
    if (!this.hostElement.id) this.hostElement.id = `cat-tab-${nextUniqueId++}`;
  }

  @Listen('click')
  onClick(event: MouseEvent) {
    this.tabClick.emit(event);
  }

  render() {
    return <Host></Host>;
  }
}
