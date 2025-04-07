jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatSelect } from './cat-select';

describe('cat-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatSelect],
      html: `<cat-select label="Label"></cat-select>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-select label="Label" tabindex="0"></cat-select>
    `);
  });
});
