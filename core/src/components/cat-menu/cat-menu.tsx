import { Placement } from '@floating-ui/dom';
import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
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

  private onTriggerClick = (event: CustomEvent<MouseEvent>) => {
    this.catTriggerClick.emit(event.detail);
  };

  render() {
    return (
      <Host>
        <cat-dropdown
          placement={this.placement}
          justify={this.justify}
          noAutoClose={this.noAutoClose}
          arrowNavigation="vertical"
          noResize={this.noResize}
          overflow={this.overflow}
          delayedTriggerInit={this.delayedTriggerInit}
          onCatOpen={(event) => this.catOpen.emit(event.detail)}
          onCatClose={(event) => this.catClose.emit(event.detail)}
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
            nativeAttributes={this.triggerNativeAttributes}
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
