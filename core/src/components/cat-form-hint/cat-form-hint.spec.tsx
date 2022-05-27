import { h, Component } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { CatFormHint } from './cat-form-hint';

@Component({ tag: 'test-form-hint' })
class TestFormHint {}

describe('CatFormHint', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TestFormHint],
      template: () => <CatFormHint></CatFormHint>
    });
    expect(page.root).toEqualHtml(`
     <div class="hint-section"></div>
    `);
  });
});
