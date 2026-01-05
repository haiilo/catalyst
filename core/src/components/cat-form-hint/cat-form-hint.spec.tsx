import { h } from '@stencil/core';
import { newSpecPage } from 'jest-stencil-runner';
import { CatFormHint } from './cat-form-hint';

describe('CatFormHint', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => <CatFormHint id="host-id"></CatFormHint>
    });
    expect(page.root).toEqualLightHtml(`
     <div class="hint-section" id="host-id-hint" aria-live="polite"></div>
    `);
  });
});
