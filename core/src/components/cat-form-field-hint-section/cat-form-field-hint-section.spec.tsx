import { h, Component } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { CatFormFieldHintSection } from './cat-form-field-hint-section';

@Component({ tag: 'test-hint-section' })
class TestHintSection {}

describe('cat-hint', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TestHintSection],
      template: () => <CatFormFieldHintSection></CatFormFieldHintSection>
    });
    expect(page.root).toEqualHtml(`
     <div class="hint-section"></div>
    `);
  });
});
