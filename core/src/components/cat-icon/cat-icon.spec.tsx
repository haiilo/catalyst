jest.mock('./cat-icon-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatIcon } from './cat-icon';

describe('cat-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatIcon],
      html: `<cat-icon icon="icon"></cat-icon>`
    });
    expect(page.root?.shadowRoot).toEqualHtml(`
      <span aria-hidden="true" class="icon icon-m" part="icon"></span>
    `);
  });
});
