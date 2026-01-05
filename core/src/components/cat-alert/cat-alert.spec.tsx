import { newSpecPage } from 'jest-stencil-runner';
import { CatAlert } from './cat-alert';

describe('cat-alert', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatAlert],
      html: `<cat-alert></cat-alert>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-alert color="primary" role="status" tabindex="0"></cat-alert>
    `);
  });
});
