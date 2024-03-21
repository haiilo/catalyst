import { autoUpdate, computePosition, flip, offset, Placement, size } from '@floating-ui/dom';
import { timeTransitionS } from '@haiilo/catalyst-tokens';
import { Component, Event, EventEmitter, h, Host, Listen, Method, Prop } from '@stencil/core';
import * as focusTrap from 'focus-trap';
import { FocusableElement, tabbable } from 'tabbable';
import firstTabbable from '../../utils/first-tabbable';

let nextUniqueId = 0;

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
  private content!: HTMLElement;
  private trap?: focusTrap.FocusTrap;
  private keyListener?: (event: KeyboardEvent) => void;
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
  @Prop() noKeybindings = false;

  /**
   * Allow overflow when dropdown is open.
   */
  @Prop() overflow = false;

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
    // we need to delay the initialization of the trigger until first
    // interaction because the element might still be hidden (and thus not
    // tabbable) if contained in another Stencil web component
    if (!this.trigger) {
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
      this.catOpen.emit();
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
            onPostDeactivate: () => this.close()
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
    this.content.classList.remove('show');
    // give CSS transition time to apply
    setTimeout(() => {
      this.isOpen = false;
      this.content.classList.remove('show');
      this.content.style.display = '';
      this.trigger?.setAttribute('aria-expanded', 'false');
      this.trap?.deactivate();
      this.catClose.emit();
    }, timeTransitionS);
  }

  componentDidLoad(): void {
    if (this.noKeybindings) {
      return;
    }
    this.keyListener = event => {
      if (this.isOpen && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
        const targetElements = tabbable(this.content, { includeContainer: false, getShadowRoot: true });
        const activeElement = firstTabbable(document.activeElement);
        const activeIdx = activeElement ? targetElements.indexOf(activeElement) : -1;
        const activeOff = event.key === 'ArrowDown' ? 1 : -1;
        const targetIdx = activeIdx < 0 ? 0 : (activeIdx + activeOff + targetElements.length) % targetElements.length;
        targetElements[targetIdx].focus();
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', this.keyListener);
  }

  disconnectedCallback(): void {
    if (this.keyListener) {
      document.removeEventListener('keydown', this.keyListener);
    }
  }

  render() {
    return (
      <Host>
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
    this.trigger.setAttribute('aria-haspopup', 'true');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.setAttribute('aria-controls', this.contentId);
    this.trigger.addEventListener('click', () => this.toggle());
    autoUpdate(this.trigger, this.content, () => this.update());
  }

  private findTrigger() {
    let trigger: FocusableElement | undefined;
    const elems = this.triggerSlot?.assignedElements?.() || [];
    while (!trigger && elems.length) {
      const elem = elems.shift();
      trigger = elem?.hasAttribute('data-trigger')
        ? (elem as HTMLElement)
        : elem?.querySelector('[data-trigger]') ?? undefined;
    }
    if (!trigger) {
      trigger = firstTabbable(this.triggerSlot);
    }
    if (!trigger) {
      throw new Error('Cannot find tabbable element. Use [data-trigger] to set the trigger.');
    }
    return trigger;
  }

  private update() {
    if (this.trigger) {
      computePosition(this.trigger, this.content, {
        strategy: 'fixed',
        placement: this.placement,
        middleware: [
          offset(CatDropdown.OFFSET),
          flip(),
          size({
            padding: CatDropdown.OFFSET,
            apply({ availableWidth, availableHeight, elements }) {
              Object.assign(elements.floating.style, {
                maxWidth: `${availableWidth}px`,
                maxHeight: `${availableHeight}px`
              });
            }
          })
        ]
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
