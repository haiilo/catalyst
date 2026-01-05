import { newSpecPage } from 'jest-stencil-runner';
import { CatRadio } from './cat-radio';

describe('cat-radio', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatRadio],
      html: `<cat-radio label="Label"></cat-radio>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-radio label="Label" tabindex="0"></cat-radio>
    `);
  });
});
