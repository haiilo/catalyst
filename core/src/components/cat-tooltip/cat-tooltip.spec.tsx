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
    expect(page.root).toEqualHtml(`
      <cat-tooltip content="This is a tooltip">
        <mock:shadow-root>
          <div aria-describedby="cat-tooltip-0" class="tooltip-trigger" tabindex="0">
            <slot></slot>
          </div>
          <div class="tooltip tooltip-m" id="cat-tooltip-0">This is a tooltip</div>
        </mock:shadow-root>
        <p>Hover me</p>
      </cat-tooltip>
    `);
  });
});
