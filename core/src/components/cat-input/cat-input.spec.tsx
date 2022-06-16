import { newSpecPage } from '@stencil/core/testing';
import { CatInput } from './cat-input';
import { CatI18nRegistry } from '../cat-i18n/cat-i18n-registry';

const tMock = jest.fn((key: string) => key);
jest.spyOn(CatI18nRegistry, 'getInstance').mockImplementation(() => ({ t: tMock } as unknown as CatI18nRegistry));

describe('cat-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatInput],
      html: `<cat-input label="Label"></cat-input>`
    });
    expect(tMock).toHaveBeenCalledWith('input.optional');
    expect(page.root).toEqualHtml(`
      <cat-input label="Label">
        <mock:shadow-root>
          <label htmlfor="cat-input-0">
            <span part="label">Label <span aria-hidden="true" class="input-optional">(input.optional)</span></span>
          </label>
          <div class="input-wrapper">
            <div class="input-inner-wrapper">
              <input id="cat-input-0" type="text">
            </div>
          </div>
        </mock:shadow-root>
      </cat-input>
    `);
  });
});
