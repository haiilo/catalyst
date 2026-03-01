import { Placement } from '@floating-ui/dom';
import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop } from '@stencil/core';
import { Breakpoint } from '../../utils/breakpoints';

/**
 * A menu component that provides a dropdown with a built-in configurable trigger button
 * and proper ARIA semantics and keyboard navigation for menu items.
 *
 * The trigger is always a cat-button with sensible defaults but fully configurable
 * through trigger-specific props.
 */
@Component({
  tag: 'cat-menu',
  styleUrl: 'cat-menu.scss',
  shadow: true
})
export class CatMenu {
  private dropdown?: HTMLCatDropdownElement;
  private catMenuItems: HTMLCatMenuItemElement[] = [];
  private mutationObserver?: MutationObserver;

  @Element() hostElement!: HTMLElement;

  /**
   * The placement of the dropdown.
   */
  @Prop() placement: Placement = 'bottom-start';

  /**
   * The arrow key navigation direction for menu items.
   */
  @Prop() arrowNavigation: 'horizontal' | 'vertical' = 'vertical';

  /**
   * The trigger button variant.
   */
  @Prop() triggerVariant: 'filled' | 'outlined' | 'text' = 'text';

  /**
   * The trigger button size.
   */
  @Prop() triggerSize: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';

  /**
   * The trigger button icon.
   */
  @Prop() triggerIcon?: string;

  /**
   * Show only the icon in the trigger button.
   */
  @Prop() triggerIconOnly?: boolean | Breakpoint;

  /**
   * The trigger button label.
   */
  @Prop() triggerLabel?: string;

  /**
   * The color palette of the trigger button.
   */
  @Prop() triggerColor: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger' = 'secondary';

  /**
   * The trigger button accessibility label. If not set, falls back to triggerLabel.
   */
  @Prop() triggerA11yLabel?: string;

  /**
   * Additional CSS class for the trigger button.
   */
  @Prop() triggerClass?: string;

  /**
   * Test ID for the trigger button.
   */
  @Prop() triggerTestId?: string;

  /**
   * Native attributes for the trigger button.
   */
  @Prop() triggerNativeAttributes?: { [key: string]: string };

  /**
   * Disable the menu.
   */
  @Prop() disabled = false;

  /**
   * Make the dropdown match the width of the reference regardless of its
   * contents. Note that this only applies to the minimum width of the
   * dropdown. The maximum width is still limited by the viewport.
   */
  @Prop() justify = false;

  /**
   * Do not change the size of the dropdown to ensure it isn’t too big to fit
   * in the viewport (or more specifically, its clipping context).
   */
  @Prop() noResize = false;

  /**
   * Allow overflow when dropdown is open.
   */
  @Prop() overflow = false;

  /**
   * Whether the dropdown trigger should be initialized only before first opening.
   * Can be useful when trigger is rendered dynamically.
   */
  @Prop() delayedTriggerInit = false;

  /**
   * Emitted when the dropdown is opened.
   */
  @Event() catOpen!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the dropdown is closed.
   */
  @Event() catClose!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the trigger button is clicked.
   */
  @Event() catTriggerClick!: EventEmitter<MouseEvent>;

  @Listen('focusout')
  onFocusOut(): void {
    if (!this.dropdown?.isOpen) {
      return;
    }

    requestAnimationFrame(() => {
      if (!this.isMenuItemInFocus()) {
        this.dropdown?.close(false);
      }
    });
  }

  private getDeepActiveElement(): Element | null {
    let active = document.activeElement;
    while (active?.shadowRoot?.activeElement && active.nodeName !== 'CAT-MENU-ITEM') {
      active = active.shadowRoot.activeElement;
    }
    return active;
  }

  @Listen('keydown', { target: 'document' })
  onDocumentKeydown(event: KeyboardEvent): void {
    const navigationKeys =
      this.arrowNavigation === 'horizontal'
        ? ['ArrowRight', 'ArrowLeft', 'Home', 'End']
        : ['ArrowDown', 'ArrowUp', 'Home', 'End'];

    if (!this.dropdown?.isOpen || !navigationKeys.includes(event.key)) {
      return;
    }

    const targetElements = this.catMenuItems.filter(item => !item.disabled);
    if (!targetElements.length) {
      return;
    }
    const activeIdx = targetElements.findIndex(item => this.getDeepActiveElement() === item);

    let targetIdx: number;
    if (event.key === 'Home') {
      targetIdx = 0;
    } else if (event.key === 'End') {
      targetIdx = targetElements.length - 1;
    } else {
      const forwardKey = this.arrowNavigation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
      const activeOff = event.key === forwardKey ? 1 : -1;
      targetIdx = activeIdx < 0 ? 0 : (activeIdx + activeOff + targetElements.length) % targetElements.length;
    }

    targetElements[targetIdx].doFocus();
    event.preventDefault();
  }

  componentDidLoad(): void {
    this.syncMenuItems();
    this.mutationObserver = new MutationObserver(
      mutations => mutations.some(value => value.target.nodeName === 'CAT-MENU-ITEM') && this.syncMenuItems()
    );
    this.mutationObserver?.observe(this.hostElement, {
      childList: true,
      attributes: true,
      subtree: true
    });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  /**
   * Opens the menu.
   */
  @Method()
  async open(): Promise<void> {
    await this.dropdown?.open();
  }

  /**
   * Closes the menu.
   */
  @Method()
  async close(): Promise<void> {
    await this.dropdown?.close();
  }

  /**
   * Toggles the menu.
   */
  @Method()
  async toggle(): Promise<void> {
    await this.dropdown?.toggle();
  }

  private onTriggerClick = (event: CustomEvent<MouseEvent>) => {
    this.catTriggerClick.emit(event.detail);
  };

  private onMenuOpen = (event: CustomEvent<FocusEvent>) => {
    this.catOpen.emit(event.detail);
    // Set focus to first non-disabled menu item when menu opens
    requestAnimationFrame(() => {
      if (!this.isMenuItemInFocus()) {
        const firstEnabledItem = this.catMenuItems.find(item => !item.disabled);
        firstEnabledItem?.doFocus();
      }
    });
  };

  private isMenuItemInFocus(): boolean {
    const activeElement = this.getDeepActiveElement();
    const isInMenu = activeElement && this.catMenuItems.some(item => activeElement === item);

    return !!(activeElement && isInMenu);
  }

  private syncMenuItems() {
    this.catMenuItems = Array.from(this.hostElement.querySelectorAll('cat-menu-item'));
  }

  render() {
    return (
      <Host>
        <cat-dropdown
          ref={el => (this.dropdown = el)}
          focusTrap={false}
          placement={this.placement}
          justify={this.justify}
          arrowNavigation="none"
          noResize={this.noResize}
          overflow={this.overflow}
          delayedTriggerInit={this.delayedTriggerInit}
          onCatOpen={this.onMenuOpen}
          onCatClose={() => this.catClose.emit()}
        >
          <cat-button
            slot="trigger"
            part="trigger"
            variant={this.triggerVariant}
            size={this.triggerSize}
            icon={this.triggerIcon ?? (this.triggerLabel === undefined ? 'more-horizontal-filled' : undefined)}
            iconOnly={this.triggerIconOnly ?? this.triggerLabel === undefined}
            color={this.triggerColor}
            a11yLabel={this.triggerA11yLabel ?? this.triggerLabel}
            class={this.triggerClass}
            testId={this.triggerTestId}
            nativeAttributes={{
              ...this.triggerNativeAttributes,
              'aria-haspopup': 'menu'
            }}
            disabled={this.disabled}
            onCatClick={this.onTriggerClick}
          >
            {!this.triggerIconOnly && <slot name="trigger-label">{this.triggerLabel}</slot>}
          </cat-button>
          <nav role="menu" slot="content" class="cat-menu-list" aria-orientation={this.arrowNavigation}>
            <ul>
              <slot></slot>
            </ul>
          </nav>
        </cat-dropdown>
      </Host>
    );
  }
}
