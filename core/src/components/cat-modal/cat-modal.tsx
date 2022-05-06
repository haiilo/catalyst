import { Component, h, Method, Prop } from '@stencil/core';
import * as focusTrap from 'focus-trap';

@Component({
  tag: 'cat-modal',
  styleUrl: 'cat-modal.scss',
  shadow: true
})
export class CatModal {
  private trap?: focusTrap.FocusTrap;
  private modal?: HTMLElement;
  private modalWrapper?: HTMLElement;

  /**
   * The size of the modal.
   */
  @Prop() size: 's' | 'm' | 'l' = 'm';

  componentDidLoad() {
    if (this.modal) {
      this.trap = this.trap
        ? this.trap.updateContainerElements(this.modal)
        : focusTrap.createFocusTrap(this.modal, {
            tabbableOptions: {
              getShadowRoot: true
            },
            onPostDeactivate: () => this.modalWrapper?.classList.remove('visible')
          });
    }
  }

  @Method()
  async show() {
    this.modalWrapper?.classList.add('visible');
    this.trap?.activate();
  }

  render() {
    return (
      <div class={{ wrapper: true }} ref={el => (this.modalWrapper = el)}>
        <div class={{ modal: true, [`modal-${this.size}`]: Boolean(this.size) }} ref={el => (this.modal = el)}>
          <div class="header">
            <cat-button class="modal-close-button" onCatClick={() => this.trap?.deactivate()}>
              aaa
            </cat-button>
          </div>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    );
  }
}
