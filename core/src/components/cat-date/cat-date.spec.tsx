jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatInput } from '../cat-input/cat-input';
import { CatDate } from './cat-date';

describe('cat-date', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatInput, CatDate],
      html: `<cat-date></cat-date>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-date></cat-date>
    `);
  });
});
