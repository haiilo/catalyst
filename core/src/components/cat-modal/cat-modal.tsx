import { Component, Element, h, Method, Prop, State } from '@stencil/core';
import * as focusTrap from 'focus-trap';
import firstTabbable from '../../utils/first-tabbable';

@Component({
  tag: 'cat-modal',
  styleUrl: 'cat-modal.scss',
  shadow: true
})
export class CatModal {
  private trap?: focusTrap.FocusTrap;
  private modal?: HTMLElement;
  private closeButton?: HTMLElement;

  @Element() hostElement!: HTMLElement;

  @State() private isVisible = false;

  /**
   * The size of the modal.
   */
  @Prop() size: 's' | 'm' | 'l' = 'm';

  componentDidLoad() {
    if (this.modal) {
      this.trap = focusTrap.createFocusTrap(this.modal, {
        tabbableOptions: {
          getShadowRoot: true
        },
        initialFocus: firstTabbable(this.closeButton),
        allowOutsideClick: true,
        clickOutsideDeactivates: event => !this.modal || !event.composedPath().includes(this.modal),
        onDeactivate: () => (this.isVisible = false),
        setReturnFocus: previousActiveElement =>
          previousActiveElement instanceof HTMLElement
            ? (firstTabbable(previousActiveElement) as HTMLElement)
            : previousActiveElement
      });
    }
  }

  componentDidUpdate() {
    if (this.isVisible) this.trap?.activate();
    this.updateAccessibility(this.hostElement);
  }

  /**
   * Shows the modal.
   */
  @Method()
  async show() {
    this.isVisible = true;
  }

  render() {
    return (
      <div aria-modal={true} role="dialog" aria-hidden={!this.isVisible ? 'true' : 'false'} class="modal-wrapper">
        <div ref={el => (this.modal = el)} class={{ modal: true, [`modal-${this.size}`]: Boolean(this.size) }}>
          <div class="modal-header">
            <cat-button
              ref={el => (this.closeButton = el)}
              icon="cross-outlined"
              class="close-button"
              size="s"
              iconOnly
              a11yLabel="close"
              onCatClick={this.onClick.bind(this)}
            ></cat-button>
          </div>
          <div class="modal-content">
            <slot></slot>
          </div>
        </div>
      </div>
    );
  }

  private onClick() {
    this.trap?.deactivate();
  }

  private updateAccessibility(element: HTMLElement) {
    if (element.parentElement) {
      Array.from(element.parentElement.children).forEach(elementSibling => {
        if (elementSibling !== element) {
          this.isVisible
            ? elementSibling.setAttribute('aria-hidden', 'true')
            : elementSibling.removeAttribute('aria-hidden');
        }
      });

      if (element.parentElement !== document.body) this.updateAccessibility(element.parentElement);
    }
  }
}
