import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'cat-scrollable',
  styleUrl: 'cat-scrollable.css',
  shadow: true,
})
export class CatScrollable {

  /** Flags to enable/disable scroll shadows. */
  @Prop()
  shadow: { x?: boolean; y?: boolean; } = { x: true, y: true };

  /** Flags to enable/disable overflow. */
  @Prop()
  overflow: { x?: boolean; y?: boolean; } = { y: true };

  /** Flag to enable/disable overscroll behavior. */
  @Prop()
  overscroll = true;


  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
