jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatMenuItem } from './cat-menu-item';
import { CatButton } from '../cat-button/cat-button';
import { CatIcon } from '../cat-icon/cat-icon';

describe('cat-menu-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatMenuItem],
      html: `<cat-menu-item></cat-menu-item>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-menu-item></cat-menu-item>
    `);
  });

  describe('public methods', () => {
    describe('doFocus', () => {
      it('should pass focus options to the underlying button', async () => {
        // given
        const page = await newSpecPage({
          components: [CatMenuItem, CatButton, CatIcon],
          html: `<cat-menu-item>Test Item</cat-menu-item>`
        });
        const menuItem = page.rootInstance as CatMenuItem;
        const button = page.root?.shadowRoot?.querySelector('cat-button') as HTMLCatButtonElement;
        const nativeButton = button?.shadowRoot?.querySelector('button') as HTMLButtonElement;

        const focusSpy = jest.spyOn(nativeButton, 'focus');
        const focusOptions: FocusOptions = { preventScroll: true };

        // when
        await menuItem.doFocus(focusOptions);

        // then
        expect(focusSpy).toHaveBeenCalledWith(focusOptions);
      });
    });

    describe('doBlur', () => {
      it('should programmatically blur the menu item', async () => {
        // given
        const page = await newSpecPage({
          components: [CatMenuItem, CatButton, CatIcon],
          html: `<cat-menu-item>Test Item</cat-menu-item>`
        });
        const menuItem = page.rootInstance as CatMenuItem;
        const button = page.root?.shadowRoot?.querySelector('cat-button') as HTMLCatButtonElement;
        const nativeButton = button?.shadowRoot?.querySelector('button') as HTMLButtonElement;

        // Focus first so we can blur
        await menuItem.doFocus();
        await page.waitForChanges();

        // Mock the native button's blur method
        const blurSpy = jest.spyOn(nativeButton, 'blur');

        // when
        await menuItem.doBlur();

        // then
        expect(blurSpy).toHaveBeenCalled();
      });
    });
  });
});
