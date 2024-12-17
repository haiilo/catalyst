jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatInput } from '../cat-input/cat-input';
import { CatDateInline } from './cat-date-inline';

describe('cat-date-inline', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDateInline, CatInput],
      html: `<cat-date-inline></cat-date-inline>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-date-inline tabindex="0"></cat-date-inline>
    `);
  });
});
