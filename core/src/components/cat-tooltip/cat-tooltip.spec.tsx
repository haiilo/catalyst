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
          <slot></slot>
          <div aria-hidden aria-live="off" role="tooltip" class="tooltip tooltip-m" id="cat-tooltip-0">
            <slot name="content">
              <p>This is a tooltip</p>
            </slot>
          </div>
        </mock:shadow-root>
        <p>Hover me</p>
      </cat-tooltip>
    `);
  });
});
