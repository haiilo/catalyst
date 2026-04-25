import { vi, describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('../cat-i18n/cat-i18n-registry');

import './cat-menu-item';
import '../cat-button/cat-button';
import '../cat-icon/cat-icon';

describe('cat-menu-item', () => {
  it('renders', async () => {
    const { root } = await render(<cat-menu-item />);
    await expect(root).toEqualLightHtml(`
      <cat-menu-item class="hydrated"></cat-menu-item>
    `);
  });

  describe('public methods', () => {
    describe('doFocus', () => {
      it('should pass focus options to the underlying button', async () => {
        // given
        const { root } = await render(<cat-menu-item>Test Item</cat-menu-item>);
        const menuItem = root as HTMLCatMenuItemElement;
        const button = root.shadowRoot?.querySelector('cat-button') as HTMLCatButtonElement;
        const nativeButton = button?.shadowRoot?.querySelector('button') as HTMLButtonElement;

        const focusSpy = vi.spyOn(nativeButton, 'focus');
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
        const { root, waitForChanges } = await render(<cat-menu-item>Test Item</cat-menu-item>);
        const menuItem = root as HTMLCatMenuItemElement;
        const button = root.shadowRoot?.querySelector('cat-button') as HTMLCatButtonElement;
        const nativeButton = button?.shadowRoot?.querySelector('button') as HTMLButtonElement;

        // Focus first so we can blur
        await menuItem.doFocus();
        await waitForChanges();

        // Mock the native button's blur method
        const blurSpy = vi.spyOn(nativeButton, 'blur');

        // when
        await menuItem.doBlur();

        // then
        expect(blurSpy).toHaveBeenCalled();
      });
    });
  });
});
