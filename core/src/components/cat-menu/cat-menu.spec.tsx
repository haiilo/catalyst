// Mock the icon registry to prevent console errors
jest.mock('../cat-icon/cat-icon-registry');

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { CatMenu } from './cat-menu';
import { CatDropdown } from '../cat-dropdown/cat-dropdown';
import { CatButton } from '../cat-button/cat-button';
import { CatMenuItem } from '../cat-menu-item/cat-menu-item';
import { CatIcon } from '../cat-icon/cat-icon';

// Mock the floating-ui dependencies used by cat-dropdown
jest.mock('@floating-ui/dom', () => ({
  autoUpdate: jest.fn(() => jest.fn()),
  computePosition: jest.fn(() => ({})),
  flip: jest.fn(() => ({})),
  offset: jest.fn(() => ({})),
  shift: jest.fn(() => ({})),
  size: jest.fn(() => ({}))
}));

jest.mock('focus-trap', () => ({
  createFocusTrap: jest.fn(() => ({
    activate: jest.fn(),
    deactivate: jest.fn(),
    updateContainerElements: jest.fn(function () {
      return this;
    })
  }))
}));

jest.mock('../../utils/first-tabbable', () => (element: HTMLSlotElement) => element);

describe('cat-menu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatMenu, CatDropdown, CatButton],
      html: `<cat-menu></cat-menu>`
    });
    expect(page.root).toBeTruthy();
    expect(page.root?.shadowRoot?.querySelector('cat-dropdown')).toBeTruthy();
    expect(page.root?.shadowRoot?.querySelector('cat-button[slot="trigger"]')).toBeTruthy();
  });

  describe('trigger button', () => {
    it('should render trigger button with correct default attributes', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const trigger = page.root?.shadowRoot?.querySelector('cat-button[slot="trigger"]') as HTMLCatButtonElement;
      expect(trigger).toBeTruthy();
      expect(trigger.variant).toBe('text');
      expect(trigger.size).toBe('m');
      expect(trigger.icon).toBe('more-horizontal-filled');
      expect(trigger.iconOnly).toBe(true);
      expect(trigger.a11yLabel).toBe('Show menu');
      expect(trigger.disabled).toBe(false);
      expect(trigger.nativeAttributes?.['aria-haspopup']).toBe('menu');
    });

    it('should apply custom trigger props', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `
          <cat-menu
            disabled
            trigger-variant="filled"
            trigger-size="l"
            trigger-icon="gear"
            trigger-label="Options"
            trigger-class="custom-class"
            trigger-test-id="menu-trigger"
          ></cat-menu>
        `
      });

      const trigger = page.root?.shadowRoot?.querySelector('cat-button[slot="trigger"]') as HTMLCatButtonElement;
      expect(trigger.variant).toBe('filled');
      expect(trigger.size).toBe('l');
      expect(trigger.icon).toBe('gear');
      expect(trigger.a11yLabel).toBe('Options');
      expect(trigger.classList.contains('custom-class')).toBe(true);
      expect(trigger.testId).toBe('menu-trigger');
      expect(trigger.disabled).toBe(true);
    });

    it('should use triggerA11yLabel when provided', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        template: () => <cat-menu triggerLabel="Options" triggerA11yLabel="Open options menu"></cat-menu>
      });

      const trigger = page.root?.shadowRoot?.querySelector('cat-button[slot="trigger"]') as HTMLCatButtonElement;
      expect(trigger.a11yLabel).toBe('Open options menu');
    });

    it('should emit catTriggerClick when trigger is clicked', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const catTriggerClickSpy = jest.fn();
      page.root?.addEventListener('catTriggerClick', catTriggerClickSpy);

      const trigger = page.root?.shadowRoot?.querySelector('cat-button[slot="trigger"]') as HTMLCatButtonElement;
      const mouseEvent = new MouseEvent('click');
      trigger.dispatchEvent(new CustomEvent('catClick', { detail: mouseEvent }));
      await page.waitForChanges();

      expect(catTriggerClickSpy).toHaveBeenCalled();
    });
  });

  describe('dropdown integration', () => {
    it('should render dropdown with correct props', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `
          <cat-menu
            placement="top-end"
            justify
            no-auto-close
            no-resize
            overflow
            delayed-trigger-init
          ></cat-menu>
        `
      });

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      expect(dropdown.placement).toBe('top-end');
      expect(dropdown.justify).toBe(true);
      expect(dropdown.noAutoClose).toBe(true);
      expect(dropdown.noResize).toBe(true);
      expect(dropdown.overflow).toBe(true);
      expect(dropdown.delayedTriggerInit).toBe(true);
      expect(dropdown.focusTrap).toBe(false);
    });

    it('should emit catOpen when dropdown opens', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const catOpenSpy = jest.fn();
      page.root?.addEventListener('catOpen', catOpenSpy);

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');
      dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));
      await page.waitForChanges();

      expect(catOpenSpy).toHaveBeenCalled();
    });

    it('should emit catClose when dropdown closes', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const catCloseSpy = jest.fn();
      page.root?.addEventListener('catClose', catCloseSpy);

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('blur');
      dropdown.dispatchEvent(new CustomEvent('catClose', { detail: focusEvent }));
      await page.waitForChanges();

      expect(catCloseSpy).toHaveBeenCalled();
    });
  });

  describe('focus management', () => {
    it('should focus first enabled menu item when menu opens', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton, CatMenuItem, CatIcon],
        html: `
          <cat-menu>
            <cat-menu-item value="1">Item 1</cat-menu-item>
            <cat-menu-item value="2">Item 2</cat-menu-item>
            <cat-menu-item value="3">Item 3</cat-menu-item>
          </cat-menu>
        `
      });

      const menuItems = page.root?.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;

      const mockDoFocus = jest.fn();
      Object.defineProperty(firstItem, 'doFocus', {
        value: mockDoFocus,
        writable: true,
        configurable: true
      });

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');

      dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      expect(mockDoFocus).toHaveBeenCalled();
    });

    it('should skip disabled items and focus first enabled item', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton, CatMenuItem, CatIcon],
        html: `
          <cat-menu>
            <cat-menu-item value="1" disabled>Item 1</cat-menu-item>
            <cat-menu-item value="2">Item 2</cat-menu-item>
            <cat-menu-item value="3">Item 3</cat-menu-item>
          </cat-menu>
        `
      });

      const menuItems = page.root?.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;
      const secondItem = menuItems?.[1] as HTMLCatMenuItemElement;

      const mockDoFocusFirst = jest.fn();
      Object.defineProperty(firstItem, 'doFocus', {
        value: mockDoFocusFirst,
        writable: true,
        configurable: true
      });

      const mockDoFocusSecond = jest.fn();
      Object.defineProperty(secondItem, 'doFocus', {
        value: mockDoFocusSecond,
        writable: true,
        configurable: true
      });

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');

      dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));

      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      expect(mockDoFocusFirst).not.toHaveBeenCalled();
      expect(mockDoFocusSecond).toHaveBeenCalled();
    });

    it('should not focus any item if a menu item is already focused', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton, CatMenuItem, CatIcon],
        html: `
          <cat-menu>
            <cat-menu-item value="1">Item 1</cat-menu-item>
            <cat-menu-item value="2">Item 2</cat-menu-item>
          </cat-menu>
        `
      });

      const menuItems = page.root?.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;
      const secondItem = menuItems?.[1] as HTMLCatMenuItemElement;

      // Simulate the second menu item being focused by setting document.activeElement
      Object.defineProperty(page.doc, 'activeElement', {
        get: () => secondItem,
        configurable: true
      });

      // Replace doFocus with mocks to track calls
      const firstItemFocusMock = jest.fn();
      Object.defineProperty(firstItem, 'doFocus', {
        value: firstItemFocusMock,
        writable: true,
        configurable: true
      });

      const secondItemFocusMock = jest.fn();
      Object.defineProperty(secondItem, 'doFocus', {
        value: secondItemFocusMock,
        writable: true,
        configurable: true
      });

      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;
      const focusEvent = new FocusEvent('focus');

      dropdown.dispatchEvent(new CustomEvent('catOpen', { detail: focusEvent }));
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      // Neither item should have doFocus called since an item was already focused
      expect(firstItemFocusMock).not.toHaveBeenCalled();
      expect(secondItemFocusMock).not.toHaveBeenCalled();
    });

    it('should handle case when all menu items are disabled', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton, CatMenuItem, CatIcon],
        html: `
          <cat-menu>
            <cat-menu-item value="1" disabled>Item 1</cat-menu-item>
            <cat-menu-item value="2" disabled>Item 2</cat-menu-item>
          </cat-menu>
        `
      });

      const menuItems = page.root?.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;
      const secondItem = menuItems?.[1] as HTMLCatMenuItemElement;

      // Use Object.defineProperty to mock readonly doFocus methods (official Jest workaround)
      const firstItemFocusMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(firstItem, 'doFocus', {
        value: firstItemFocusMock,
        writable: true,
        configurable: true
      });

      const secondItemFocusMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(secondItem, 'doFocus', {
        value: secondItemFocusMock,
        writable: true,
        configurable: true
      });

      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      // No menu items should have doFocus called when all are disabled
      expect(firstItemFocusMock).not.toHaveBeenCalled();
      expect(secondItemFocusMock).not.toHaveBeenCalled();
    });
  });

  describe('menu content', () => {
    it('should render nav with role="menu" and default vertical orientation', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const nav = page.root?.shadowRoot?.querySelector('nav[role="menu"]');
      expect(nav?.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('should render nav with horizontal orientation when arrowNavigation is horizontal', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu arrow-navigation="horizontal"></cat-menu>`
      });

      const nav = page.root?.shadowRoot?.querySelector('nav[role="menu"]');
      expect(nav?.getAttribute('aria-orientation')).toBe('horizontal');
    });
  });

  describe('public methods', () => {
    it('should have open() method that calls dropdown.open()', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;

      const openMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(dropdown, 'open', {
        value: openMock,
        writable: true,
        configurable: true
      });

      // Call open method
      await menu.open();

      // Verify dropdown.open() was called
      expect(openMock).toHaveBeenCalled();
    });

    it('should have close() method that calls dropdown.close()', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;

      const closeMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(dropdown, 'close', {
        value: closeMock,
        writable: true,
        configurable: true
      });

      // Call close method
      await menu.close();

      // Verify dropdown.close() was called
      expect(closeMock).toHaveBeenCalled();
    });

    it('should have toggle() method that calls dropdown.toggle()', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton],
        html: `<cat-menu></cat-menu>`
      });

      const menu = page.rootInstance as CatMenu;
      const dropdown = page.root?.shadowRoot?.querySelector('cat-dropdown') as HTMLCatDropdownElement;

      const toggleMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(dropdown, 'toggle', {
        value: toggleMock,
        writable: true,
        configurable: true
      });

      // Call toggle method
      await menu.toggle();

      // Verify dropdown.toggle() was called
      expect(toggleMock).toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    it('should handle ArrowDown and ArrowUp for vertical navigation', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton, CatMenuItem, CatIcon],
        template: () => (
          <cat-menu arrowNavigation="vertical">
            <cat-menu-item>Item 1</cat-menu-item>
            <cat-menu-item>Item 2</cat-menu-item>
            <cat-menu-item>Item 3</cat-menu-item>
          </cat-menu>
        )
      });

      const menu = page.rootInstance as CatMenu;

      // Wait for MutationObserver to populate catMenuItems
      await new Promise(resolve => setTimeout(resolve, 100));
      await page.waitForChanges();

      const menuItems = page.root?.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;
      const secondItem = menuItems?.[1] as HTMLCatMenuItemElement;

      // Mock doFocus methods
      const firstItemFocusMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(firstItem, 'doFocus', {
        value: firstItemFocusMock,
        writable: true,
        configurable: true
      });

      const secondItemFocusMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(secondItem, 'doFocus', {
        value: secondItemFocusMock,
        writable: true,
        configurable: true
      });

      // Open the menu
      await menu.open();
      await page.waitForChanges();

      // Wait for requestAnimationFrame to execute in dropdown.open()
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await page.waitForChanges();

      // Simulate first item being focused
      Object.defineProperty(page.doc, 'activeElement', {
        get: () => firstItem,
        configurable: true
      });

      // Press ArrowDown - should focus second item
      const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
      page.root?.dispatchEvent(arrowDownEvent);
      await page.waitForChanges();

      expect(secondItemFocusMock).toHaveBeenCalled();

      // Clear mocks and simulate second item being focused
      firstItemFocusMock.mockClear();
      secondItemFocusMock.mockClear();
      Object.defineProperty(page.doc, 'activeElement', {
        get: () => secondItem,
        configurable: true
      });

      // Press ArrowUp - should focus first item again
      const arrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true });
      page.root?.dispatchEvent(arrowUpEvent);
      await page.waitForChanges();

      expect(firstItemFocusMock).toHaveBeenCalled();

      // Clear mocks for next test
      firstItemFocusMock.mockClear();
      secondItemFocusMock.mockClear();
      Object.defineProperty(page.doc, 'activeElement', {
        get: () => firstItem,
        configurable: true
      });

      // ArrowRight should not change focus in vertical mode
      const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
      page.root?.dispatchEvent(arrowRightEvent);
      await page.waitForChanges();

      // Neither item should have doFocus called
      expect(firstItemFocusMock).not.toHaveBeenCalled();
      expect(secondItemFocusMock).not.toHaveBeenCalled();
    });

    it('should handle ArrowRight and ArrowLeft for horizontal navigation', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton, CatMenuItem, CatIcon],
        template: () => (
          <cat-menu arrowNavigation="horizontal">
            <cat-menu-item>Item 1</cat-menu-item>
            <cat-menu-item>Item 2</cat-menu-item>
            <cat-menu-item>Item 3</cat-menu-item>
          </cat-menu>
        )
      });

      const menu = page.rootInstance as CatMenu;

      // Wait for MutationObserver to populate catMenuItems
      await new Promise(resolve => setTimeout(resolve, 100));
      await page.waitForChanges();

      const menuItems = page.root?.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;
      const secondItem = menuItems?.[1] as HTMLCatMenuItemElement;

      // Mock doFocus methods
      const firstItemFocusMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(firstItem, 'doFocus', {
        value: firstItemFocusMock,
        writable: true,
        configurable: true
      });

      const secondItemFocusMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(secondItem, 'doFocus', {
        value: secondItemFocusMock,
        writable: true,
        configurable: true
      });

      // Open the menu
      await menu.open();
      await page.waitForChanges();

      // Wait for requestAnimationFrame to execute in dropdown.open()
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await page.waitForChanges();

      // Simulate first item being focused
      Object.defineProperty(page.doc, 'activeElement', {
        get: () => firstItem,
        configurable: true
      });

      // Press ArrowRight - should focus second item
      const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
      page.root?.dispatchEvent(arrowRightEvent);
      await page.waitForChanges();

      expect(secondItemFocusMock).toHaveBeenCalled();

      // Clear mocks and simulate second item being focused
      firstItemFocusMock.mockClear();
      secondItemFocusMock.mockClear();
      Object.defineProperty(page.doc, 'activeElement', {
        get: () => secondItem,
        configurable: true
      });

      // Press ArrowLeft - should focus first item again
      const arrowLeftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });
      page.root?.dispatchEvent(arrowLeftEvent);
      await page.waitForChanges();

      expect(firstItemFocusMock).toHaveBeenCalled();

      // Clear mocks for next test
      firstItemFocusMock.mockClear();
      secondItemFocusMock.mockClear();
      Object.defineProperty(page.doc, 'activeElement', {
        get: () => firstItem,
        configurable: true
      });

      // ArrowDown should not change focus in horizontal mode
      const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
      page.root?.dispatchEvent(arrowDownEvent);
      await page.waitForChanges();

      // Neither item should have doFocus called
      expect(firstItemFocusMock).not.toHaveBeenCalled();
      expect(secondItemFocusMock).not.toHaveBeenCalled();
    });

    it('should handle Home and End keys for both navigation modes', async () => {
      const page = await newSpecPage({
        components: [CatMenu, CatDropdown, CatButton, CatMenuItem, CatIcon],
        html: `
          <cat-menu>
            <cat-menu-item>Item 1</cat-menu-item>
            <cat-menu-item>Item 2</cat-menu-item>
            <cat-menu-item>Item 3</cat-menu-item>
          </cat-menu>
        `
      });

      const menu = page.rootInstance as CatMenu;

      // Wait for MutationObserver to populate catMenuItems
      await new Promise(resolve => setTimeout(resolve, 100));
      await page.waitForChanges();

      const menuItems = page.root?.querySelectorAll('cat-menu-item');
      const firstItem = menuItems?.[0] as HTMLCatMenuItemElement;
      const secondItem = menuItems?.[1] as HTMLCatMenuItemElement;
      const thirdItem = menuItems?.[2] as HTMLCatMenuItemElement;

      // Mock doFocus methods
      const firstItemFocusMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(firstItem, 'doFocus', {
        value: firstItemFocusMock,
        writable: true,
        configurable: true
      });

      const thirdItemFocusMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(thirdItem, 'doFocus', {
        value: thirdItemFocusMock,
        writable: true,
        configurable: true
      });

      // Open the menu
      await menu.open();
      await page.waitForChanges();

      // Wait for requestAnimationFrame to execute in dropdown.open()
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await page.waitForChanges();

      // Simulate second item being focused
      Object.defineProperty(page.doc, 'activeElement', {
        get: () => secondItem,
        configurable: true
      });

      // Press Home - should focus first item
      const homeEvent = new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true });
      page.root?.dispatchEvent(homeEvent);
      await page.waitForChanges();

      expect(firstItemFocusMock).toHaveBeenCalled();

      // Clear mock and simulate first item being focused
      firstItemFocusMock.mockClear();
      Object.defineProperty(page.doc, 'activeElement', {
        get: () => firstItem,
        configurable: true
      });

      // Press End - should focus last item
      const endEvent = new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true });
      page.root?.dispatchEvent(endEvent);
      await page.waitForChanges();

      expect(thirdItemFocusMock).toHaveBeenCalled();
    });
  });
});
