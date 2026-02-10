import { Component, h, Host, Element, Prop, Method, Event, EventEmitter } from '@stencil/core';
import { Breakpoint } from '../../utils/breakpoints';

let nextUniqueId = 0;

/**
 * A menu item component that renders as a button with proper ARIA semantics.
 */
@Component({
  tag: 'cat-menu-item',
  shadow: true
})
export class CatMenuItem {
  private readonly _id = `cat-menu-item-${++nextUniqueId}`;
  private get id() {
    return this.identifier || this._id;
  }
  private button?: HTMLCatButtonElement;

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
  @Prop() color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info';

  /**
   * Whether the menu item is active.
   */
  @Prop() active = false;

  /**
   * The variant of the menu item button.
   */
  @Prop() variant: 'filled' | 'outlined' | 'text' = 'text';

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

  /**
   * Emitted when the trigger button is clicked.
   */
  @Event() catClick!: EventEmitter<MouseEvent>;

  /**
   * Programmatically move focus to the menu item.
   */
  @Method()
  async doFocus(options?: FocusOptions): Promise<void> {
    this.button?.doFocus(options);
  }

  /**
   * Programmatically remove focus from the menu item.
   */
  @Method()
  async doBlur(): Promise<void> {
    this.button?.doBlur();
  }

  render() {
    return (
      <Host>
        <li>
        <cat-button
          ref={el => (this.button = el)}
          class="cat-nav-item"
          buttonId={this.id}
          part="menu-item"
          variant={this.variant}
          icon={this.icon}
          iconOnly={this.iconOnly}
          iconRight={this.iconRight}
          url={this.url}
          disabled={this.disabled}
          urlTarget={this.urlTarget}
          loading={this.loading}
          color={this.color}
          active={this.active}
          testId={this.testId}
          nativeAttributes={{
            ...this.nativeAttributes,
            role: 'menuitem',
            tabindex: '-1'
          }}
          onCatClick={this.onCatClick}
        >
          <slot></slot>
        </cat-button>
        </li>
      </Host>
    );
  }

  private onCatClick(event: CustomEvent<MouseEvent>) {
    this.catClick.emit(event.detail);
  }
}
