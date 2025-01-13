import { newSpecPage } from '@stencil/core/testing';
import { CatRadio } from './cat-radio';

describe('cat-radio', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatRadio],
      html: `<cat-radio label="Label"></cat-radio>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-radio label="Label"></cat-radio>
    `);
  });
});
