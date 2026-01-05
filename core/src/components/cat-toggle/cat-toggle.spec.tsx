import { newSpecPage } from 'jest-stencil-runner';
import { CatToggle } from './cat-toggle';

describe('cat-toggle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatToggle],
      html: `<cat-toggle label="Label"></cat-toggle>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-toggle label="Label" tabindex="0"></cat-toggle>
    `);
  });
});
