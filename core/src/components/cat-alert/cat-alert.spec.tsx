import { newSpecPage } from '@stencil/core/testing';
import { CatAlert } from './cat-alert';

describe('cat-alert', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatAlert],
      html: `<cat-alert></cat-alert>`
    });
    expect(page.root).toEqualHtml(`
      <cat-alert color="primary" role="status" tabindex="0">
        <mock:shadow-root>
          <cat-icon iconsrc="<svg viewBox=&quot;0 0 24 24&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><path fill-rule=&quot;evenodd&quot; clip-rule=&quot;evenodd&quot; d=&quot;M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-7.82-3.001L12 5 9.82 8.999l-4.477.838 3.129 3.31-.587 4.516L12 15.71l4.114 1.953-.586-4.517 3.13-3.31L14.18 9Z&quot;/></svg>" size="l"></cat-icon>
          <div class="content">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </cat-alert>
    `);
  });
});
