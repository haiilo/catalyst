import { autoUpdate, computePosition, flip, offset, Placement, ReferenceElement, size } from '@floating-ui/dom';
import { timeTransitionS } from '@haiilo/catalyst-tokens';
import { Component, Event, EventEmitter, h, Host, Listen, Method, Prop } from '@stencil/core';
import * as focusTrap from 'focus-trap';
import type { FocusableElement } from 'tabbable';
import firstTabbable from '../../utils/first-tabbable';

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
  private readonly focusableSelectors = [
    'input',
    'select',
    'textarea',
    'button',
    'a[href]',
    '[tabindex]',
    'iframe',
    '[contenteditable]',
    'audio[controls]',
    'video[controls]'
  ];
  private readonly id = nextUniqueId++;
  private triggerSlot!: HTMLSlotElement;
  private trigger?: FocusableElement;
  private anchorSlot!: HTMLSlotElement;
  private anchor?: Element;
  private content!: HTMLElement;
  private trap?: focusTrap.FocusTrap;
  private isOpen: boolean | null = false;

  /**
   * The placement of the dropdown.
   */
  @Prop() placement: Placement = 'bottom-start';

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
   */
  @Prop() noInitialFocus = false;

  /**
   * Trigger element will not receive focus when dropdown is closed.
   */
  @Prop() noReturnFocus = false;

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
    this.isOpen ? this.close() : this.open();
  }

  /**
   * Opens the dropdown.
   */
  @Method()
  async open(): Promise<void> {
    if (this.isOpen === null || this.isOpen) {
      return; // busy or open
    }

    this.isOpen = null;
    this.content.style.display = 'block';
    // give CSS transition time to apply
    setTimeout(() => {
      this.isOpen = true;
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
            initialFocus: () => (this.noInitialFocus ? false : undefined)
          });
      this.trap.activate();
    });
  }

  /**
   * Closes the dropdown.
   */
  @Method()
  async close(): Promise<void> {
    if (!this.isOpen) {
      return; // busy or closed
    }

    this.isOpen = null;
    this.trap?.deactivate();
    this.content.classList.remove('show');
    // give CSS transition time to apply
    setTimeout(() => {
      this.isOpen = false;
      this.content.classList.remove('show');
      this.content.style.display = '';
      this.trigger?.setAttribute('aria-expanded', 'false');
      this.catClose.emit();
    }, timeTransitionS);
  }

  componentDidLoad() {
    this.initAnchor();
    this.initTrigger();
  }

  render() {
    return (
      <Host>
        <slot name="anchor" ref={el => (this.anchorSlot = el as HTMLSlotElement)}></slot>
        <slot name="trigger" ref={el => (this.triggerSlot = el as HTMLSlotElement)}></slot>
        <div
          id={this.contentId}
          class={{ content: true, 'overflow-auto': !this.overflow }}
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
    this.trigger.addEventListener('click', () => this.toggle());
    if (!this.anchor) {
      autoUpdate(this.trigger, this.content, () => this.update(this.trigger));
    }
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
    if (!trigger) {
      elems = this.triggerSlot?.assignedElements?.() || [];
      while (!trigger && elems.length) {
        const elem = elems.shift();
        trigger = this.findFirstTabbableIncludeHidden(elem as HTMLElement);
      }
    }
    if (!trigger) {
      throw new Error('Cannot find tabbable element. Use [data-trigger] to set the trigger.');
    }
    return trigger;
  }

  private update(anchorElement: ReferenceElement | undefined) {
    if (anchorElement) {
      const resize = this.noResize
        ? []
        : [
            size({
              padding: CatDropdown.OFFSET,
              apply({ availableWidth, availableHeight, elements }) {
                Object.assign(elements.floating.style, {
                  maxWidth: `${availableWidth}px`,
                  maxHeight: `${availableHeight}px`
                });
              }
            })
          ];
      computePosition(anchorElement, this.content, {
        strategy: 'fixed',
        placement: this.placement,
        middleware: [offset(CatDropdown.OFFSET), flip(), ...resize]
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

  private findFirstTabbableIncludeHidden(element: HTMLElement | ShadowRoot): HTMLElement | undefined {
    if (element instanceof HTMLElement) {
      const potentiallyTabbableElement = this.getPotentiallyTabbable(element);
      if (potentiallyTabbableElement) {
        return potentiallyTabbableElement;
      }
    }

    const children = Array.from(element.querySelectorAll<HTMLElement>('*'));
    for (const child of children) {
      const potentiallyTabbableElement = this.getPotentiallyTabbable(child);

      if (potentiallyTabbableElement) {
        return potentiallyTabbableElement;
      }
    }
    return undefined;
  }

  private couldBeTabbable(value: HTMLElement) {
    if (!value.matches(this.focusableSelectors.join(','))) {
      return false;
    }

    const tabindex = value.getAttribute('tabindex');
    return tabindex === null || Number(tabindex) >= 0;
  }

  private getPotentiallyTabbable(element: HTMLElement) {
    if (this.couldBeTabbable(element)) {
      return element;
    }
    if (element.shadowRoot) {
      const shadowTabbable = this.findFirstTabbableIncludeHidden(element.shadowRoot);
      if (shadowTabbable) {
        return shadowTabbable;
      }
    }
    return undefined;
  }
}
