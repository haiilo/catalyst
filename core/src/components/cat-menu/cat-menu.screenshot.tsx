import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { h, render, waitForStable } from '@stencil/vitest';
import { page } from '@vitest/browser/context';

const TRIGGER_SIZES = ['xs', 's', 'm', 'l', 'xl'] as const;
const TRIGGER_COLORS = ['secondary', 'primary', 'info', 'success', 'warning', 'danger'] as const;
const TRIGGER_VARIANTS = ['filled', 'outlined', 'text'] as const;
const MENU_COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const;
const MENU_VARIANTS = ['filled', 'outlined', 'text'] as const;
const PLACEMENTS = ['top-start', 'right-start', 'bottom-end', 'left-end'] as const;

const openedMenus: HTMLCatMenuElement[] = [];
const openedDropdowns: HTMLCatDropdownElement[] = [];
let defaultViewport: { width: number; height: number } | undefined;
let shouldRestoreViewport = false;

describe('cat-menu', () => {
  beforeAll(() => {
    defaultViewport = { width: window.innerWidth, height: window.innerHeight };
  });

  afterEach(async () => {
    for (const dropdown of openedDropdowns.splice(0).reverse()) {
      await closeDropdown(dropdown);
    }
    for (const menu of openedMenus.splice(0).reverse()) {
      await closeMenu(menu);
    }
    if (shouldRestoreViewport && defaultViewport) {
      await page.viewport(defaultViewport.width, defaultViewport.height);
      await nextAnimationFrame();
      shouldRestoreViewport = false;
    }
    await page.elementLocator(document.body).hover();
  });

  it('default icon-only trigger', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-menu />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('labeled trigger', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-menu triggerLabel="Actions" />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('custom trigger icon and slotted label', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-menu triggerLabel="Settings" triggerIcon="$cat:select-open" triggerIconRight triggerColor="primary">
          <span slot="trigger-label">
            Settings <strong>menu</strong>
          </span>
        </cat-menu>
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('disabled trigger', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-menu triggerLabel="Unavailable" triggerIcon="$cat:select-open" disabled />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('rounded trigger', async () => {
    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-menu triggerLabel="More actions" triggerIcon="$cat:select-open" triggerRound />
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('trigger size matrix', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {TRIGGER_SIZES.map(size => (
          <cat-menu
            key={size}
            triggerLabel={size}
            triggerSize={size}
            triggerIcon="$cat:select-open"
            triggerVariant="outlined"
            triggerColor="primary"
          />
        ))}
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('trigger color palette', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
        {TRIGGER_COLORS.map(color => (
          <cat-menu key={color} triggerLabel={color} triggerColor={color} triggerVariant="outlined" />
        ))}
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('trigger variants', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {TRIGGER_VARIANTS.map(variant => (
          <cat-menu key={variant} triggerLabel={variant} triggerVariant={variant} triggerColor="primary" />
        ))}
      </div>
    );

    await expect(root).toMatchScreenshot();
  });

  it('responsive trigger is icon-only below the breakpoint', async () => {
    await setViewport(600);

    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-menu triggerLabel="Settings" triggerIcon="settings-outlined" triggerIconOnly="s" />
      </div>
    );

    await waitForStable(root.querySelector('cat-menu')!);
    await expect(root).toMatchScreenshot();
  });

  it('shows responsive trigger label above the icon-only breakpoint', async () => {
    await setViewport(900);

    const { root } = await render(
      <div style={{ padding: '10px', display: 'inline-block' }}>
        <cat-menu triggerLabel="Settings" triggerIcon="settings-outlined" triggerIconOnly="s" />
      </div>
    );
    const trigger = root.querySelector('cat-menu')!.shadowRoot!.querySelector('cat-button[slot="trigger"]')!;

    await waitForStable(root.querySelector('cat-menu')!);
    expect(trigger.textContent).toContain('Settings');
    await expect(root).toMatchScreenshot();
  });

  it('open menu with default focus and separator', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '320px', minHeight: '320px' }}>
        <cat-menu triggerLabel="Actions">
          <cat-menu-item icon="edit-mode-outlined">Edit</cat-menu-item>
          <cat-menu-item icon="copy-outlined">Duplicate</cat-menu-item>
          <hr />
          <cat-menu-item icon="trash-outlined" color="danger">
            Delete
          </cat-menu-item>
        </cat-menu>
      </div>
    );

    await openMenu(root);
    await expect.poll(() => document.activeElement).toBe(root.querySelector('cat-menu-item'));
    await expect(root).toMatchScreenshot();
  });

  it('skips disabled first item when menu opens', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '320px', minHeight: '320px' }}>
        <cat-menu triggerLabel="Actions">
          <cat-menu-item disabled>Unavailable action</cat-menu-item>
          <cat-menu-item>Available action</cat-menu-item>
          <cat-menu-item>Another action</cat-menu-item>
        </cat-menu>
      </div>
    );

    await openMenu(root);
    await expect.poll(() => document.activeElement).toBe(root.querySelectorAll('cat-menu-item')[1]);
    await expect(root).toMatchScreenshot();
  });

  it('menu item active, disabled, and loading states', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '320px', minHeight: '320px' }}>
        <cat-menu triggerLabel="Actions">
          <cat-menu-item>Default item</cat-menu-item>
          <cat-menu-item active>Active item</cat-menu-item>
          <cat-menu-item disabled>Disabled item</cat-menu-item>
          <cat-menu-item loading>Loading item</cat-menu-item>
        </cat-menu>
      </div>
    );

    await openMenu(root);
    await expect(root).toMatchScreenshot();
  });

  it('hovered menu item', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '320px', minHeight: '320px' }}>
        <cat-menu triggerLabel="Actions">
          <cat-menu-item>First action</cat-menu-item>
          <cat-menu-item variant="filled" color="primary">
            Second action
          </cat-menu-item>
        </cat-menu>
      </div>
    );
    const firstItem = root.querySelector('cat-menu-item')!;
    const secondItemButton = root
      .querySelectorAll('cat-menu-item')[1]!
      .shadowRoot!.querySelector('cat-button')!
      .shadowRoot!.querySelector('button')!;

    await openMenu(root);
    await firstItem.doBlur();
    await page.elementLocator(secondItemButton).hover();
    expect(secondItemButton.matches(':hover')).toBe(true);
    await expect(root).toMatchScreenshot();
  });

  it('menu item color palette', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '320px', minHeight: '360px' }}>
        <cat-menu triggerLabel="Colors">
          {MENU_COLORS.map(color => (
            <cat-menu-item key={color} color={color} icon="star-outlined">
              {color}
            </cat-menu-item>
          ))}
        </cat-menu>
      </div>
    );

    await openMenu(root);
    await expect(root).toMatchScreenshot();
  });

  it('menu item variants', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '320px', minHeight: '320px' }}>
        <cat-menu triggerLabel="Variants">
          {MENU_VARIANTS.map(variant => (
            <cat-menu-item key={variant} variant={variant} color="primary">
              {variant}
            </cat-menu-item>
          ))}
        </cat-menu>
      </div>
    );

    await openMenu(root);
    await expect(root).toMatchScreenshot();
  });

  it('menu item leading, trailing, and icon-only content', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '320px', minHeight: '320px' }}>
        <cat-menu triggerLabel="Icons">
          <cat-menu-item icon="star-outlined">Leading icon</cat-menu-item>
          <cat-menu-item icon="external-link-outlined" iconRight>
            Trailing icon
          </cat-menu-item>
          <cat-menu-item icon="search-outlined" iconOnly nativeAttributes={{ 'aria-label': 'Search' }} />
        </cat-menu>
      </div>
    );

    await openMenu(root);
    await expect(root).toMatchScreenshot();
  });

  it('menu item is icon-only below its responsive breakpoint', async () => {
    await setViewport(600);

    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '320px', minHeight: '320px' }}>
        <cat-menu triggerLabel="Actions">
          <cat-menu-item icon="search-outlined" iconOnly="s" nativeAttributes={{ 'aria-label': 'Search' }}>
            Search
          </cat-menu-item>
        </cat-menu>
      </div>
    );
    await openMenu(root);
    await expect(root).toMatchScreenshot();
  });

  it('menu item shows its label above its responsive breakpoint', async () => {
    await setViewport(900);

    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '320px', minHeight: '320px' }}>
        <cat-menu triggerLabel="Actions">
          <cat-menu-item icon="search-outlined" iconOnly="s" nativeAttributes={{ 'aria-label': 'Search' }}>
            Search
          </cat-menu-item>
        </cat-menu>
      </div>
    );
    await openMenu(root);
    await expect(root).toMatchScreenshot();
  });

  it('link menu item', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '320px', minHeight: '320px' }}>
        <cat-menu triggerLabel="Navigation">
          <cat-menu-item url="/profile">Open profile</cat-menu-item>
          <cat-menu-item url="/settings" urlTarget="_blank">
            Open settings
          </cat-menu-item>
        </cat-menu>
      </div>
    );

    await openMenu(root);
    await expect(root).toMatchScreenshot();
  });

  it('headings, separators, and long menu item content', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '360px', minHeight: '420px' }}>
        <cat-menu triggerLabel="Actions">
          <li class="cat-nav-head">Workspace</li>
          <li class="cat-nav-text cat-muted">Choose an action for this workspace.</li>
          <cat-menu-item icon="arrow-right-outlined">Open</cat-menu-item>
          <cat-menu-item icon="bell-outlined" color="warning">
            A long menu label that should remain readable in the available menu width
          </cat-menu-item>
          <hr />
          <cat-menu-item color="danger">Delete workspace</cat-menu-item>
        </cat-menu>
      </div>
    );

    await openMenu(root);
    await expect(root).toMatchScreenshot();
  });

  it('rich slotted menu item content', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '360px', minHeight: '320px' }}>
        <cat-menu triggerLabel="User menu">
          <cat-menu-item>
            <div class="cat-flex cat-items-center cat-gap-s">
              <cat-avatar initials="AB" label="Alex Brown" size="m" round />
              <div class="cat-flex cat-flex-col cat-items-start">
                <span>Alex Brown</span>
                <span class="cat-text-s cat-muted">View profile</span>
              </div>
            </div>
          </cat-menu-item>
          <cat-menu-item icon="settings-outlined">Account settings</cat-menu-item>
        </cat-menu>
      </div>
    );

    await openMenu(root);
    await expect(root).toMatchScreenshot();
  });

  it('nested submenu open to the right', async () => {
    await setViewport(1000);

    const { root } = await render(
      <div style={{ padding: '16px', width: '720px', height: '360px' }}>
        <cat-menu triggerLabel="User menu" overflow>
          <cat-menu-item>Profile</cat-menu-item>
          <cat-menu-item subMenu>
            <cat-dropdown placement="right-start" noResize>
              <cat-button slot="trigger" class="cat-nav-item" icon="chevron-right-outlined" iconRight>
                Available
              </cat-button>
              <nav slot="content" style={{ width: '200px' }}>
                <ul>
                  <li class="cat-nav-head">Availability</li>
                  <cat-button class="cat-nav-item" icon="user-check-outlined" color="primary">
                    Set status
                  </cat-button>
                </ul>
              </nav>
            </cat-dropdown>
          </cat-menu-item>
          <cat-menu-item icon="star-outlined">Saved items</cat-menu-item>
        </cat-menu>
      </div>
    );
    const submenu = root.querySelector<HTMLCatDropdownElement>('cat-menu-item cat-dropdown')!;

    await openMenu(root);
    openedDropdowns.push(submenu);
    await submenu.open();
    const submenuPanel = submenu.shadowRoot!.querySelector<HTMLElement>('.content')!;
    await expect.poll(() => submenuPanel.dataset.placement).toBe('right-start');
    await expect(root).toMatchScreenshot();
  });

  it.each(PLACEMENTS)('placement %s', async placement => {
    await setViewport(960, 800);

    const { root } = await render(
      <div style={{ position: 'relative', display: 'inline-block', width: '720px', height: '600px' }}>
        <div style={{ position: 'absolute', left: '320px', top: '260px' }}>
          <cat-menu placement={placement} triggerLabel="Actions">
            <cat-menu-item>First action</cat-menu-item>
            <cat-menu-item>Second action</cat-menu-item>
          </cat-menu>
        </div>
      </div>
    );

    await openMenu(root);
    await expect(root).toMatchScreenshot();
  });

  it('justified dropdown width', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '380px', minHeight: '320px' }}>
        <cat-menu justify triggerLabel="A wide trigger label">
          <cat-menu-item>Short action</cat-menu-item>
        </cat-menu>
      </div>
    );

    await openMenu(root);
    await expect(root).toMatchScreenshot();
  });

  it('long menu content is constrained to the available height', async () => {
    const { root } = await render(
      <div style={{ padding: '16px', minWidth: '360px', minHeight: '600px' }}>
        <cat-menu triggerLabel="Many actions">
          {Array.from({ length: 40 }, (_, index) => (
            <cat-menu-item key={index}>Action {index + 1}</cat-menu-item>
          ))}
        </cat-menu>
      </div>
    );

    await openMenu(root);
    await expect(root).toMatchScreenshot();
  });

  it('long menu content after scrolling', async () => {
    const { root } = await render(
      <div style={{ position: 'relative', padding: '16px', minWidth: '360px', minHeight: '600px' }}>
        <cat-menu triggerLabel="Many actions">
          {Array.from({ length: 40 }, (_, index) => (
            <cat-menu-item key={index}>Action {index + 1}</cat-menu-item>
          ))}
        </cat-menu>
        <span
          class="cursor-reset-area"
          style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px' }}
        ></span>
      </div>
    );
    const dropdown = root.querySelector('cat-menu')!.shadowRoot!.querySelector('cat-dropdown')!;
    const panel = dropdown.shadowRoot!.querySelector<HTMLElement>('.content')!;

    await openMenu(root);
    expect(panel.scrollHeight).toBeGreaterThan(panel.clientHeight);
    await page.elementLocator(panel).wheel({ delta: { y: 240 } });
    expect(panel.scrollTop).toBeGreaterThan(0);
    await page.elementLocator(root.querySelector('.cursor-reset-area')!).hover();
    await expect(root).toMatchScreenshot();
  });

  it.each([false, true] as const)('near-edge menu noResize=%s', async noResize => {
    await setViewport(600, 520);

    const { root } = await render(
      <div style={{ position: 'relative', display: 'inline-block', width: '560px', height: '500px' }}>
        <div style={{ position: 'absolute', left: '300px', top: '420px' }}>
          <cat-menu placement="bottom-start" triggerLabel="Many actions" noResize={noResize}>
            {Array.from({ length: 18 }, (_, index) => (
              <cat-menu-item key={index}>Action {index + 1}</cat-menu-item>
            ))}
          </cat-menu>
        </div>
      </div>
    );

    await openMenu(root);
    await expect(root).toMatchScreenshot();
  });
});

async function openMenu(root: HTMLElement): Promise<void> {
  const menu = root.querySelector<HTMLCatMenuElement>('cat-menu')!;
  openedMenus.push(menu);
  await menu.open();
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
  await waitForStable(menu);
}

async function setViewport(width: number, height = defaultViewport!.height): Promise<void> {
  shouldRestoreViewport = true;
  await page.viewport(width, height);
  await nextAnimationFrame();
}

async function nextAnimationFrame(): Promise<void> {
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
}

async function closeMenu(menu: HTMLCatMenuElement): Promise<void> {
  const dropdown = menu.shadowRoot?.querySelector<HTMLCatDropdownElement>('cat-dropdown');
  if (!dropdown?.isOpen) return;

  const closed = new Promise<void>(resolve => menu.addEventListener('catClose', () => resolve(), { once: true }));
  await menu.close();
  await closed;
}

async function closeDropdown(dropdown: HTMLCatDropdownElement): Promise<void> {
  if (!dropdown.isOpen) return;

  const closed = new Promise<void>(resolve => dropdown.addEventListener('catClose', () => resolve(), { once: true }));
  await dropdown.close();
  await closed;
}
