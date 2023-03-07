import { Component, h, Prop, Event, EventEmitter, Listen, Host, Element } from '@stencil/core';
import { Breakpoint } from '../../utils/breakpoints';

let nextUniqueId = 0;

/**
 * A single tab inside a tabs component.
 */
@Component({
  tag: 'cat-tab',
  styleUrl: 'cat-tab.scss',
  shadow: { delegatesFocus: true }
})
export class CatTab {
  @Element() hostElement!: HTMLElement;

  /**
   * The label of the tab.
   */
  @Prop({ reflect: true }) label = '';

  /**
   * The name of an icon to be displayed in the tab.
   */
  @Prop({ reflect: true }) icon?: string;

  /**
   * The SVG source of an icon to be displayed in the tab. This takes
   * precenedence over the `icon` name.
   */
  @Prop({ reflect: true }) iconSrc?: string;

  /**
   * Hide the actual button content and only display the tab.
   */
  @Prop({ reflect: true }) iconOnly: boolean | Breakpoint = false;

  /**
   * Display the icon on the right.
   */
  @Prop({ reflect: true }) iconRight = false;

  /**
   * A destination to link to, rendered in the href attribute of a link.
   */
  @Prop({ reflect: true }) href?: string;

  /**
   * Specifies where to open the linked document.
   */
  @Prop({ reflect: true }) target?: '_blank' | '_self' | '_parent' | '_top' | string;

  /**
   * Specifies that the tab should be disabled.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Attributes that will be added to the native HTML button element
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  /**
   * Emitted when tab is clicked.
   */
  @Event() tabClick!: EventEmitter<MouseEvent>;

  connectedCallback() {
    if (!this.hostElement.id) {
      this.hostElement.id = `cat-tab-${nextUniqueId++}`;
    }
  }

  @Listen('click')
  onClick(event: MouseEvent) {
    this.tabClick.emit(event);
  }

  render() {
    return <Host></Host>;
  }
}
