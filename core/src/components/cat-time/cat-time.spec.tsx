jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatInput } from '../cat-input/cat-input';
import { CatTime } from './cat-time';

describe('cat-time', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTime, CatInput],
      html: `<cat-time></cat-time>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-time></cat-time>
    `);
  });
});
