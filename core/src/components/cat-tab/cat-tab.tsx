import { Component, h, Prop, Event, EventEmitter, Listen, Host, Element } from '@stencil/core';
import { Breakpoint } from '../../utils/breakpoints';

let nextUniqueId = 0;

/**
 * A single tab inside a tabs component.
 */
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
  @Prop({ reflect: true }) label = '';

  /**
   * The name of an icon to be displayed in the tab.
   */
  @Prop({ reflect: true }) icon?: string;

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
  @Prop({ reflect: true }) url?: string;

  /**
   * Specifies where to open the linked document.
   */
  @Prop({ reflect: true }) urlTarget?: '_blank' | '_self';

  /**
   * Specifies that the tab should be deactivated.
   */
  @Prop({ reflect: true }) deactivated = false;

  /**
   * Specifies that the tab does not have an active state and thus cannot be
   * activated. This does not mean, that the tab is deactivated. The tab can
   * still be clicked and emit the `catClick` event. This is helpful if a tab
   * should only trigger a click action (such as opening a modal).
   */
  @Prop({ reflect: true }) noActive = false;

  /**
   * Specifies that the tab is always visible in adaptive mode.
   * Only the first sticky tab will be taken into account.
   * Sticky has advantage on activeTabAlwaysVisible if there is no space to show both.
   */
  @Prop({ reflect: true }) sticky = false;

  /**
   * Specifies that the tab content pane contains an error. This will color
   * the tab in an error state and also switch to an error icon if an icon
   * is specified.
   */
  @Prop({ reflect: true }) error = false;

  /**
   * Attributes that will be added to the native HTML button element
   */
  @Prop() nativeAttributes?: { [key: string]: string };

  /**
   * A unique identifier for the underlying native element that is used for
   * testing purposes. The attribute is added as `data-test` attribute and acts
   * as a shorthand for `nativeAttributes={ 'data-test': 'test-Id' }`.
   */
  @Prop() testId?: string;

  /**
   * Emitted when tab is clicked.
   */
  @Event() catClick!: EventEmitter<MouseEvent>;

  connectedCallback() {
    if (!this.hostElement.id) {
      this.hostElement.id = `cat-tab-${nextUniqueId++}`;
    }
  }

  @Listen('click')
  onClick(event: MouseEvent) {
    this.catClick.emit(event);
  }

  render() {
    return <Host></Host>;
  }
}
