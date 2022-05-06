import {Component, h, Prop} from '@stencil/core';

@Component({
  tag: 'cat-modal',
  styleUrl: 'cat-modal.scss',
  shadow: true,
})
export class CatModal {
  /**
   * The size of the modal.
   */
  @Prop() size:  's' | 'm' | 'l' = 'm';

  render() {
    return (
      <div class="wrapper visible">
        <div class={{"modal": true,
          [`modal-${this.size}`]: Boolean(this.size)}}>
          <div class="header">
            <cat-icon icon='cross-outlined' size='l'></cat-icon>
          </div>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    );
  }

}
