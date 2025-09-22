import { newSpecPage } from '@stencil/core/testing';
import { CatCheckbox } from './cat-checkbox';

describe.skip('cat-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatCheckbox],
      html: `<cat-checkbox label="Label"></cat-checkbox>`
    });
    expect(page.root).toEqualLightHtml(`
     <cat-checkbox label="Label"></cat-checkbox>
    `);
  });
});
