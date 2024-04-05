jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatDateInline } from '../cat-date-inline/cat-date-inline';
import { CatInput } from '../cat-input/cat-input';
import { CatDate } from './cat-date';

describe('cat-date', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDate, CatInput, CatDateInline],
      html: `<cat-date></cat-date>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-date></cat-date>
    `);
  });
});
