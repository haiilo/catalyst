import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { h, render } from '@stencil/vitest';

describe('cat-menu', () => {
  it('opens a nested dropdown from its mouse trigger without closing the parent menu', async () => {
    const { root, waitForChanges } = await render<HTMLCatMenuElement>(
      <cat-menu overflow triggerVariant="filled" triggerLabel="Example User Menu">
        <cat-menu-item>
          <div class="cat-flex cat-items-center cat-gap-s">
            <cat-avatar initials="MM" size="m" round />
            <div class="cat-flex cat-flex-col cat-items-start">
              <span>Max Mustermann</span>
              <span class="cat-text-s cat-muted">Open profile</span>
            </div>
          </div>
        </cat-menu-item>
        <cat-menu-item subMenu>
          <cat-dropdown placement="right-start">
            <cat-button slot="trigger" class="cat-nav-item" icon="status-available">
              Available
            </cat-button>
            <nav slot="content">
              <ul>
                <li class="cat-nav-head">Headline</li>
                <li class="cat-nav-text cat-muted">Choose your availability.</li>
                <li>
                  <cat-button class="cat-nav-item" icon="sparkle-filled" color="primary">
                    Set status
                  </cat-button>
                </li>
              </ul>
            </nav>
          </cat-dropdown>
        </cat-menu-item>
        <cat-menu-item icon="bookmark-outlined">Saved</cat-menu-item>
      </cat-menu>
    );
    await waitForChanges();

    const parentDropdown = getElement(
      root.shadowRoot?.querySelector<HTMLCatDropdownElement>('cat-dropdown'),
      'parent dropdown'
    );
    const parentTrigger = getElement(
      root.shadowRoot?.querySelector<HTMLCatButtonElement>('cat-button[slot="trigger"]'),
      'parent trigger'
    );
    const nestedMenuItem = Array.from(root.querySelectorAll<HTMLCatMenuItemElement>('cat-menu-item')).find(
      menuItem => menuItem.subMenu
    );
    const nestedDropdown = getElement(
      nestedMenuItem?.querySelector<HTMLCatDropdownElement>('cat-dropdown'),
      'nested dropdown'
    );
    const nestedTrigger = getElement(
      nestedDropdown.querySelector<HTMLCatButtonElement>('cat-button[slot="trigger"]'),
      'nested trigger'
    );

    await Promise.all([parentTrigger.componentOnReady(), nestedTrigger.componentOnReady()]);
    const parentButton = getElement(
      parentTrigger.shadowRoot?.querySelector<HTMLButtonElement>('button'),
      'parent button'
    );
    const nestedButton = getElement(
      nestedTrigger.shadowRoot?.querySelector<HTMLButtonElement>('button'),
      'nested button'
    );

    await page.elementLocator(parentButton).click({ force: true });
    await waitForNextFrame(waitForChanges);
    expect(parentDropdown.isOpen, 'parent menu opens from its trigger').toBe(true);

    await page.elementLocator(nestedButton).click({ force: true });
    await waitForNextFrame(waitForChanges);

    expect(parentDropdown.isOpen, 'parent menu remains open after nested-trigger click').toBe(true);
    expect(nestedDropdown.isOpen, 'nested dropdown opens from its trigger').toBe(true);
  });
});

function getElement<T extends Element>(element: T | null | undefined, name: string): T {
  if (!element) {
    throw new Error(`Expected ${name} to be rendered.`);
  }
  return element;
}

async function waitForNextFrame(waitForChanges: () => Promise<void>): Promise<void> {
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
  await waitForChanges();
}
