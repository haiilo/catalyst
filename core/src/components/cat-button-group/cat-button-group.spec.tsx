import { newSpecPage } from 'jest-stencil-runner';
import { CatButtonGroup } from './cat-button-group';

describe('cat-button-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatButtonGroup],
      html: `<cat-button-group></cat-button-group>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-button-group role="group"></cat-button-group>
    `);
  });
});
