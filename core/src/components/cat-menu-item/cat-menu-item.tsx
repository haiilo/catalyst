import { Component, h, Host, Element, Prop } from '@stencil/core';
import { Breakpoint } from '../../utils/breakpoints';
// import { Breakpoint } from '../../utils/breakpoints';

let nextUniqueId = 0;

/**
 * A menu item component that renders as a button with proper ARIA semantics.
 */
@Component({
  tag: 'cat-menu-item',
  styleUrl: 'cat-menu-item.scss',
  shadow: true
})
export class CatMenuItem {
  private readonly _id = `cat-menu-item-${++nextUniqueId}`;
  private get id() {
    return this.identifier || this._id;
  }
  @Element() hostElement!: HTMLElement;

  /**
   * A unique identifier for the menu item.
   */
  @Prop() identifier?: string;
  /**
   * The name of an icon to be displayed in the menu item.
   */
  @Prop() icon?: string;

  /**
   * The color of the menu item.
   */
  @Prop() color?: string;

  /**
   * The loading state of the menu item.
   */
  @Prop() loading?: boolean;

  /**
   * Hide the actual button content and only display the icon.
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
   * Specifies that the menu item should be disabled.
   */
  @Prop() disabled = false;

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

  render() {
    return (
      <Host>
        <cat-button
          class="cat-nav-item"
          buttonId={this.id}
          part="menu-item"
          variant="text"
          icon={this.icon}
          iconOnly={this.iconOnly}
          iconRight={this.iconRight}
          url={this.url}
          disabled={this.disabled}
          urlTarget={this.urlTarget}
          testId={this.testId}
          nativeAttributes={{
            ...this.nativeAttributes,
            role: 'menuitem'
          }}
        >
          <slot></slot>
        </cat-button>
      </Host>
    );
  }
}
