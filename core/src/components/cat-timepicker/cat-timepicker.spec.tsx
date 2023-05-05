import { newSpecPage } from '@stencil/core/testing';
import { CatInput } from './cat-timepicker';

describe('cat-timepicker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatInput],
      html: `<cat-timepicker label="Label"></cat-timepicker>`
    });
    expect(page.root).toEqualHtml(`
      <cat-timepicker label="Label">
        <mock:shadow-root>
          <cat-select errorupdate="0" label="Label" placement="bottom-start" requiredmarker="optional"></cat-select>
        </mock:shadow-root>
      </cat-timepicker>
    `);
  });
});
