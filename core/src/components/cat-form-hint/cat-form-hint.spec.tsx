import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { CatFormHint } from './cat-form-hint';

describe('CatFormHint', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => <CatFormHint></CatFormHint>
    });
    expect(page.root).toEqualHtml(`
     <div class="hint-section"></div>
    `);
  });
});
