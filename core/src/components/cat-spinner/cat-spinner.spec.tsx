import { newSpecPage } from '@stencil/core/testing';
import { CatSpinner } from './cat-spinner';

describe('cat-spinner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatSpinner],
      html: `<cat-spinner></cat-spinner>`
    });
    expect(page.root?.shadowRoot).toEqualHtml(`
          <span aria-hidden="true" class="spinner-m">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="21.5"></circle>
            </svg>
          </span>
    `);
  });
});
