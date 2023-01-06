import { newSpecPage } from '@stencil/core/testing';
import { CatFormGroup } from './cat-form-group';

describe('cat-form-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatFormGroup],
      html: `<cat-form-group></cat-form-group>`
    });
    expect(page.root).toEqualHtml(`
      <cat-form-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-form-group>
    `);
  });
});
