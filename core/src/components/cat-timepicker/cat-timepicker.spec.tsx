import { newSpecPage } from '@stencil/core/testing';
import { CatSelect } from '../cat-select/cat-select';

describe('cat-timepicker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatSelect],
      html: `<cat-timepicker label="Label"></cat-timepicker>`
    });
    expect(page.root).toEqualHtml(`
      <cat-timepicker label="Label"></cat-timepicker>
    `);
  });
});
