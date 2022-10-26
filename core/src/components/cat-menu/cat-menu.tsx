import { autoUpdate, computePosition, flip, offset, Placement } from '@floating-ui/dom';
import { Component, Event, EventEmitter, h, Host, Listen, Method, Prop } from '@stencil/core';
import * as focusTrap from 'focus-trap';
import log from 'loglevel';
import { FocusableElement, tabbable } from 'tabbable';
import firstTabbable from '../../utils/first-tabbable';

let nextUniqueId = 0;

@Component({
  tag: 'cat-menu',
  styleUrl: 'cat-menu.scss',
  shadow: true
})
export class CatMenu {
  private static readonly OFFSET = 4;
  private readonly id = nextUniqueId++;
  private triggerSlot?: HTMLSlotElement;
  private trigger?: FocusableElement;
  private content?: HTMLElement;
  private trap?: focusTrap.FocusTrap;
  private keyListener?: (event: KeyboardEvent) => void;

  /**
   * The placement of the menu.
   */
  @Prop() placement: Placement = 'bottom-start';

  /**
   * Do not close the menu on outside clicks.
   */
  @Prop() noAutoClose = false;

  /**
   * Allow overflow when menu is open.
   */
  @Prop() overflow = false;

  /**
   * Emitted when the menu is opened.
   */
  @Event() catOpen!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the menu is closed.
   */
  @Event() catClose!: EventEmitter<FocusEvent>;

  @Listen('catClick')
  clickHandler(event: CustomEvent<MouseEvent>) {
    if (!this.trigger) {
      this.initTrigger();
      this.show();
    }

    // hide menu on button click
    if (!this.noAutoClose && this.content && event.composedPath().includes(this.content)) {
      this.close();
    }
  }

  /**
   * Closes the menu.
   */
  @Method()
  async close(): Promise<void> {
    this.trap?.deactivate();
    this.hide();
  }

  componentDidLoad(): void {
    this.initTrigger();
    this.keyListener = event => {
      if (this.content && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
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
        <div class={{ content: true, 'overflow-auto': !this.overflow }} ref={el => (this.content = el)}>
          <slot name="content"></slot>
        </div>
      </Host>
    );
  }

  private get contentId() {
    return `cat-menu-${this.id}`;
  }

  private initTrigger() {
    this.trigger = this.findTrigger();
    this.trigger?.setAttribute('aria-haspopup', 'true');
    this.trigger?.setAttribute('aria-expanded', 'false');
    this.trigger?.setAttribute('aria-controls', this.contentId);
    this.content?.setAttribute('id', this.contentId);
    if (this.trigger && this.content) {
      this.trigger?.addEventListener('click', () => {
        this.trap?.active ? this.close() : this.show();
      });
      autoUpdate(this.trigger, this.content, () => this.update());
    }
  }

  private show() {
    if (this.content) {
      this.content.style.display = 'block';
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
              (!this.content || !event.composedPath().includes(this.content)) &&
              (!this.trigger || !event.composedPath().includes(this.trigger)),
            onPostDeactivate: () => this.close()
          });
      this.trap.activate();
    }
  }

  private hide() {
    if (this.content) {
      this.content.style.display = '';
      this.trigger?.setAttribute('aria-expanded', 'false');
      this.catClose.emit();
    }
  }

  private update() {
    if (this.trigger && this.content) {
      computePosition(this.trigger, this.content, {
        placement: this.placement,
        middleware: [offset(CatMenu.OFFSET), flip()]
      }).then(({ x, y }) => {
        if (this.content) {
          Object.assign(this.content.style, {
            left: `${x}px`,
            top: `${y}px`
          });
        }
      });
    }
  }

  private findTrigger(): FocusableElement | undefined {
    let trigger: FocusableElement | undefined;
    const elems = this.triggerSlot?.assignedElements() || [];
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
      log.error('Cannot find tabbable element. Use [data-trigger] to set the trigger.');
    }
    return trigger;
  }
}
