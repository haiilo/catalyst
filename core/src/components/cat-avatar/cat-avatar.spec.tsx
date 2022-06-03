import { newSpecPage } from '@stencil/core/testing';
import { CatAvatar } from './cat-avatar';

describe('cat-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatAvatar],
      html: `<cat-avatar label="My Avatar"></cat-avatar>`
    });
    expect(page.root).toEqualHtml(`
      <cat-avatar label="My Avatar">
        <mock:shadow-root>
          <span aria-label="My Avatar" class="avatar avatar-m">MA</span>
        </mock:shadow-root>
      </cat-avatar>
    `);
  });
});
