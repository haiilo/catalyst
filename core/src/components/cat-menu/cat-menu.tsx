import { autoUpdate, computePosition, flip, offset, Placement } from '@floating-ui/dom';
import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import * as focusTrap from 'focus-trap';
import { tabbable } from 'tabbable';

@Component({
  tag: 'cat-menu',
  styleUrl: 'cat-menu.scss'
})
export class CatMenu {
  private static OFFSET = 4;
  private trigger: HTMLElement | null = null;
  private content: HTMLElement | null = null;
  private trap?: focusTrap.FocusTrap;

  @Element() host!: HTMLElement;

  @Prop() placement: Placement = 'bottom-start';

  /**
   * Emitted when the menu is opened.
   */
  @Event() catOpen!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the menu is closed.
   */
  @Event() catClose!: EventEmitter<FocusEvent>;

  componentDidLoad(): void {
    this.trigger = this.host.querySelector<HTMLElement>('[slot="trigger"]');
    this.content = this.host.querySelector<HTMLElement>('.content');
    if (this.trigger && this.content) {
      this.trigger?.addEventListener('click', () => this.show());
      autoUpdate(this.trigger, this.content, () => this.update());
    }

    document.addEventListener('keydown', event => {
      if (this.content && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
        const targetElements = tabbable(this.content, { includeContainer: false, getShadowRoot: true });
        const activeElement = document.activeElement
          ? tabbable(document.activeElement, { includeContainer: true, getShadowRoot: true })
          : [];
        const activeIdx = activeElement.length ? targetElements.indexOf(activeElement[0]) : -1;
        const activeOff = event.key === 'ArrowDown' ? 1 : -1;
        const targetIdx = activeIdx < 0 ? 0 : (activeIdx + activeOff + targetElements.length) % targetElements.length;
        targetElements[targetIdx].focus();
        event.preventDefault();
      }
    });
  }

  render() {
    return (
      <Host>
        <slot name="trigger"></slot>
        <div class="content">
          <slot name="content"></slot>
        </div>
      </Host>
    );
  }

  private show() {
    if (this.content) {
      this.content.style.display = 'block';
      this.catOpen.emit();
      this.trap = this.trap
        ? this.trap.updateContainerElements(this.content)
        : focusTrap.createFocusTrap(this.content, {
            tabbableOptions: {
              getShadowRoot: true
            },
            allowOutsideClick: true,
            clickOutsideDeactivates: event => !this.content || !event.composedPath().includes(this.content),
            onPostDeactivate: () => this.hide()
          });
      this.trap.activate();
    }
  }

  private hide() {
    if (this.content) {
      this.content.style.display = '';
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
}
