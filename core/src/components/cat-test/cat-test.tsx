import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cat-test',
  styleUrl: 'cat-test.css',
  shadow: true
})
export class CatTest {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
