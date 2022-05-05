import { newSpecPage } from '@stencil/core/testing';
import { CatTest } from './cat-test';

describe('cat-test', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTest],
      html: `<cat-test></cat-test>`
    });
    expect(page.root).toEqualHtml(`
      <cat-test>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-test>
    `);
  });
});
