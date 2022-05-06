import { newSpecPage } from '@stencil/core/testing';
import { CatAlert } from './cat-alert';

describe('cat-alert', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatAlert],
      html: `<cat-alert></cat-alert>`
    });
    expect(page.root).toEqualHtml(`
      <cat-alert role="status" tabindex="0">
        <mock:shadow-root>
          <div class="alert alert-primary" part="alert">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </cat-alert>
    `);
  });
});
