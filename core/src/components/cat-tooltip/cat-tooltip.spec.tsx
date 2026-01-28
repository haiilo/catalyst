import { newSpecPage } from '@stencil/core/testing';
import { CatTooltip } from './cat-tooltip';

describe('cat-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTooltip],
      html: `
        <cat-tooltip content="This is a tooltip">
          <p>Hover me</p>
        </cat-tooltip>
        `
    });
    expect(page.root).toEqualLightHtml(`
      <cat-tooltip content="This is a tooltip">
        <p aria-describedby="cat-tooltip-0">Hover me</p>
      </cat-tooltip>
    `);
  });
});
