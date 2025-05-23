import { autoUpdate, computePosition, flip, offset, Placement, ReferenceElement, shift, size } from '@floating-ui/dom';
import { timeTransitionS } from '@haiilo/catalyst-tokens';
import { Component, Event, EventEmitter, h, Host, Listen, Method, Prop } from '@stencil/core';
import * as focusTrap from 'focus-trap';
import type { FocusableElement } from 'tabbable';
import firstTabbable from '../../utils/first-tabbable';
import findFirstTabbableIncludeHidden from '../../utils/first-tabbable-with-visibility-hidden';

let nextUniqueId = 0;

/**
 * A dropdown component to display a list of actions in a dropdown menu or to
 * show additional content on demand.
 */
@Component({
  tag: 'cat-dropdown',
  styleUrl: 'cat-dropdown.scss',
  shadow: true
})
export class CatDropdown {
  private static readonly OFFSET = 4;
  private readonly id = nextUniqueId++;
  private triggerSlot!: HTMLSlotElement;
  private trigger?: FocusableElement;
  private anchorSlot!: HTMLSlotElement;
  private anchor?: Element;
  private content!: HTMLElement;
  private trap?: focusTrap.FocusTrap;
  private _isOpen: boolean | null = false;
  /**
   * Tracking the origin of opening the dropdown and specify if initial focus should be set.
   * Currently we set it only when the origin is keyboard.
   * We might not need to track this in future when focus-visible support is improved across browsers
   */
  private hasInitialFocus = false;

  /**
   * The placement of the dropdown.
   */
  @Prop() placement: Placement = 'bottom-start';

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
   * Do not navigate focus inside the dropdown via vertical arrow keys.
   */
  @Prop() arrowNavigation: 'horizontal' | 'vertical' | 'none' = 'vertical';

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
   * No element in dropdown will receive focus when dropdown is open.
   * By default, the first element in tab order will receive a focus.
   * @deprecated
   * Using noInitialFocus property would be a bad practice from a11y perspective.
   * We always want visible focus to jump inside the dropdown when user uses keyboard and noInitialFocus allows to turn it off which might introduce a bug.
   * hasInitialFocus should resolve the cause of the original problem instead.
   */
  @Prop() noInitialFocus = false;

  /**
   * Whether the dropdown is open.
   * @readonly
   */
  @Prop() get isOpen(): boolean {
    return this._isOpen ?? false;
  }

  /**
   * Trigger element will not receive focus when dropdown is closed.
   */
  @Prop() noReturnFocus = false;

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

  @Listen('catClick')
  clickHandler(event: CustomEvent<MouseEvent>) {
    if (!this.trigger && this.delayedTriggerInit) {
      this.hasInitialFocus = this.isEventOriginFromKeyboard(event.detail);
      this.initTrigger();
      this.toggle();
    }

    // hide dropdown on button clicks inside the dropdown content
    const path = event.composedPath();
    if (
      !this.noAutoClose &&
      // check if click was inside of the dropdown content
      path.includes(this.content) &&
      // check if click was not on a trigger for a sub-dropdown
      (event.target as Element)?.slot !== 'trigger' &&
      // check if click was not an element marked with data-dropdown-no-close
      !path.slice(0, path.indexOf(this.content)).find(el => this.hasAttribute(el, 'data-dropdown-no-close'))
    ) {
      this.close();
    }
  }

  /**
   * Toggles the dropdown.
   */
  @Method()
  async toggle(): Promise<void> {
    this._isOpen ? this.close() : this.open();
  }

  /**
   * Opens the dropdown.
   * @param isFocusVisible is dropdown should receive visible focus when it's opened.
   */
  @Method()
  async open(isFocusVisible?: boolean): Promise<void> {
    if (!this.trigger && this.delayedTriggerInit) {
      this.initTrigger();
    }

    if (this.isOpen === null || this.isOpen) {
      return; // busy or open
    }

    this._isOpen = null;
    this.content.style.display = 'block';
    this.hasInitialFocus = isFocusVisible ?? this.hasInitialFocus;
    // give CSS transition time to apply
    setTimeout(() => {
      this._isOpen = true;
      this.content.classList.add('show');
      this.trigger?.setAttribute('aria-expanded', 'true');
      this.trap = this.trap
        ? this.trap.updateContainerElements(this.content)
        : focusTrap.createFocusTrap(this.content, {
            tabbableOptions: {
              getShadowRoot: true
            },
            allowOutsideClick: true,
            clickOutsideDeactivates: event =>
              !this.noAutoClose &&
              // check if click was outside of the dropdown content
              !event.composedPath().includes(this.content) &&
              // check if click was not on an element marked with data-dropdown-no-close
              !event.composedPath().find(el => this.hasAttribute(el, 'data-dropdown-no-close')),
            onPostDeactivate: () => this.close(),
            onPostActivate: () => this.catOpen.emit(),
            setReturnFocus: elem => (this.noReturnFocus ? false : this.trigger || elem),
            isKeyForward: event => {
              if (
                (this.arrowNavigation === 'horizontal' && event.key === 'ArrowRight') ||
                (this.arrowNavigation === 'vertical' && event.key === 'ArrowDown')
              ) {
                event.preventDefault();
                return true;
              }
              return event.key === 'Tab';
            },
            isKeyBackward: event => {
              if (
                (this.arrowNavigation === 'horizontal' && event.key === 'ArrowLeft') ||
                (this.arrowNavigation === 'vertical' && event.key === 'ArrowUp')
              ) {
                event.preventDefault();
                return true;
              }
              return event.key === 'Tab' && event.shiftKey;
            },
            initialFocus: () => {
              return this.hasInitialFocus && !this.noInitialFocus ? undefined : false;
            }
          });
      this.trap.activate();
    });
  }

  /**
   * Closes the dropdown.
   */
  @Method()
  async close(): Promise<void> {
    if (!this._isOpen) {
      return; // busy or closed
    }

    this._isOpen = null;
    this.trap?.deactivate();
    this.content.classList.remove('show');
    // give CSS transition time to apply
    setTimeout(() => {
      this._isOpen = false;
      this.content.classList.remove('show');
      this.content.style.display = '';
      this.trigger?.setAttribute('aria-expanded', 'false');
      this.catClose.emit();
    }, timeTransitionS);
  }

  componentDidLoad() {
    this.initAnchor();
    if (!this.delayedTriggerInit) {
      this.initTrigger();
    }
  }

  render() {
    return (
      <Host>
        <slot name="anchor" ref={el => (this.anchorSlot = el as HTMLSlotElement)}></slot>
        <slot name="trigger" ref={el => (this.triggerSlot = el as HTMLSlotElement)}></slot>
        <div
          id={this.contentId}
          class={{ content: true, 'overflow-auto': !this.overflow, justified: this.justify, aligned: !this.justify }}
          ref={el => (this.content = el as HTMLElement)}
        >
          <slot name="content"></slot>
        </div>
      </Host>
    );
  }

  private get contentId() {
    return `cat-dropdown-${this.id}`;
  }

  private initTrigger() {
    this.trigger = this.findTrigger();
    const ariaHaspopup = this.trigger.getAttribute('aria-haspopup');
    this.trigger.setAttribute('aria-haspopup', ariaHaspopup ?? 'true');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.setAttribute('aria-controls', this.contentId);
    this.trigger.addEventListener('click', (event: Event) => {
      this.hasInitialFocus = this.isEventOriginFromKeyboard(event as UIEvent);
      this.toggle();
    });
    if (!this.anchor) {
      autoUpdate(this.trigger, this.content, () => this.update(this.trigger));
    }
  }

  private isEventOriginFromKeyboard(event: UIEvent): boolean {
    return event.detail === 0;
  }

  private initAnchor() {
    this.anchor = (this.anchorSlot?.assignedElements?.() || [])[0];
    if (this.anchor) {
      autoUpdate(this.anchor, this.content, () => this.update(this.anchor));
    }
  }

  private findTrigger() {
    let trigger: FocusableElement | undefined;
    let elems = this.triggerSlot?.assignedElements?.() || [];
    while (!trigger && elems.length) {
      const elem = elems.shift();
      trigger = elem?.hasAttribute('data-trigger')
        ? (elem as HTMLElement)
        : (elem?.querySelector('[data-trigger]') ?? undefined);
    }
    if (!trigger) {
      trigger = firstTabbable(this.triggerSlot);
    }
    // if no tabbable element is still found let's attempt to search through elements with visibility:hidden styles
    // which stencil assigns to component in prehydration state
    if (!trigger) {
      elems = this.triggerSlot?.assignedElements?.() || [];
      while (!trigger && elems.length) {
        const elem = elems.shift();
        trigger = findFirstTabbableIncludeHidden(elem as HTMLElement);
      }
    }
    if (!trigger) {
      throw new Error('Cannot find tabbable element. Use [data-trigger] to set the trigger.');
    }
    return trigger;
  }

  private update(anchorElement: ReferenceElement | undefined, justify = this.justify) {
    if (anchorElement) {
      const resize = this.noResize
        ? []
        : [
            size({
              padding: CatDropdown.OFFSET,
              apply({ rects, availableWidth, availableHeight, elements }) {
                if (justify) {
                  Object.assign(elements.floating.style, {
                    minWidth: `${rects.reference.width}px`,
                    maxWidth: `${rects.reference.width}px`,
                    maxHeight: `${availableHeight}px`
                  });
                } else {
                  Object.assign(elements.floating.style, {
                    maxWidth: `${availableWidth}px`,
                    maxHeight: `${availableHeight}px`
                  });
                }
              }
            })
          ];
      computePosition(anchorElement, this.content, {
        strategy: 'fixed',
        placement: this.placement,
        middleware: [offset(CatDropdown.OFFSET), flip(), shift(), ...resize]
      }).then(({ x, y, placement }) => {
        this.content.dataset.placement = placement;
        Object.assign(this.content.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    }
  }

  private hasAttribute(elem: EventTarget, attr: string) {
    return elem instanceof HTMLElement && elem.hasAttribute(attr);
  }
}
