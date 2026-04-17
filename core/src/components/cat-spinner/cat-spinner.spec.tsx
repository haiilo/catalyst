import { render, h, describe, it, expect } from '@stencil/vitest';
import './cat-spinner';

describe('cat-spinner', () => {
  it('renders', async () => {
    const { root } = await render(<cat-spinner />);
    await expect(root).toEqualHtml(`
      <cat-spinner class="hydrated">
        <mock:shadow-root>
          <span role="progressbar" tabindex="-1" aria-hidden="true" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="spinner-m">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="21.5"></circle>
            </svg>
          </span>
        </mock:shadow-root>
      </cat-spinner>
    `);
  });
});
