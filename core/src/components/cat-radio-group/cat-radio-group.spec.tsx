import { newSpecPage } from 'jest-stencil-runner';
import { CatRadioGroup } from './cat-radio-group';

describe('cat-radio-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatRadioGroup],
      html: `<cat-radio-group></cat-radio-group>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-radio-group></cat-radio-group>
    `);
  });
});
