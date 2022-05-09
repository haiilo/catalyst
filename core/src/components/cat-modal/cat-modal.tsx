import { Component, h, Method, Prop } from '@stencil/core';
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
  private modalWrapper?: HTMLElement;
  private closeButton?: HTMLElement;

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
        onDeactivate: () => this.modalWrapper?.classList.remove('is-visible'),
        setReturnFocus: previousActiveElement =>
          previousActiveElement instanceof HTMLElement
            ? (firstTabbable(previousActiveElement) as HTMLElement)
            : previousActiveElement
      });
    }
  }

  @Method()
  async show() {
    this.modalWrapper?.classList.add('is-visible');
    this.trap?.activate();
  }

  render() {
    return (
      <div ref={el => (this.modalWrapper = el)} class={{ wrapper: true }}>
        <div
          ref={el => (this.modal = el)}
          role="modal"
          class={{ modal: true, [`modal-${this.size}`]: Boolean(this.size) }}
        >
          <div class="header">
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
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    );
  }

  private onClick() {
    this.trap?.deactivate();
  }
}
