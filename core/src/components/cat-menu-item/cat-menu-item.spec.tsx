import { vi } from 'vitest';
import { render, h, describe, it, expect } from '@stencil/vitest';
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
        const { root } = await render(<cat-menu-item>Test Item</cat-menu-item>);
        const menuItem = root as HTMLCatMenuItemElement;
        const button = root.shadowRoot?.querySelector('cat-button') as HTMLCatButtonElement;
        const nativeButton = button?.shadowRoot?.querySelector('button') as HTMLButtonElement;

        const focusSpy = vi.spyOn(nativeButton, 'focus');
        const focusOptions: FocusOptions = { preventScroll: true };

        await menuItem.doFocus(focusOptions);

        expect(focusSpy).toHaveBeenCalledWith(focusOptions);
      });
    });

    describe('doBlur', () => {
      it('should programmatically blur the menu item', async () => {
        const { root, waitForChanges } = await render(<cat-menu-item>Test Item</cat-menu-item>);
        const menuItem = root as HTMLCatMenuItemElement;
        const button = root.shadowRoot?.querySelector('cat-button') as HTMLCatButtonElement;
        const nativeButton = button?.shadowRoot?.querySelector('button') as HTMLButtonElement;

        await menuItem.doFocus();
        await waitForChanges();

        const blurSpy = vi.spyOn(nativeButton, 'blur');

        await menuItem.doBlur();

        expect(blurSpy).toHaveBeenCalled();
      });
    });
  });
});
