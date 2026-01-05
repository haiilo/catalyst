jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from 'jest-stencil-runner';
import { CatTextarea } from './cat-textarea';

describe('cat-textarea', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTextarea],
      html: `<cat-textarea label="Label"></cat-textarea>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-textarea label="Label" tabindex="0"></cat-textarea>
    `);
  });
});
