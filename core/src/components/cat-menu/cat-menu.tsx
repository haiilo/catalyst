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
   * The trigger button variant.
   */
  @Prop() triggerVariant: 'filled' | 'outlined' | 'text' = 'text';

  /**
   * The trigger button size.
   */
  @Prop() triggerSize: 'xs' | 's' | 'm' | 'l' | 'xl' = 's';

  /**
   * The trigger button icon.
   */
  @Prop() triggerIcon = 'more-horizontal-filled';

  /**
   * Show only the icon in the trigger button.
   */
  @Prop() triggerIconOnly: boolean | Breakpoint = true;

  /**
   * The trigger button label (for accessibility).
   */
  @Prop() triggerLabel = 'Show menu';

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
   * Do not close the dropdown on outside clicks.
   */
  @Prop() noAutoClose = false;

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

  @Listen('keydown', { target: 'document' })
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.dropdown?.isOpen || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }

    const targetElements = this.catMenuItems.filter(item => !item.disabled);
    if (!targetElements.length) {
      return;
    }
    const activeIdx = targetElements.findIndex(item => document.activeElement === item);

    let targetIdx: number;
    if (event.key === 'Home') {
      targetIdx = 0;
    } else if (event.key === 'End') {
      targetIdx = targetElements.length - 1;
    } else {
      const activeOff = event.key === 'ArrowDown' ? 1 : -1;
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
      const firstEnabledItem = this.catMenuItems.find(item => !item.disabled);
      firstEnabledItem?.doFocus();
    });
  };

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
          noAutoClose={this.noAutoClose}
          arrowNavigation="none"
          noResize={this.noResize}
          overflow={this.overflow}
          delayedTriggerInit={this.delayedTriggerInit}
          onCatOpen={this.onMenuOpen}
          onCatClose={event => this.catClose.emit(event.detail)}
        >
          <cat-button
            slot="trigger"
            variant={this.triggerVariant}
            size={this.triggerSize}
            icon={this.triggerIcon}
            iconOnly={this.triggerIconOnly}
            a11yLabel={this.triggerLabel}
            class={this.triggerClass}
            testId={this.triggerTestId}
            nativeAttributes={{
              ...this.triggerNativeAttributes,
              'aria-haspopup': 'menu'
            }}
            disabled={this.disabled}
            onCatClick={this.onTriggerClick}
          ></cat-button>
          <div role="menu" slot="content" class="cat-menu-list" aria-orientation="vertical">
            <slot></slot>
          </div>
        </cat-dropdown>
      </Host>
    );
  }
}
