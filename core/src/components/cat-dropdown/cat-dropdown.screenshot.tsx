import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-dropdown screenshot', () => {
  it('renders open', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minHeight: '300px' }}>
        <cat-dropdown focusTrap={false}>
          <cat-button slot="trigger">Open</cat-button>
          <div slot="content">
            <cat-menu-item>Item 1</cat-menu-item>
            <cat-menu-item>Item 2</cat-menu-item>
            <cat-menu-item>Item 3</cat-menu-item>
          </div>
        </cat-dropdown>
      </div>
    );

    const dropdown = document.querySelector('cat-dropdown') as HTMLCatDropdownElement;
    await dropdown.open();

    await expect(root).toMatchScreenshot();
  });
});
