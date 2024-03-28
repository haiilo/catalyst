jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatDatepickerFlat } from './cat-datepicker';

describe('cat-datepicker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDatepickerFlat],
      html: `<cat-datepicker></cat-datepicker>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-datepicker></cat-datepicker>
    `);
  });
});
