import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('../cat-icon/cat-icon-registry');

import './cat-menu';
import '../cat-dropdown/cat-dropdown';
import '../cat-button/cat-button';
import '../cat-menu-item/cat-menu-item';
import '../cat-icon/cat-icon';

vi.mock('@floating-ui/dom', () => ({
  autoUpdate: vi.fn(() => vi.fn()),
  computePosition: vi.fn(() => ({})),
  flip: vi.fn(() => ({})),
  offset: vi.fn(() => ({})),
  shift: vi.fn(() => ({})),
  size: vi.fn(() => ({}))
}));

vi.mock('focus-trap', () => ({
  createFocusTrap: vi.fn(() => ({
    activate: vi.fn(),
    deactivate: vi.fn(),
    updateContainerElements: vi.fn(() => {
      return this;
    })
  }))
}));

vi.mock('../../utils/first-tabbable', () => ({
  default: (element: HTMLSlotElement) => element
}));

describe('cat-menu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders', async () => {
    const { root } = await render(<cat-menu />);
    expect(root).toBeTruthy();
    expect(root.shadowRoot?.querySelector('cat-dropdown')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('cat-button[slot="trigger"]')).toBeTruthy();
  });

  describe('trigger button', () => {
    it('should render trigger button with correct default attributes', async () => {
      const { root } = await render(<cat-menu />);

      const trigger = root.shadowRoot?.querySelector('cat-button[slot="trigger"]') as HTMLCatButtonElement;
      expect(trigger).toBeTruthy();
      expect(trigger.variant).toBe('text');
      expect(trigger.size).toBe('m');
      expect(trigger.icon).toBe('more-horizontal-filled');
      expect(trigger.iconOnly).toBe(true);
      expect(trigger.disabled).toBe(false);
      expect(trigger.nativeAttributes?.['aria-haspopup']).toBe('menu');
    });

    it('should apply custom trigger props', async () => {
      const { root } = await render(
        <cat-menu
          disabled
          trigger-variant="filled"
          trigger-size="l"
          trigger-icon="gear"
          trigger-label="Options"
          trigger-class="custom-class"
          trigger-test-id="menu-trigger"
        />
      );

      const trigger = root.shadowRoot?.querySelector('cat-button[slot="trigger"]') as HTMLCatButtonElement;
      expect(trigger.variant).toBe('filled');
      expect(trigger.size).toBe('l');
      expect(trigger.icon).toBe('gear');
      expect(trigger.a11yLabel).toBe('Options');
      expect(trigger.classList.contains('custom-class')).toBe(true);
      expect(trigger.testId).toBe('menu-trigger');
      expect(trigger.disabled).toBe(true);
    });

    it('should use triggerA11yLabel when provided', async () => {
      const { root, waitForChanges } = await render(<cat-menu trigger-label="Options" triggerA11yLabel="Open options menu" />);
      await waitForChanges();

      const trigger = root.shadowRoot?.querySelector('cat-button[slot="trigger"]') as HTMLCatButtonElement;
      expect(trigger.a11yLabel).toBe('Open options menu');
    });

    it('should emit catTriggerClick when trigger is clicked', async () => {
      const { root, waitForChanges } = await render(<cat-menu />);

      const catTriggerClickSpy = vi.fn();
      root.addEventListener('catTriggerClick', catTriggerClickSpy);

      const trigger = root.shadowRoot?.querySelector('cat-button[slot="trigger"]') as HTMLCatButtonElement;
      const mouseEvent = new MouseEvent('click');
      trigger.dispatchEvent(new CustomEvent('catClick', { detail: mouseEvent }));
      await waitForChanges();

      expect(catTriggerClickSpy).toHaveBeenCalled();
    });
  });

  describe('dropdown integration', () => {
    it('should render dropdown with correct props', async () => {
      const { root } = await render(
        <cat-menu placement="top-end" justify no-auto-close no-resize overflow delayed-trigger-init />
      );

      const dropdown = root.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      expect(dropdown.placement).toBe('top-end');
      expect(dropdown.justify).toBe(true);
      expect(dropdown.noResize).toBe(true);
      expect(dropdown.overflow).toBe(true);
      expect(dropdown.delayedTriggerInit).toBe(true);
      expect(dropdown.focusTrap).toBe(false);
    });

    it('should emit catOpen when dropdown opens', async () => {
      const { root, waitForChanges } = await render(<cat-menu />);

      const catOpenSpy = vi.fn();
      root.addEventListener('catOpen', catOpenSpy);

      const dropdown = root.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');
      dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));
      await waitForChanges();

      expect(catOpenSpy).toHaveBeenCalled();
    });

    it('should emit catClose when dropdown closes', async () => {
      const { root, waitForChanges } = await render(<cat-menu />);

      const catCloseSpy = vi.fn();
      root.addEventListener('catClose', catCloseSpy);

      const dropdown = root.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('blur');
      dropdown.dispatchEvent(new CustomEvent('catClose', { detail: focusEvent }));
      await waitForChanges();

      expect(catCloseSpy).toHaveBeenCalled();
    });
  });

  describe('focus management', () => {
    it('should focus first enabled menu item when menu opens', async () => {
      const { root, waitForChanges } = await render(
        <cat-menu>
          <cat-menu-item>Item 1</cat-menu-item>
          <cat-menu-item>Item 2</cat-menu-item>
          <cat-menu-item>Item 3</cat-menu-item>
        </cat-menu>
      );

      const menuItems = root.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;

      const mockDoFocus = vi.fn();
      Object.defineProperty(firstItem, 'doFocus', {
        value: mockDoFocus,
        writable: true,
        configurable: true
      });

      const dropdown = root.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');

      dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));
      await new Promise(resolve => requestAnimationFrame(resolve));
      await waitForChanges();

      expect(mockDoFocus).toHaveBeenCalled();
    });

    it('should skip disabled items and focus first enabled item', async () => {
      const { root, waitForChanges } = await render(
        <cat-menu>
          <cat-menu-item disabled>Item 1</cat-menu-item>
          <cat-menu-item>Item 2</cat-menu-item>
          <cat-menu-item>Item 3</cat-menu-item>
        </cat-menu>
      );

      const menuItems = root.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;
      const secondItem = menuItems?.[1] as HTMLCatMenuItemElement;

      const mockDoFocusFirst = vi.fn();
      Object.defineProperty(firstItem, 'doFocus', {
        value: mockDoFocusFirst,
        writable: true,
        configurable: true
      });

      const mockDoFocusSecond = vi.fn();
      Object.defineProperty(secondItem, 'doFocus', {
        value: mockDoFocusSecond,
        writable: true,
        configurable: true
      });

      const dropdown = root.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');

      dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));

      await new Promise(resolve => requestAnimationFrame(resolve));
      await waitForChanges();

      expect(mockDoFocusFirst).not.toHaveBeenCalled();
      expect(mockDoFocusSecond).toHaveBeenCalled();
    });

    it('should not focus any item if a menu item is already focused', async () => {
      const { root, waitForChanges } = await render(
        <cat-menu>
          <cat-menu-item>Item 1</cat-menu-item>
          <cat-menu-item>Item 2</cat-menu-item>
        </cat-menu>
      );

      const menuItems = root.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;
      const secondItem = menuItems?.[1] as HTMLCatMenuItemElement;

      Object.defineProperty(document, 'activeElement', {
        get: () => secondItem,
        configurable: true
      });

      const firstItemFocusMock = vi.fn();
      Object.defineProperty(firstItem, 'doFocus', {
        value: firstItemFocusMock,
        writable: true,
        configurable: true
      });

      const secondItemFocusMock = vi.fn();
      Object.defineProperty(secondItem, 'doFocus', {
        value: secondItemFocusMock,
        writable: true,
        configurable: true
      });

      const dropdown = root.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');

      dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));
      await new Promise(resolve => requestAnimationFrame(resolve));
      await waitForChanges();

      expect(firstItemFocusMock).not.toHaveBeenCalled();
      expect(secondItemFocusMock).not.toHaveBeenCalled();
    });

    it('should handle case when all menu items are disabled', async () => {
      const { root, waitForChanges } = await render(
        <cat-menu>
          <cat-menu-item disabled>Item 1</cat-menu-item>
          <cat-menu-item disabled>Item 2</cat-menu-item>
        </cat-menu>
      );

      const menuItems = root.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;
      const secondItem = menuItems?.[1] as HTMLCatMenuItemElement;

      const firstItemFocusMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(firstItem, 'doFocus', {
        value: firstItemFocusMock,
        writable: true,
        configurable: true
      });

      const secondItemFocusMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(secondItem, 'doFocus', {
        value: secondItemFocusMock,
        writable: true,
        configurable: true
      });

      await new Promise(resolve => requestAnimationFrame(resolve));
      await waitForChanges();

      expect(firstItemFocusMock).not.toHaveBeenCalled();
      expect(secondItemFocusMock).not.toHaveBeenCalled();
    });
  });

  describe('menu content', () => {
    it('should render nav with role="menu" and default vertical orientation', async () => {
      const { root } = await render(<cat-menu />);

      const nav = root.shadowRoot?.querySelector('nav[role="menu"]');
      expect(nav?.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('should render nav with horizontal orientation when arrowNavigation is horizontal', async () => {
      const { root } = await render(<cat-menu arrow-navigation="horizontal" />);

      const nav = root.shadowRoot?.querySelector('nav[role="menu"]');
      expect(nav?.getAttribute('aria-orientation')).toBe('horizontal');
    });
  });

  describe('public methods', () => {
    it('should have open() method that calls dropdown.open()', async () => {
      const { root } = await render(<cat-menu />);

      const menu = root as HTMLCatMenuElement;
      const dropdown = root.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;

      const openMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(dropdown, 'open', {
        value: openMock,
        writable: true,
        configurable: true
      });

      await menu.open();

      expect(openMock).toHaveBeenCalled();
    });

    it('should have close() method that calls dropdown.close()', async () => {
      const { root } = await render(<cat-menu />);

      const menu = root as HTMLCatMenuElement;
      const dropdown = root.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;

      const closeMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(dropdown, 'close', {
        value: closeMock,
        writable: true,
        configurable: true
      });

      await menu.close();

      expect(closeMock).toHaveBeenCalled();
    });

    it('should have toggle() method that calls dropdown.toggle()', async () => {
      const { root } = await render(<cat-menu />);

      const menu = root as HTMLCatMenuElement;
      const dropdown = root.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;

      const toggleMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(dropdown, 'toggle', {
        value: toggleMock,
        writable: true,
        configurable: true
      });

      await menu.toggle();

      expect(toggleMock).toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    it('should handle ArrowDown and ArrowUp for vertical navigation', async () => {
      const { root, waitForChanges } = await render(
        <cat-menu arrow-navigation="vertical">
          <cat-menu-item>Item 1</cat-menu-item>
          <cat-menu-item>Item 2</cat-menu-item>
          <cat-menu-item>Item 3</cat-menu-item>
        </cat-menu>
      );

      const menu = root as HTMLCatMenuElement;

      await new Promise(resolve => setTimeout(resolve, 100));
      await waitForChanges();

      const menuItems = root.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;
      const secondItem = menuItems?.[1] as HTMLCatMenuItemElement;

      const firstItemFocusMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(firstItem, 'doFocus', {
        value: firstItemFocusMock,
        writable: true,
        configurable: true
      });

      const secondItemFocusMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(secondItem, 'doFocus', {
        value: secondItemFocusMock,
        writable: true,
        configurable: true
      });

      await menu.open();
      await waitForChanges();

      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await waitForChanges();

      Object.defineProperty(document, 'activeElement', {
        get: () => firstItem,
        configurable: true
      });

      const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
      root.dispatchEvent(arrowDownEvent);
      await waitForChanges();

      expect(secondItemFocusMock).toHaveBeenCalled();

      firstItemFocusMock.mockClear();
      secondItemFocusMock.mockClear();
      Object.defineProperty(document, 'activeElement', {
        get: () => secondItem,
        configurable: true
      });

      const arrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true });
      root.dispatchEvent(arrowUpEvent);
      await waitForChanges();

      expect(firstItemFocusMock).toHaveBeenCalled();

      firstItemFocusMock.mockClear();
      secondItemFocusMock.mockClear();
      Object.defineProperty(document, 'activeElement', {
        get: () => firstItem,
        configurable: true
      });

      const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
      root.dispatchEvent(arrowRightEvent);
      await waitForChanges();

      expect(firstItemFocusMock).not.toHaveBeenCalled();
      expect(secondItemFocusMock).not.toHaveBeenCalled();
    });

    it('should handle ArrowRight and ArrowLeft for horizontal navigation', async () => {
      const { root, waitForChanges } = await render(
        <cat-menu arrow-navigation="horizontal">
          <cat-menu-item>Item 1</cat-menu-item>
          <cat-menu-item>Item 2</cat-menu-item>
          <cat-menu-item>Item 3</cat-menu-item>
        </cat-menu>
      );

      const menu = root as HTMLCatMenuElement;

      await new Promise(resolve => setTimeout(resolve, 100));
      await waitForChanges();

      const menuItems = root.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;
      const secondItem = menuItems?.[1] as HTMLCatMenuItemElement;

      const firstItemFocusMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(firstItem, 'doFocus', {
        value: firstItemFocusMock,
        writable: true,
        configurable: true
      });

      const secondItemFocusMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(secondItem, 'doFocus', {
        value: secondItemFocusMock,
        writable: true,
        configurable: true
      });

      await menu.open();
      await waitForChanges();

      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await waitForChanges();

      Object.defineProperty(document, 'activeElement', {
        get: () => firstItem,
        configurable: true
      });

      const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
      root.dispatchEvent(arrowRightEvent);
      await waitForChanges();

      expect(secondItemFocusMock).toHaveBeenCalled();

      firstItemFocusMock.mockClear();
      secondItemFocusMock.mockClear();
      Object.defineProperty(document, 'activeElement', {
        get: () => secondItem,
        configurable: true
      });

      const arrowLeftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });
      root.dispatchEvent(arrowLeftEvent);
      await waitForChanges();

      expect(firstItemFocusMock).toHaveBeenCalled();

      firstItemFocusMock.mockClear();
      secondItemFocusMock.mockClear();
      Object.defineProperty(document, 'activeElement', {
        get: () => firstItem,
        configurable: true
      });

      const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
      root.dispatchEvent(arrowDownEvent);
      await waitForChanges();

      expect(firstItemFocusMock).not.toHaveBeenCalled();
      expect(secondItemFocusMock).not.toHaveBeenCalled();
    });

    it('should handle Home and End keys for both navigation modes', async () => {
      const { root, waitForChanges } = await render(
        <cat-menu>
          <cat-menu-item>Item 1</cat-menu-item>
          <cat-menu-item>Item 2</cat-menu-item>
          <cat-menu-item>Item 3</cat-menu-item>
        </cat-menu>
      );

      const menu = root as HTMLCatMenuElement;

      await new Promise(resolve => setTimeout(resolve, 100));
      await waitForChanges();

      const menuItems = root.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;
      const secondItem = menuItems?.[1] as HTMLCatMenuItemElement;
      const thirdItem = menuItems?.[2] as HTMLCatMenuItemElement;

      const firstItemFocusMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(firstItem, 'doFocus', {
        value: firstItemFocusMock,
        writable: true,
        configurable: true
      });

      const thirdItemFocusMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(thirdItem, 'doFocus', {
        value: thirdItemFocusMock,
        writable: true,
        configurable: true
      });

      await menu.open();
      await waitForChanges();

      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await waitForChanges();

      Object.defineProperty(document, 'activeElement', {
        get: () => secondItem,
        configurable: true
      });

      const homeEvent = new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true });
      root.dispatchEvent(homeEvent);
      await waitForChanges();

      expect(firstItemFocusMock).toHaveBeenCalled();

      firstItemFocusMock.mockClear();
      Object.defineProperty(document, 'activeElement', {
        get: () => firstItem,
        configurable: true
      });

      const endEvent = new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true });
      root.dispatchEvent(endEvent);
      await waitForChanges();

      expect(thirdItemFocusMock).toHaveBeenCalled();
    });
  });
});
