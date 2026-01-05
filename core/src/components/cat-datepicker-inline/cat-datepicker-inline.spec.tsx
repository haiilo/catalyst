jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from 'jest-stencil-runner';
import { CatDatepickerInline } from './cat-datepicker-inline';

describe('cat-datepicker-inline', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDatepickerInline],
      html: `<cat-datepicker-inline></cat-datepicker-inline>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-datepicker-inline></cat-datepicker-inline>
    `);
  });
});
