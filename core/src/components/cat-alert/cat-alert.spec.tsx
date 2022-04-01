import { newSpecPage } from '@stencil/core/testing';
import { CatAlert } from './cat-alert';

describe('cat-alert', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatAlert],
      html: `<cat-alert></cat-alert>`
    });
    expect(page.root).toEqualHtml(`
      <cat-alert>
        <mock:shadow-root>
          <div class="cat-alert cat-alert-primary" part="alert">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </cat-alert>
    `);
  });
});
