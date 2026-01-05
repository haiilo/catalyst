jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from 'jest-stencil-runner';
import { CatInput } from './cat-input';

describe('cat-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatInput],
      html: `<cat-input label="Label"></cat-input>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-input label="Label" tabindex="0"></cat-input>
    `);
  });
});
