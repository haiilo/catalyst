import { newSpecPage } from 'jest-stencil-runner';
import { CatSpinner } from './cat-spinner';

describe('cat-spinner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatSpinner],
      html: `<cat-spinner></cat-spinner>`
    });
    expect(page.root?.shadowRoot).toEqualLightHtml(`
          <span aria-hidden="true" class="spinner-m" role="progressbar" tabindex="-1" aria-valuemin="0" aria-valuenow="0" aria-valuemax="100">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="21.5"></circle>
            </svg>
          </span>
    `);
  });
});
