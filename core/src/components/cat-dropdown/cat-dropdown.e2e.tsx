import { page } from '@vitest/browser/context';
import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-dropdown', () => {
  it('renders', async () => {
    const { root } = await render(
      <cat-dropdown>
        <button slot="trigger" />
        <nav slot="content" />
      </cat-dropdown>
    );
    await expect.element(root).toHaveClass('hydrated');
  });

  it('opens a nested dropdown from its mouse trigger without closing the parent dropdown', async () => {
    const { root, waitForChanges } = await render<HTMLCatDropdownElement>(
      <cat-dropdown overflow>
        <cat-button slot="trigger" variant="filled">
          Example User Menu
        </cat-button>
        <nav slot="content">
          <ul>
            <li>
              <cat-dropdown placement="right-start">
                <cat-button slot="trigger" class="cat-nav-item" icon="status-available">
                  Available
                </cat-button>
                <nav slot="content">
                  <ul>
                    <li>
                      <cat-button class="cat-nav-item">Set status</cat-button>
                    </li>
                  </ul>
                </nav>
              </cat-dropdown>
            </li>
          </ul>
        </nav>
      </cat-dropdown>
    );
    await waitForChanges();

    const parentTrigger = getElement(
      root.querySelector<HTMLCatButtonElement>('cat-button[slot="trigger"]'),
      'parent trigger'
    );
    const nestedDropdown = getElement(root.querySelector<HTMLCatDropdownElement>('li cat-dropdown'), 'nested dropdown');
    const nestedTrigger = getElement(
      nestedDropdown.querySelector<HTMLCatButtonElement>('cat-button[slot="trigger"]'),
      'nested trigger'
    );

    await Promise.all([parentTrigger.componentOnReady(), nestedTrigger.componentOnReady()]);
    await page.elementLocator(getNativeButton(parentTrigger, 'parent trigger')).click({ force: true });
    await waitForNextFrame(waitForChanges);

    await page.elementLocator(getNativeButton(nestedTrigger, 'nested trigger')).click({ force: true });
    await waitForNextFrame(waitForChanges);

    expect(root.isOpen).toBe(true);
    expect(nestedDropdown.isOpen).toBe(true);
  });
});

function getElement<T extends Element>(element: T | null | undefined, name: string): T {
  if (!element) {
    throw new Error(`Expected ${name} to be rendered.`);
  }
  return element;
}

function getNativeButton(component: HTMLCatButtonElement, name: string): HTMLButtonElement {
  return getElement(component.shadowRoot?.querySelector<HTMLButtonElement>('button'), `${name} native button`);
}

async function waitForNextFrame(waitForChanges: () => Promise<void>): Promise<void> {
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
  await waitForChanges();
}
